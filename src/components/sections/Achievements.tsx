"use client";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, SECTIONS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import TechLogo from "../ui/TechLogo";

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function Counter({ value, run }: { value: number; run: boolean }) {
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!run || done.current) return;
    done.current = true;
    if (prefersReducedMotion()) { setN(value); return; }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 1400);
      setN(Math.round(easeOutQuart(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{n}</>;
}

export default function Achievements() {
  const s = SECTIONS.meriter;
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState<boolean[]>(() => ACHIEVEMENTS.map(() => false));
  const [active, setActive] = useState(0);

  // section height = viewport + horizontal travel; translate the track with scroll
  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    let travel = 0, raf = 0, visible = false;
    const size = () => {
      travel = Math.max(0, track.scrollWidth - track.clientWidth);
      outer.style.height = `calc(100svh + ${travel}px)`;
    };
    const tick = () => {
      const r = outer.getBoundingClientRect();
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      track.style.transform = `translate3d(${-p * travel}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${travel > 0 ? p : 1})`;
      // card nearest the viewport centre
      const cx = window.innerWidth / 2;
      let best = 0, bestD = Infinity;
      const nextSeen: number[] = [];
      track.querySelectorAll<HTMLElement>(".ach-card").forEach((c, i) => {
        const b = c.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - cx);
        if (d < bestD) { bestD = d; best = i; }
        if (b.left < window.innerWidth && b.right > 0 && r.top < window.innerHeight * 0.6) nextSeen.push(i);
      });
      setActive((a) => (a === best ? a : best));
      if (nextSeen.length) setSeen((prev) => (nextSeen.every((i) => prev[i]) ? prev : prev.map((v, i) => v || nextSeen.includes(i))));
      if (visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    size();
    io.observe(outer);
    const ro = new ResizeObserver(size);
    ro.observe(track);
    window.addEventListener("resize", size);
    return () => { io.disconnect(); ro.disconnect(); window.removeEventListener("resize", size); cancelAnimationFrame(raf); };
  }, []);

  const total = String(ACHIEVEMENTS.length).padStart(2, "0");

  return (
    <section ref={outerRef} id="meriter" className="ach" aria-labelledby="meriter-title">
      <style>{css}</style>
      <div className="ach-pin">
        <div className="wrap ach-head">
          <div>
            <p className="tag"><span>{s.index}</span> — {s.label}</p>
            <h2 id="meriter-title" className="h2 ach-h2">Siffror som <em>räknas.</em></h2>
          </div>
          <div className="ach-progress" aria-hidden="true"><div ref={barRef} /></div>
        </div>
        <div ref={trackRef} className="ach-track">
          {ACHIEVEMENTS.map((a, i) => (
            <article key={a.label} className={`ach-card ${active === i ? "is-active" : ""}`} aria-label={`${a.value}${a.suffix ?? ""} ${a.label}`}>
              <div className="ach-top">
                <span className="ach-logo"><TechLogo logo={a.logo} size={34} /></span>
                <span className="mono ach-idx">{String(i + 1).padStart(2, "0")} / {total}</span>
              </div>
              <div className="ach-bottom">
                <div className="ach-text">
                  <h3>{a.label}</h3>
                  <p>{a.caption}</p>
                  <p className="mono ach-detail">{a.detail}</p>
                </div>
                <p className="ach-num" aria-hidden="true"><Counter value={a.value} run={seen[i]} />{a.suffix}</p>
              </div>
            </article>
          ))}
          <div className="ach-end mono" aria-hidden="true">och det fortsätter →</div>
        </div>
      </div>
    </section>
  );
}

const css = `
@layer components {
.ach{position:relative}
.ach-pin{position:sticky;top:0;height:100svh;display:flex;flex-direction:column;justify-content:center;overflow:hidden;gap:clamp(24px,5vh,48px)}
.ach-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px}
.ach-h2{font-size:clamp(40px,5.6vw,80px)}
.ach-progress{flex:none;width:min(220px,30vw);height:2px;background:var(--line);margin-bottom:14px}
.ach-progress>div{height:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0)}
.ach-track{display:flex;gap:18px;padding:16px max(var(--gutter),calc((100vw - var(--maxw))/2)) 28px;will-change:transform}
.ach-card{flex:none;width:clamp(300px,40vw,540px);max-width:84vw;height:clamp(260px,36vh,310px);background:var(--card);border-radius:28px;box-shadow:var(--hair);
  padding:24px;display:flex;flex-direction:column;justify-content:space-between;transition:transform .7s var(--ease),box-shadow .7s var(--ease)}
.ach-card.is-active{transform:translateY(-12px);box-shadow:var(--hair),0 40px 60px -34px rgba(13,13,13,.32),0 16px 28px -20px rgba(13,13,13,.16)}
.ach-top{display:flex;justify-content:space-between;align-items:flex-start}
.ach-logo{width:72px;height:72px;border-radius:20px;display:grid;place-items:center;background:var(--paper);box-shadow:var(--hair);position:relative;transition:box-shadow .7s var(--ease)}
.ach-card.is-active .ach-logo{box-shadow:var(--hair),0 0 0 8px rgba(13,13,13,.04)}
.ach-idx{font-size:12px;color:var(--mute)}
.ach-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:16px}
.ach-text{min-width:0}
.ach-text h3{margin:0 0 4px;font-weight:700;letter-spacing:-.03em;font-size:clamp(18px,1.6vw,22px)}
.ach-text p{margin:0;color:var(--ink-2);font-size:14px;line-height:1.4}
.ach-text .ach-detail{margin-top:6px;font-size:11.5px;color:var(--mute)}
.ach-num{margin:0;flex:none;font-weight:800;letter-spacing:-.06em;line-height:.85;font-size:clamp(72px,9vw,128px);font-variant-numeric:tabular-nums}
.ach-end{flex:none;align-self:center;padding:0 40px 0 12px;font-size:13px;color:var(--mute);white-space:nowrap}
@media (max-width: 600px){
  .ach-head{flex-direction:column;align-items:flex-start}
  .ach-progress{width:100%;margin-bottom:0}
  .ach-bottom{flex-direction:column-reverse;align-items:flex-start;gap:10px}
  .ach-num{font-size:64px}
  .ach-card{padding:20px}
}
}
`;
