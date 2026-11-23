"use client";
import { useRef } from "react";
import { PATH, SECTIONS } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";

export default function Experience() {
  const s = SECTIONS.erfarenhet;
  const listRef = useRef<HTMLOListElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useScrollProgress(listRef, (p) => {
    const list = listRef.current;
    if (!list) return;
    if (spineRef.current) spineRef.current.style.transform = `scaleY(${p})`;
    const h = list.offsetHeight;
    list.querySelectorAll<HTMLElement>(".tl-stop").forEach((el) => {
      el.classList.toggle("is-lit", (el.offsetTop + 14) / h <= p + 0.001);
    });
  });

  return (
    <section id="erfarenhet" className="section exp" aria-labelledby="erfarenhet-title">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="erfarenhet-title" index={s.index} label={s.label} lead="Utbildning och erfarenhet, en och samma" accent="väg." />
        <div className="tl">
          <div className="tl-track" aria-hidden="true"><div ref={spineRef} className="tl-spine" /></div>
          <ol ref={listRef} className="tl-list">
            {PATH.map((st, i) => (
              <li key={st.title + i} className="tl-stop">
                <span className="tl-dot" aria-hidden="true" />
                <div className="tl-when mono">
                  <span className="tl-kind">{st.kind}</span>
                  {st.when && <span className="tl-date">{st.when}</span>}
                </div>
                <div className="tl-body">
                  <h3 className="tl-title">{st.title}</h3>
                  <p className="tl-place">{st.place}</p>
                  <p className="tl-detail">{st.detail}</p>
                  {st.bullets && <ul className="tl-bul">{st.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                </div>
              </li>
            ))}
            <li className="tl-stop tl-next">
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-when mono"><span className="tl-kind">Nästa</span></div>
              <div className="tl-body tl-card">
                <h3 className="tl-title">Nästa — <em className="serif-em">ditt team?</em></h3>
                <p className="tl-detail">Kliniskt omdöme och fullstackutveckling i samma person.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

const css = `
@layer components {
.tl{position:relative;--x:clamp(120px,18vw,220px)}
.tl-track{position:absolute;left:var(--x);top:8px;bottom:8px;width:1px;background:var(--line)}
.tl-spine{position:absolute;inset:0;background:var(--ink);transform-origin:50% 0;transform:scaleY(0)}
.tl-list{list-style:none;margin:0;padding:0}
.tl-stop{position:relative;display:grid;grid-template-columns:var(--x) minmax(0,1fr);padding:0 0 clamp(36px,6vh,56px)}
.tl-dot{position:absolute;left:var(--x);top:10px;width:13px;height:13px;margin-left:-6px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 1.5px var(--faint);
  transition:background-color .5s var(--ease),box-shadow .5s var(--ease),transform .6s var(--ease)}
.tl-stop.is-lit .tl-dot{background:var(--ink);box-shadow:inset 0 0 0 1.5px var(--ink),0 0 0 6px rgba(13,13,13,.07);transform:scale(1.1)}
.tl-when{display:flex;flex-direction:column;gap:4px;padding-right:28px;font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);transition:color .5s var(--ease)}
.tl-date{color:inherit;text-transform:none;letter-spacing:0;font-size:12.5px}
.tl-body{padding-left:clamp(28px,4vw,56px);color:var(--mute);transform:translateX(-6px);transition:color .7s var(--ease),transform .7s var(--ease)}
.tl-body .tl-place,.tl-body .tl-detail{color:var(--mute);transition:color .7s var(--ease)}
.tl-stop.is-lit .tl-when{color:var(--ink-2)}
.tl-stop.is-lit .tl-date{color:var(--ink)}
.tl-stop.is-lit .tl-body{color:var(--ink);transform:none}
.tl-stop.is-lit .tl-place,.tl-stop.is-lit .tl-detail{color:var(--ink-2)}
.tl-title{margin:0;font-weight:700;letter-spacing:-.035em;font-size:clamp(22px,2.4vw,34px);line-height:1.1}
.tl-place{margin:6px 0 8px;font-weight:500}
.tl-detail{margin:0;max-width:62ch;font-size:15px}
.tl-bul{margin:10px 0 0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:6px}
.tl-bul li{font-size:13px;padding:5px 11px;border-radius:999px;box-shadow:var(--hair);background:var(--card)}
.tl-next{padding-bottom:0}
.tl-card{border:1.5px dashed rgba(13,13,13,.25);border-radius:24px;padding:26px 28px;margin-left:clamp(28px,4vw,56px);max-width:560px}
@media (max-width: 720px){
  .tl{--x:6px}
  .tl-stop{grid-template-columns:1fr;padding-left:28px}
  .tl-dot{left:6px}
  .tl-when{flex-direction:row;gap:10px;padding:0 0 6px}
  .tl-body{padding-left:0}
  .tl-card{margin-left:0;padding:22px}
}
}
`;
