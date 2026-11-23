"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROFILE, SECTIONS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";

function Barcode({ seed }: { seed: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; i < 38; i++) {
    const c = seed.charCodeAt(i % seed.length) + i * 7;
    const w = 1 + (c % 3);
    bars.push({ x, w });
    x += w + 1 + ((c >> 2) % 2);
  }
  return (
    <svg className="id-barcode" viewBox={`0 0 ${x} 30`} preserveAspectRatio="none" aria-hidden="true">
      {bars.map((b, i) => <rect key={i} x={b.x} y="0" width={b.w} height="30" fill="currentColor" />)}
    </svg>
  );
}

export default function About() {
  const s = SECTIONS.om;
  const sectionRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const lastPointer = useRef<string>("mouse");

  // damped pendulum: pointer velocity → angular impulse, spring back, idle sway
  useEffect(() => {
    const sec = sectionRef.current;
    const rig = rigRef.current;
    if (!sec || !rig || prefersReducedMotion()) return;
    let a = 0, v = 0, raf = 0, running = false;
    let lastX: number | null = null, lastT = 0, lastMove = 0;
    const K = 26, C = 4.2;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      const idle = now - lastMove > 1400;
      const target = idle ? Math.sin(now / 1300) * 1.6 : 0;
      v += (-K * (a - target) - C * v) * dt;
      a += v * dt;
      a = Math.max(-18, Math.min(18, a));
      rig.style.transform = `rotate(${a.toFixed(3)}deg)`;
      if (running) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastX !== null && now - lastT < 80) {
        const vel = (e.clientX - lastX) / Math.max(1, now - lastT); // px/ms
        v += Math.max(-60, Math.min(60, vel * 9));
      }
      lastX = e.clientX; lastT = now; lastMove = now;
    };
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) { prev = performance.now(); raf = requestAnimationFrame(tick); }
    });
    io.observe(sec);
    sec.addEventListener("pointermove", onMove, { passive: true });
    return () => { io.disconnect(); cancelAnimationFrame(raf); sec.removeEventListener("pointermove", onMove); };
  }, []);

  const strapText = `${PROFILE.name.toUpperCase()} · ${PROFILE.role.toUpperCase()} · `;

  return (
    <section ref={sectionRef} id="om" className="section about" aria-labelledby="om-title">
      <style>{css}</style>
      <div className="wrap about-grid">
        <div className="about-left">
          <p className="tag rv"><span>{s.index}</span> — {s.label}</p>
          <h2 id="om-title" className="h2 about-h">
            <span className="rv-mask"><span>Hej, jag är </span></span>{" "}
            <span className="rv-mask" style={{ ["--i" as string]: 1 }}><span><em>{PROFILE.firstName}.</em></span></span>
          </h2>
          <p className="about-summary rv" style={{ ["--i" as string]: 2 }}>{PROFILE.resumeSummary}</p>
          <p className="about-extra rv" style={{ ["--i" as string]: 3 }}>{PROFILE.extraLine}</p>
          <div className="about-btns rv" style={{ ["--i" as string]: 4 }}>
            <a className="btn btn-primary btn-sm" href={PROFILE.resume} download>CV <span aria-hidden="true">↓</span></a>
            <a className="btn btn-ghost btn-sm" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a className="btn btn-ghost btn-sm" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="about-center">
          <div ref={rigRef} className="id-rig">
            <div className="id-strap" aria-hidden="true">
              <div className="id-strap-text"><span>{strapText.repeat(4)}</span><span>{strapText.repeat(4)}</span></div>
            </div>
            <div className="id-clip" aria-hidden="true"><i /></div>
            <div
              className={`id-card ${flipped ? "is-flipped" : ""}`}
              role="button"
              tabIndex={0}
              aria-pressed={flipped}
              aria-label={`ID-kort för ${PROFILE.name}. Tryck för att vända.`}
              onPointerDown={(e) => { lastPointer.current = e.pointerType; }}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") setFlipped(true); }}
              onPointerLeave={(e) => { if (e.pointerType === "mouse") setFlipped(false); }}
              onClick={() => { if (lastPointer.current !== "mouse") setFlipped((f) => !f); }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); } }}
            >
              <div className="id-inner">
                <div className="id-face id-front" aria-hidden={flipped}>
                  <div className="id-band mono">{PROFILE.role.toUpperCase()} ID</div>
                  <div className="id-photo">
                    <div className="id-halo" />
                    <div className="id-frame">
                      <Image src="/portrait-bust.webp" alt={`Porträtt av ${PROFILE.name}`} width={128} height={156} />
                    </div>
                  </div>
                  <p className="id-name">{PROFILE.name}</p>
                  <p className="id-role">{PROFILE.role} · {PROFILE.roleSecond}</p>
                  <dl className="id-rows mono">
                    <div><dt>ID nr</dt><dd>{PROFILE.initials}-{PROFILE.graduation}</dd></div>
                    <div><dt>Avd.</dt><dd>.NET · Vård</dd></div>
                    <div><dt>Giltig t.o.m.</dt><dd>{PROFILE.graduation}</dd></div>
                  </dl>
                  <div className="id-foot">
                    <Barcode seed={PROFILE.name + PROFILE.email} />
                    <span className="id-holo" aria-hidden="true" />
                  </div>
                </div>
                <div className="id-face id-back" aria-hidden={!flipped}>
                  <p className="id-back-title mono">Vad jag är</p>
                  <ul>
                    {PROFILE.idBack.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                  <div className="id-sign">
                    <span className="serif-em">{PROFILE.name}</span>
                    <i />
                    <small className="mono">Signatur</small>
                  </div>
                  <p className="id-found mono">Hittat? Säg hej · {PROFILE.email}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="id-hint mono" aria-hidden="true">Hovra eller tryck för att vända</p>
        </div>

        <aside className="about-right" aria-label="Snabbfakta">
          <p className="tag rv">Snabbfakta</p>
          <dl className="facts">
            {[
              ["Plats", PROFILE.location],
              ["Utbildning", PROFILE.education],
              ["Nu", PROFILE.currentRole],
              ["Språk", PROFILE.languages.map((l) => `${l.name} (${/^[A-C][12]$/.test(l.level) ? l.level : l.level.toLowerCase()})`).join(", ")],
            ].map(([k, val], i) => (
              <div key={k} className="rv" style={{ ["--i" as string]: i }}>
                <dt className="mono">{k}</dt>
                <dd>{val}</dd>
              </div>
            ))}
            <div className="rv" style={{ ["--i" as string]: 4 }}>
              <dt className="mono">E-post</dt>
              <dd><a className="u-link" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></dd>
            </div>
          </dl>
          <blockquote className="about-quote rv" style={{ ["--i" as string]: 5 }}>
            <p>”{PROFILE.quote}”</p>
          </blockquote>
        </aside>
      </div>
    </section>
  );
}

const css = `
@layer components {
.about{overflow:hidden}
.about-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(24px,3.4vw,56px);align-items:stretch}
.about-h{font-size:clamp(40px,4.8vw,72px);margin-bottom:28px}
.about-summary{color:var(--ink-2);font-size:16px;line-height:1.68;margin:0 0 14px}
.about-extra{color:var(--mute);font-size:15px;margin:0 0 28px}
.about-btns{display:flex;flex-wrap:wrap;gap:10px}
.about-center{position:relative;display:flex;flex-direction:column;align-items:center;margin-top:calc(-1 * var(--sec-y))}
.id-rig{position:relative;display:flex;flex-direction:column;align-items:center;transform-origin:50% 0;will-change:transform}
.id-strap{width:30px;height:calc(var(--sec-y) + 56px);background:#1a1a1a;overflow:hidden;position:relative;
  box-shadow:inset 2px 0 0 rgba(255,255,255,.06),inset -2px 0 0 rgba(0,0,0,.3)}
.id-strap-text{position:absolute;left:0;right:0;top:0;display:flex;flex-direction:column;animation:strapScroll 22s linear infinite}
.id-strap-text span{writing-mode:vertical-rl;font-family:var(--font-mono);font-size:9.5px;letter-spacing:.24em;color:rgba(255,255,255,.62);
  line-height:30px;white-space:nowrap;text-align:center}
@keyframes strapScroll{to{transform:translateY(-50%)}}
.id-clip{width:38px;height:30px;position:relative;margin-top:-2px;border-radius:6px 6px 10px 10px;
  background:linear-gradient(180deg,#dcdcdc,#9a9a9a 55%,#cfcfcf);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25),0 4px 8px -4px rgba(0,0,0,.4)}
.id-clip i{position:absolute;left:50%;bottom:-12px;width:14px;height:16px;transform:translateX(-50%);border:3px solid #a8a8a8;border-top:0;border-radius:0 0 8px 8px}
.id-card{position:relative;width:300px;height:404px;margin-top:8px;perspective:1400px;cursor:pointer;border-radius:22px}
.id-card:focus-visible{outline-offset:6px}
.id-inner{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 1s var(--ease)}
.id-card.is-flipped .id-inner{transform:rotateY(180deg)}
.id-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:22px;background:#fff;overflow:hidden;
  box-shadow:var(--hair),0 40px 70px -36px rgba(13,13,13,.45),0 14px 24px -18px rgba(13,13,13,.25);display:flex;flex-direction:column;align-items:center}
.id-face::before{content:"";position:absolute;top:13px;left:50%;width:46px;height:8px;border-radius:999px;transform:translateX(-50%);background:var(--paper);box-shadow:inset 0 1px 2px rgba(0,0,0,.25);z-index:2}
.id-band{width:100%;background:var(--ink);color:#fff;font-size:10.5px;letter-spacing:.22em;text-align:center;padding:28px 12px 10px}
.id-photo{position:relative;margin-top:14px}
.id-halo{position:absolute;inset:-18px;border-radius:50%;background:radial-gradient(closest-side,rgba(13,13,13,.10),transparent);filter:blur(4px)}
.id-frame{position:relative;width:128px;height:156px;border-radius:16px;padding:3px;background:linear-gradient(145deg,#e8e8e8,#8d8d8d 50%,#d6d6d6)}
.id-frame img{width:100%;height:100%;object-fit:cover;border-radius:13px;filter:grayscale(.15) contrast(1.02);transition:transform .9s var(--ease)}
.id-frame{overflow:hidden}
.id-card:hover .id-frame img{transform:scale(1.07)}
.id-name{margin:10px 0 0;font-weight:700;letter-spacing:-.03em;font-size:19px;line-height:1.1}
.id-role{margin:4px 18px 0;color:var(--mute);font-size:11.5px;text-align:center;line-height:1.35}
.id-rows{width:calc(100% - 40px);margin:8px 0 0;font-size:10px}
.id-rows div{display:flex;justify-content:space-between;padding:3px 0;border-top:1px dashed var(--line)}
.id-rows dt{color:var(--mute)} .id-rows dd{margin:0}
.id-foot{margin-top:auto;width:calc(100% - 40px);display:flex;align-items:center;justify-content:space-between;padding:8px 0 14px;gap:12px}
.id-barcode{width:150px;height:26px;color:var(--ink)}
.id-holo{width:32px;height:32px;border-radius:50%;background:conic-gradient(from 0deg,#f2f2f2,#9b9b9b,#e6e6e6,#bdbdbd,#f8f8f8,#8f8f8f,#f2f2f2);
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.1);animation:holo 6s linear infinite}
@keyframes holo{to{transform:rotate(360deg)}}
.id-back{transform:rotateY(180deg);padding:40px 22px 18px;align-items:stretch}
.id-back-title{font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--mute);margin:8px 0 12px}
.id-back ul{list-style:none;margin:0;padding:0;display:grid;gap:9px}
.id-back li{font-size:13.5px;line-height:1.35;padding-left:16px;position:relative}
.id-back li::before{content:"";position:absolute;left:0;top:.55em;width:7px;height:1px;background:var(--ink)}
.id-sign{margin-top:auto;display:flex;flex-direction:column}
.id-sign .serif-em{font-size:26px;color:var(--ink);line-height:1}
.id-sign i{height:1px;background:var(--ink);margin:6px 0 4px}
.id-sign small{font-size:9.5px;color:var(--mute);letter-spacing:.14em;text-transform:uppercase}
.id-found{margin:12px 0 0;font-size:10px;color:var(--mute)}
.id-hint{margin-top:22px;font-size:11px;color:var(--mute);letter-spacing:.06em}
.facts{margin:0;display:grid}
.facts>div{padding:14px 0;border-top:1px solid var(--line)}
.facts>div:last-child{border-bottom:1px solid var(--line)}
.facts dt{font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);margin-bottom:4px}
.facts dd{margin:0;font-weight:500;overflow-wrap:anywhere}
.u-link{background:linear-gradient(currentColor,currentColor) 0 100%/100% 1px no-repeat;transition:background-size .5s var(--ease)}
.u-link:hover{background-size:0 1px;background-position:100% 100%}
.about-quote{margin:34px 0 0;padding:0}
.about-quote p{margin:0;font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,1.9vw,28px);line-height:1.22;color:var(--ink-2)}
.about-right{display:flex;flex-direction:column;justify-content:flex-start;padding-top:6px}
@media (max-width: 1080px){
  .about-grid{grid-template-columns:minmax(0,1fr) 320px}
  .about-right{grid-column:1 / -1}
}
@media (max-width: 760px){
  .about-grid{grid-template-columns:1fr}
  .about-center{order:-1;margin-top:calc(-1 * var(--sec-y));margin-bottom:12px}
  .id-strap{height:calc(var(--sec-y) + 40px)}
}
@media (max-width: 360px){ .id-card{transform:scale(.92);transform-origin:50% 0;margin-bottom:-30px} }
}
`;
