"use client";
import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Hero() {
  preload("/hero/poster.webp", { as: "image", fetchPriority: "high" });
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const wantsSound = useRef(true); // visitor's choice; false once they mute
  const visible = useRef(true);
  const [srcOn, setSrcOn] = useState(false);

  // attach the sources once the page has loaded, so the poster (LCP) isn't
  // competing with ~1 MB of video on first paint
  useEffect(() => {
    const on = () => setSrcOn(true);
    if (document.readyState === "complete") on();
    else window.addEventListener("load", on, { once: true });
    return () => window.removeEventListener("load", on);
  }, []);

  // initial play: with sound, fall back to muted
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !srcOn) return;
    v.load();
    let cancelled = false;
    const start = async () => {
      v.muted = false;
      try {
        await v.play();
        if (!cancelled) { setSoundOn(true); setBlocked(false); }
      } catch {
        v.muted = true;
        if (!cancelled) { setSoundOn(false); setBlocked(true); }
        try { await v.play(); } catch { /* autoplay fully blocked; first gesture will start it */ }
      }
    };
    start();
    return () => { cancelled = true; };
  }, [srcOn]);

  // unlock sound on the first gesture anywhere (except the sound button itself)
  useEffect(() => {
    if (!blocked) return;
    const unlock = (e: Event) => {
      if (btnRef.current && e.target instanceof Node && btnRef.current.contains(e.target)) return;
      const v = videoRef.current;
      if (!v || !wantsSound.current) return;
      v.muted = false;
      const p = visible.current ? v.play() : Promise.resolve();
      p.then(() => { setSoundOn(true); setBlocked(false); }).catch(() => { v.muted = true; });
    };
    const evs = ["pointerdown", "keydown", "touchend"] as const;
    evs.forEach((ev) => window.addEventListener(ev, unlock, { passive: true }));
    return () => evs.forEach((ev) => window.removeEventListener(ev, unlock));
  }, [blocked]);

  // pause when < 35 % of the hero is visible; resume when back
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.intersectionRatio >= 0.35;
        if (visible.current) { if (v.currentSrc) v.play().catch(() => {}); }
        else v.pause();
      },
      { threshold: [0, 0.35, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (soundOn) {
      v.muted = true;
      wantsSound.current = false;
      setSoundOn(false);
    } else {
      v.muted = false;
      wantsSound.current = true;
      v.play().then(() => { setSoundOn(true); setBlocked(false); }).catch(() => { v.muted = true; });
    }
  };

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollToTarget(id); };

  return (
    <section ref={sectionRef} id="top" className="hero" aria-labelledby="hero-title">
      <style>{css}</style>
      <p className="hero-ghost" aria-hidden="true">{PROFILE.firstName.toUpperCase()}</p>

      <div className="hero-stage">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero/poster.webp"
          aria-label={`Videopresentation: ${PROFILE.name} presenterar sig själv`}
          width={768}
          height={960}
        >
          {srcOn && <source src="/hero/hero.webm" type="video/webm" />}
          {srcOn && <source src="/hero/hero.mp4" type="video/mp4" />}
        </video>
      </div>

      <div className="hero-copy wrap">
        <div className="hero-left">
          <p className="tag hero-tag"><span>{PROFILE.name}</span> — {PROFILE.location}</p>
          <h1 id="hero-title" className="h1">
            <span className="hero-line"><span>{PROFILE.role.replace("Fullstack", "Fullstack\u00AD")}</span></span>
            <span className="hero-line" style={{ ["--i" as string]: 1 }}>
              <span>&amp; <em>{PROFILE.roleSecond.toLowerCase().replace("specialist", "specialist\u00AD")}.</em></span>
            </span>
          </h1>
        </div>
        <div className="hero-right">
          <div className="hero-ctas">
            <a href="#projekt" onClick={go("projekt")} className="btn btn-primary">Utforska projekt</a>
            <a href="#kontakt" onClick={go("kontakt")} className="btn btn-ghost">Låt oss prata</a>
            <a href={PROFILE.resume} download className="btn btn-ghost">CV <span aria-hidden="true">↓</span></a>
          </div>
          <button
            ref={btnRef}
            type="button"
            className={`hero-sound ${blocked ? "is-blocked" : ""}`}
            onClick={toggle}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Stäng av ljudet i presentationsvideon" : "Slå på ljudet i presentationsvideon"}
          >
            {soundOn ? (
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><rect x="3.5" y="3" width="3" height="10" rx="1" fill="currentColor" /><rect x="9.5" y="3" width="3" height="10" rx="1" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" fill="currentColor" /></svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

const css = `
@layer components {
.hero{position:relative;background:var(--paper);min-height:100svh;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;isolation:isolate}
.hero-ghost{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);z-index:-1;margin:0;white-space:nowrap;pointer-events:none;
  font-weight:800;letter-spacing:-.06em;line-height:.8;font-size:clamp(110px,24vw,420px);color:transparent;-webkit-text-stroke:1.2px rgba(13,13,13,.14);
  animation:ghostIn 1.6s var(--ease) both}
@keyframes ghostIn{from{opacity:0;letter-spacing:-.02em}to{opacity:1}}
.hero-stage{position:absolute;inset:0;display:flex;justify-content:center;align-items:flex-end;pointer-events:none}
.hero-video{height:min(96svh,1040px);width:auto;aspect-ratio:768/960;object-fit:cover;mix-blend-mode:multiply;background:transparent;
  animation:heroSlide 1.4s var(--ease) both}
@keyframes heroSlide{from{transform:translateY(40px)}to{transform:none}}
@keyframes heroRise{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
.hero-copy{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:end;gap:24px;padding-bottom:clamp(28px,6vh,64px)}
.hero-left{max-width:min(31vw,470px)}
.hero-tag{margin-bottom:16px}
.h1{font-weight:700;letter-spacing:-.045em;line-height:1;font-size:clamp(30px,3.4vw,58px);margin:0;hyphens:manual}
.hero-line{display:block;overflow:hidden;padding-bottom:.08em}
.hero-line>span{display:inline-block;animation:lineUp 1.2s var(--ease) both;animation-delay:calc(.25s + var(--i,0)*.12s)}
@keyframes lineUp{from{transform:translateY(105%)}to{transform:none}}
.hero-right{display:flex;flex-direction:column;align-items:flex-end;gap:18px;justify-self:end;max-width:min(30vw,440px)}
.hero-ctas{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px;animation:heroRise 1.2s var(--ease) .5s both}
.hero-ctas .btn{background-color:rgba(244,242,238,.75)}
.hero-ctas .btn-primary{background:var(--ink)}
.hero-ctas .btn-ghost:hover{background:var(--ink)}
.hero-sound{position:relative;width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;
  transition:transform .5s var(--ease)}
.hero-sound:hover{transform:scale(1.06)}
.hero-sound.is-blocked::after{content:"";position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 1.5px var(--ink);animation:ping 1.8s var(--ease) infinite}
@keyframes ping{from{transform:scale(1);opacity:.6}to{transform:scale(1.9);opacity:0}}
@media (max-width: 1100px){
  .hero{justify-content:flex-start;min-height:auto;padding-top:76px}
  .hero-stage{position:relative;inset:auto}
  .hero-video{height:62svh;max-height:640px}
  .hero-ghost{top:34svh;font-size:30vw}
  .hero-copy{grid-template-columns:1fr;gap:22px;padding-top:24px}
  .hero-left,.hero-right{max-width:none}
  .hero-right{align-items:flex-start;justify-self:stretch;flex-direction:row;flex-wrap:wrap;justify-content:space-between}
  .hero-ctas{justify-content:flex-start}
  .h1{font-size:clamp(32px,9vw,56px)}
}
@media (max-width: 420px){ .hero-ctas .btn{height:44px;padding:0 16px;font-size:14px} }
}
`;
