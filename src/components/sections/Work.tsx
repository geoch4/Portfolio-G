"use client";
import { useState } from "react";
import { PROFILE, PROJECTS, SECTIONS, type Project } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import TechLogo from "../ui/TechLogo";

/* ---------- Illustrative mini-UIs (pure CSS/JSX, grayscale, no real data) ---------- */

function CprUI() {
  return (
    <div className="mui mui-cpr">
      <div className="mui-bar"><i /><i /><i /><span>medquick</span></div>
      <div className="cpr-body">
        <div className="cpr-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" /><circle className="arc" cx="50" cy="50" r="44" /></svg><b className="mono">02:00</b><small>cykel</small></div>
        <ol className="cpr-steps">
          {["Steg", "Steg", "Steg", "Steg"].map((t, i) => <li key={i} className={i === 1 ? "on" : i < 1 ? "done" : ""}><span className="mono">{i + 1}</span>{t} {i + 1}</li>)}
        </ol>
      </div>
      <div className="cpr-log">{[0, 1, 2].map((i) => <div key={i}><span className="mono">00:0{i}</span><i style={{ width: `${70 - i * 15}%` }} /></div>)}</div>
    </div>
  );
}

function ReferralUI() {
  return (
    <div className="mui mui-ref">
      <div className="mui-bar"><i /><i /><i /><span>flux / volt</span></div>
      <div className="ref-head mono"><span>Remiss</span><span>Prioritet</span><span>Status</span></div>
      {[90, 72, 55, 40, 24].map((w, i) => (
        <div className="ref-row" key={i}>
          <span className="ref-tag mono">{i % 2 ? "rTMS" : "ECT"}</span>
          <span className="ref-prio"><i style={{ width: `${w}%` }} /></span>
          <span className={`ref-dot ${i < 2 ? "full" : ""}`} />
        </div>
      ))}
      <div className="ref-cards">{[0, 1, 2].map((i) => <div key={i}><b className="mono">{["—", "—", "—"][i]}</b><i /></div>)}</div>
    </div>
  );
}

function CrudUI() {
  return (
    <div className="mui mui-crud">
      <div className="mui-bar"><i /><i /><i /><span>catfinder</span></div>
      <div className="crud-search"><span /><b className="mono">Sök…</b><em>+ Ny</em></div>
      <div className="crud-grid">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="crud-card"><div className="crud-img" /><i /><i className="s" /><div className="crud-act"><span /><span /></div></div>
        ))}
      </div>
    </div>
  );
}

const UIS: Record<Project["ui"], () => React.ReactElement> = { cpr: CprUI, referral: ReferralUI, crud: CrudUI };

export default function Work() {
  const s = SECTIONS.projekt;
  const [open, setOpen] = useState(0);

  return (
    <section id="projekt" className="section work" aria-labelledby="projekt-title">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="projekt-title" index={s.index} label={s.label} lead="Saker jag har" accent="byggt." />
        <div className="wk rv">
          {PROJECTS.map((p, i) => {
            const isOpen = open === i;
            const UI = UIS[p.ui];
            return (
              <article
                key={p.id}
                className={`wk-panel ${isOpen ? "is-open" : ""}`}
                onMouseEnter={() => setOpen(i)}
                onFocusCapture={() => setOpen(i)}
                aria-labelledby={`wk-${p.id}`}
              >
                <button
                  className="wk-spine"
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  aria-controls={`wk-body-${p.id}`}
                  tabIndex={isOpen ? -1 : 0}
                >
                  <span className="mono wk-num">{p.index}</span>
                  <span className="wk-vtitle" id={`wk-${p.id}`}>{p.title}</span>
                  <span className="wk-plus" aria-hidden="true">+</span>
                  <span className="sr-only">Visa projektet {p.title}</span>
                </button>

                <div className="wk-body" id={`wk-body-${p.id}`} hidden={!isOpen} aria-hidden={!isOpen}>
                  <div className="wk-info">
                    <p className="wk-kicker mono"><span>{p.index}</span> {p.kicker}{p.status && <em className="wk-status">{p.status}</em>}</p>
                    <h3 className="wk-title">{p.title}</h3>
                    <p className="wk-desc">{p.description}</p>
                    <ul className="wk-feats">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                    <ul className="wk-tech" aria-label="Teknik">
                      {p.tech.map((t) => <li key={t.label} className="chip"><TechLogo logo={t.logo} size={15} />{t.label}</li>)}
                    </ul>
                    {p.github && (
                      <a className="btn btn-primary btn-sm" href={p.github} target="_blank" rel="noopener noreferrer">Visa på GitHub <span aria-hidden="true">↗</span></a>
                    )}
                  </div>
                  <figure className="wk-ui" aria-label={`Illustrativt gränssnitt för ${p.title}, inte en riktig skärmbild`}>
                    <UI />
                    <figcaption className="mono">Illustrativt UI</figcaption>
                  </figure>
                </div>
              </article>
            );
          })}
        </div>
        <p className="wk-note rv mono">
          Kod och fler projekt på <a className="u-link" href={PROFILE.github} target="_blank" rel="noopener noreferrer">{PROFILE.githubLabel}</a>
        </p>
      </div>
    </section>
  );
}

const css = `
@layer components {
.wk{display:flex;gap:10px;height:min(78svh,600px)}
.wk-panel{position:relative;flex:1 1 0;min-width:0;border-radius:26px;background:var(--card);box-shadow:var(--hair);overflow:hidden;
  transition:flex-grow .9s var(--ease),box-shadow .6s var(--ease)}
.wk-panel.is-open{flex-grow:8;box-shadow:var(--hair),var(--lift)}
.wk-spine{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0;width:100%;
  transition:opacity .4s var(--ease)}
.wk-panel.is-open .wk-spine{opacity:0;pointer-events:none}
.wk-num{font-size:12px;color:var(--mute)}
.wk-vtitle{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:700;letter-spacing:-.03em;font-size:clamp(20px,1.8vw,26px);white-space:nowrap}
.wk-plus{width:38px;height:38px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(13,13,13,.22);display:grid;place-items:center;font-size:20px;line-height:1;
  transition:transform .6s var(--ease),background-color .4s var(--ease),color .4s var(--ease)}
.wk-spine:hover .wk-plus{transform:rotate(90deg);background:var(--ink);color:#fff}
.wk-body{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:clamp(18px,2.4vw,36px);padding:clamp(22px,2.6vw,38px);
  min-width:min(860px,80vw);animation:wkIn .8s var(--ease) both}
.wk-body[hidden]{display:none}
@keyframes wkIn{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:none}}
.wk-info{display:flex;flex-direction:column;align-items:flex-start;min-width:0;overflow:auto;scrollbar-width:none}
.wk-kicker{font-size:12px;color:var(--mute);display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:0 0 10px}
.wk-kicker span{color:var(--ink)}
.wk-status{font-style:normal;font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;padding:3px 9px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);color:var(--ink-2)}
.wk-title{font-weight:700;letter-spacing:-.045em;line-height:1;font-size:clamp(32px,3.6vw,54px);margin:0 0 14px}
.wk-desc{margin:0 0 16px;color:var(--ink-2);font-size:15px;line-height:1.6}
.wk-feats{list-style:none;margin:0 0 18px;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;width:100%}
.wk-feats li{font-size:13.5px;padding-left:16px;position:relative;line-height:1.35}
.wk-feats li::before{content:"";position:absolute;left:0;top:.6em;width:8px;height:1px;background:var(--ink)}
.wk-tech{list-style:none;margin:0 0 18px;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.wk-ui{margin:0;position:relative;border-radius:20px;background:var(--paper);box-shadow:var(--hair);display:grid;place-items:center;padding:22px;min-width:0;
  animation:wipe 1.1s var(--ease) .15s both}
@keyframes wipe{from{clip-path:inset(0 0 0 100% round 20px)}to{clip-path:inset(0 0 0 0 round 20px)}}
.wk-ui figcaption{position:absolute;top:14px;right:16px;font-size:10.5px;color:var(--mute);text-transform:uppercase;letter-spacing:.08em}
.wk-note{margin-top:22px;font-size:12.5px;color:var(--mute)}
/* mini ui */
.mui{width:100%;max-width:380px;background:#fff;border-radius:16px;box-shadow:var(--hair),0 24px 40px -26px rgba(13,13,13,.35);padding:12px;font-size:11px}
.mui-bar{display:flex;align-items:center;gap:5px;margin-bottom:12px}
.mui-bar i{width:8px;height:8px;border-radius:50%;background:var(--soft)}
.mui-bar span{margin-left:8px;font-family:var(--font-mono);font-size:10px;color:var(--mute)}
.cpr-body{display:grid;grid-template-columns:120px 1fr;gap:14px;align-items:center}
.cpr-ring{position:relative;width:120px;height:120px;display:grid;place-items:center}
.cpr-ring svg{position:absolute;inset:0;transform:rotate(-90deg)}
.cpr-ring circle{fill:none;stroke:var(--soft);stroke-width:6}
.cpr-ring .arc{stroke:var(--ink);stroke-dasharray:276;stroke-dashoffset:276;animation:arc 6s linear infinite;stroke-linecap:round}
@keyframes arc{to{stroke-dashoffset:0}}
.cpr-ring b{font-size:22px;font-weight:600;position:relative;top:-4px}
.cpr-ring small{position:absolute;bottom:34px;color:var(--mute);font-size:10px}
.cpr-steps{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.cpr-steps li{display:flex;align-items:center;gap:8px;padding:7px 9px;border-radius:9px;background:var(--paper);color:var(--mute)}
.cpr-steps li .mono{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-size:9.5px;box-shadow:inset 0 0 0 1px var(--line)}
.cpr-steps li.on{background:var(--ink);color:#fff}
.cpr-steps li.on .mono{box-shadow:inset 0 0 0 1px rgba(255,255,255,.4)}
.cpr-steps li.done{color:var(--ink);text-decoration:line-through;text-decoration-color:var(--faint)}
.cpr-log{margin-top:12px;display:grid;gap:6px;border-top:1px solid var(--line);padding-top:10px}
.cpr-log div{display:flex;align-items:center;gap:10px;color:var(--mute)}
.cpr-log i{height:6px;border-radius:9px;background:var(--soft)}
.ref-head,.ref-row{display:grid;grid-template-columns:56px 1fr 22px;gap:10px;align-items:center}
.ref-head{font-size:9.5px;color:var(--mute);text-transform:uppercase;padding:0 4px 6px;border-bottom:1px solid var(--line)}
.ref-row{padding:8px 4px;border-bottom:1px solid var(--line)}
.ref-tag{font-size:10px;padding:2px 6px;border-radius:6px;box-shadow:inset 0 0 0 1px var(--line);justify-self:start}
.ref-prio{height:7px;border-radius:9px;background:var(--soft);overflow:hidden}
.ref-prio i{display:block;height:100%;background:var(--ink);border-radius:9px;transform-origin:0 50%;animation:grow 1.2s var(--ease) both}
@keyframes grow{from{transform:scaleX(0)}}
.ref-dot{width:10px;height:10px;border-radius:50%;box-shadow:inset 0 0 0 1.5px var(--ink);justify-self:center}
.ref-dot.full{background:var(--ink)}
.ref-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
.ref-cards div{background:var(--paper);border-radius:10px;padding:10px;display:grid;gap:8px}
.ref-cards b{font-size:16px}
.ref-cards i{height:5px;border-radius:9px;background:var(--soft)}
.crud-search{display:flex;align-items:center;gap:8px;background:var(--paper);border-radius:10px;padding:8px 10px;margin-bottom:10px}
.crud-search span{width:10px;height:10px;border-radius:50%;box-shadow:inset 0 0 0 1.5px var(--mute)}
.crud-search b{font-weight:400;color:var(--mute);flex:1}
.crud-search em{font-style:normal;background:var(--ink);color:#fff;border-radius:7px;padding:3px 8px;font-size:10px}
.crud-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.crud-card{border-radius:10px;box-shadow:var(--hair);padding:6px;display:grid;gap:5px}
.crud-img{aspect-ratio:4/3;border-radius:7px;background:linear-gradient(135deg,var(--soft),#d8d5cf)}
.crud-card i{height:5px;border-radius:9px;background:var(--soft)} .crud-card i.s{width:60%}
.crud-act{display:flex;gap:4px;justify-content:flex-end}
.crud-act span{width:14px;height:8px;border-radius:4px;box-shadow:inset 0 0 0 1px var(--line)}
@media (max-width: 900px){
  .wk{flex-direction:column;height:auto}
  .wk-panel{flex:none;min-height:76px}
  .wk-spine{position:relative;inset:auto;flex-direction:row;padding:0 20px;height:76px}
  .wk-panel.is-open .wk-spine{display:none}
  .wk-vtitle{writing-mode:horizontal-tb;transform:none;flex:1;margin-left:16px;text-align:left}
  .wk-body{position:relative;inset:auto;min-width:0;grid-template-columns:1fr}
  .wk-ui{padding:18px 14px 30px}
}
@media (max-width: 480px){ .wk-feats{grid-template-columns:1fr} }
}
`;
