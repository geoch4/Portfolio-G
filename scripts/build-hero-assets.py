#!/usr/bin/env python3
"""
Build the hero assets from the raw intro video (and an optional portrait photo).

    python3 scripts/build-hero-assets.py --video path/to/intro.mp4 [--photo path/to/photo.jpg]

Outputs
    public/hero/hero.mp4      H.264 yuv420p, CRF 24, preset slow, AAC 96k, +faststart
    public/hero/hero.webm     VP9 CRF 36, Opus 80k
    public/hero/poster.webp   first frame, used as <video poster>
    public/portrait-bust.webp 480x600 head-to-shirt crop
    public/og.jpg             1200x630 social card

Pipeline
    1. Detect the person (dark pixels vs. the light backdrop) across sampled frames
       and build one fixed crop with aspect 768:960, centred on the person.
       Override with --crop W:H:X:Y if detection is off.
    2. Whiten the backdrop with colorlevels so it becomes pure white and disappears
       under mix-blend-mode: multiply on the page.
    3. Seamless loop: keep the first ~10 s, then cross-fade the last 0.5 s of picture
       into the first 0.5 s (ffmpeg xfade). Audio gets the same cross-fade,
       sample-accurately in numpy (equal-power). Nothing is stretched or retimed,
       so lips stay in sync.

Requires: ffmpeg/ffprobe on PATH, numpy, Pillow.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT_HERO = ROOT / "public" / "hero"
FADE = 0.5          # seconds of cross-fade at the loop point
MAX_LEN = 10.0      # seconds of source to use
OUT_W, OUT_H = 768, 960
SR = 48000


def run(cmd: list[str], **kw) -> subprocess.CompletedProcess:
    print("  $", " ".join(str(c) for c in cmd)[:220])
    return subprocess.run(cmd, check=True, **kw)


def probe(path: Path) -> dict:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries",
         "format=duration:stream=codec_type,width,height,r_frame_rate",
         "-of", "json", str(path)],
        check=True, capture_output=True, text=True).stdout
    data = json.loads(out)
    v = next(s for s in data["streams"] if s["codec_type"] == "video")
    num, den = (int(x) for x in v["r_frame_rate"].split("/"))
    return {"w": int(v["width"]), "h": int(v["height"]), "fps": num / den,
            "dur": float(data["format"]["duration"]),
            "audio": any(s["codec_type"] == "audio" for s in data["streams"])}


def sample_frames(path: Path, w: int, h: int, fps: float = 2.0) -> np.ndarray:
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-vf", f"fps={fps}",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        check=True, capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, h, w, 3)


def detect(frames: np.ndarray, w: int, h: int) -> tuple[str, float]:
    """Return a crop string and the backdrop brightness (0..1)."""
    bg = float(np.median(np.concatenate([
        frames[:, :40, :40].reshape(-1, 3), frames[:, :40, -40:].reshape(-1, 3)])))
    thresh = bg - 28
    lefts, rights, tops = [], [], []
    for f in frames:
        mask = f.mean(2) < thresh
        cols = np.where(mask.sum(0) > 8)[0]
        rows = np.where(mask.sum(1) > 8)[0]
        if len(cols) and len(rows):
            lefts.append(cols.min()); rights.append(cols.max()); tops.append(rows.min())
    cx = float(np.median([(l + r) / 2 for l, r in zip(lefts, rights)]))
    top = max(0, int(min(tops)) - 24)
    ch = h - top
    cw = int(round(ch * OUT_W / OUT_H / 2) * 2)
    if cw > w:
        cw, ch = w, int(w * OUT_H / OUT_W)
    x = int(min(max(0, cx - cw / 2), w - cw))
    return f"{cw}:{ch - ch % 2}:{x}:{top}", bg / 255


def read_audio(path: Path, t0: float, dur: float) -> np.ndarray:
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", f"{t0}", "-t", f"{dur}", "-i", str(path),
         "-vn", "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"],
        check=True, capture_output=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()


def loop_audio(path: Path, length: float, out_wav: Path) -> None:
    """a[F:L] with its last F seconds blended into a[0:F] (equal-power)."""
    a = read_audio(path, 0, length)
    n_f = int(round(FADE * SR))
    n_l = int(round(length * SR))
    a = a[:n_l] if len(a) >= n_l else np.pad(a, ((0, n_l - len(a)), (0, 0)))
    body = a[n_f:].copy()                       # F .. L
    tail = a[n_l - n_f:]                        # L-F .. L
    head = a[:n_f]                              # 0 .. F
    t = np.linspace(0, 1, n_f, endpoint=False)[:, None]
    body[-n_f:] = tail * np.cos(t * np.pi / 2) + head * np.sin(t * np.pi / 2)
    pcm = (np.clip(body, -1, 1) * 32767).astype("<i2")
    import wave
    with wave.open(str(out_wav), "wb") as wf:
        wf.setnchannels(2); wf.setsampwidth(2); wf.setframerate(SR)
        wf.writeframes(pcm.tobytes())


def build_video(src: Path, crop: str, imax: float, length: float, tmp: Path) -> Path:
    """Picture: segment [F, L] cross-faded at its end into [0, F]."""
    lv = f"crop={crop},scale={OUT_W}:{OUT_H}:flags=lanczos," \
         f"colorlevels=rimax={imax:.3f}:gimax={imax:.3f}:bimax={imax:.3f},setsar=1,format=yuv420p"
    fc = (f"[0:v]{lv},split=2[a][b];"
          f"[a]trim=start={FADE}:end={length},setpts=PTS-STARTPTS[body];"
          f"[b]trim=start=0:end={FADE},setpts=PTS-STARTPTS[head];"
          f"[body][head]xfade=transition=fade:duration={FADE}:offset={length - 2 * FADE}[v]")
    out = tmp / "loop.mkv"
    run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-filter_complex", fc,
         "-map", "[v]", "-c:v", "ffv1", "-an", str(out)])
    return out


def encode(video: Path, wav: Path | None) -> None:
    OUT_HERO.mkdir(parents=True, exist_ok=True)
    a_in = ["-i", str(wav)] if wav else []
    maps = ["-map", "0:v"] + (["-map", "1:a"] if wav else [])
    run(["ffmpeg", "-v", "error", "-y", "-i", str(video), *a_in, *maps,
         "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
         *(["-c:a", "aac", "-b:a", "96k"] if wav else []), "-shortest",
         "-movflags", "+faststart", str(OUT_HERO / "hero.mp4")])
    run(["ffmpeg", "-v", "error", "-y", "-i", str(video), *a_in, *maps,
         "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1",
         *(["-c:a", "libopus", "-b:a", "80k"] if wav else []), "-shortest",
         str(OUT_HERO / "hero.webm")])
    # poster = first frame of the loop (shown before the video starts; also the LCP image)
    run(["ffmpeg", "-v", "error", "-y", "-i", str(OUT_HERO / "hero.mp4"), "-frames:v", "1",
         "-c:v", "libwebp", "-quality", "78", str(OUT_HERO / "poster.webp")])


def portrait(photo: Path | None, src: Path, crop: str) -> Image.Image:
    if photo:
        im = Image.open(photo).convert("RGB")
        w, h = im.size
        # head-to-shirt: 4:5 window, centred horizontally, from the top
        cw = min(w, int(h * 0.8)); ch = int(cw * 1.25)
        if ch > h:
            ch = h; cw = int(h * 0.8)
        x = (w - cw) // 2
        im = im.crop((x, 0, x + cw, ch))
    else:
        # sharpest frame (Laplacian variance) from the first seconds
        cw, ch, cx, cy = (int(v) for v in crop.split(":"))
        raw = subprocess.run(
            ["ffmpeg", "-v", "error", "-t", "3", "-i", str(src), "-vf",
             f"crop={cw}:{int(cw * 1.25)}:{cx}:{cy},fps=8", "-f", "rawvideo",
             "-pix_fmt", "rgb24", "-"], check=True, capture_output=True).stdout
        frames = np.frombuffer(raw, np.uint8).reshape(-1, int(cw * 1.25), cw, 3)
        g = frames.mean(3)
        lap = np.abs(4 * g[:, 1:-1, 1:-1] - g[:, :-2, 1:-1] - g[:, 2:, 1:-1]
                     - g[:, 1:-1, :-2] - g[:, 1:-1, 2:]).var(axis=(1, 2))
        im = Image.fromarray(frames[int(lap.argmax())])
    return im.resize((480, 600), Image.LANCZOS)


def og_image(bust: Image.Image, name: str, role: str) -> Image.Image:
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), (244, 242, 238))
    d = ImageDraw.Draw(img)
    p = bust.resize((404, 505), Image.LANCZOS)
    img.paste(p, (W - 404 - 72, H - 505))

    def font(size: int, bold: bool = True):
        for f in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
                  else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
                  "/System/Library/Fonts/Helvetica.ttc", "arial.ttf"]:
            try:
                return ImageFont.truetype(f, size)
            except OSError:
                continue
        return ImageFont.load_default()

    d.text((72, 210), name.split()[0], font=font(92), fill=(13, 13, 13))
    d.text((72, 312), " ".join(name.split()[1:]), font=font(92), fill=(13, 13, 13))
    d.text((76, 440), role, font=font(30, False), fill=(119, 117, 111))
    d.line((76, 160, 196, 160), fill=(13, 13, 13), width=3)
    return img


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--video", required=True, type=Path)
    ap.add_argument("--photo", type=Path, help="optional portrait photo for the ID card")
    ap.add_argument("--crop", help="override crop W:H:X:Y (source pixels)")
    ap.add_argument("--imax", type=float, help="override colorlevels max (0..1)")
    ap.add_argument("--name", default="Georgia Chalkia")
    ap.add_argument("--role", default="Fullstackutvecklare · Specialistsjuksköterska")
    args = ap.parse_args()

    info = probe(args.video)
    length = min(MAX_LEN, info["dur"])
    print(f"source {info['w']}x{info['h']} @ {info['fps']:.2f} fps, {info['dur']:.2f}s, using {length:.2f}s")

    frames = sample_frames(args.video, info["w"], info["h"])
    crop, bg = detect(frames, info["w"], info["h"])
    crop = args.crop or crop
    # colorlevels: anything at or above (backdrop - small margin) becomes pure white.
    # The brief's 0.98 suits a near-white wall; this backdrop is ~0.9, so derive it.
    imax = args.imax or round(min(0.98, bg - 0.03), 3)
    print(f"crop={crop}  backdrop={bg:.3f}  colorlevels max={imax}")

    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        vid = build_video(args.video, crop, imax, length, tmp)
        wav = None
        if info["audio"]:
            wav = tmp / "loop.wav"
            loop_audio(args.video, length, wav)
        encode(vid, wav)

    bust = portrait(args.photo, args.video, crop)
    bust.save(ROOT / "public" / "portrait-bust.webp", "WEBP", quality=86, method=6)
    og_image(bust, args.name, args.role).save(ROOT / "public" / "og.jpg", "JPEG", quality=86)

    for f in [OUT_HERO / "hero.mp4", OUT_HERO / "hero.webm", ROOT / "public/portrait-bust.webp", ROOT / "public/og.jpg"]:
        print(f"  {f.relative_to(ROOT)}  {f.stat().st_size / 1024:.0f} kB")


if __name__ == "__main__":
    sys.exit(main())
