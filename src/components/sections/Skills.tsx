"use client";
import { useMemo, useRef, useState } from "react";
import { SECTIONS, SKILL_GROUPS, projectsForSkill } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";
import TechLogo, { isBrand } from "../ui/TechLogo";

type Tile = { id: string; name: string; symbol: string; logo: string; family: string; short: string; n: number };

export default function Skills() {
  const s = SECTIONS.kompetenser;
  const tiles: Tile[] = useMemo(() => {
    let n = 0;
    return SKILL_GROUPS.flatMap((g) => g.skills.map((sk) => ({ ...sk, family: g.family, short: g.short, n: ++n })));
  }, []);
  const [filter, setFilter] = useState<string | null>(null);
  const [activeId, setActiveId] = useState(tiles[0].id);
  const gridRef = useRef<HTMLUListElement>(null);
  const inView = useInView(gridRef, { threshold: 0.12 });
  const active = tiles.find((t) => t.id === activeId)!;
  const used = projectsForSkill(active.id);

  return (
    <section id="kompetenser" className="section skills" aria-labelledby="kompetenser-title">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="kompetenser-title" index={s.index} label={s.label} lead="Det periodiska systemet för min" accent="stack." />

        <div className="sk-filters rv" role="group" aria-label="Filtrera på familj">
          <button className={`sk-chip ${filter === null ? "on" : ""}`} aria-pressed={filter === null} onClick={() => setFilter(null)}>
            Alla <span className="mono">{tiles.length}</span>
          </button>
          {SKILL_GROUPS.map((g) => (
            <button
              key={g.family}
              className={`sk-chip ${filter === g.family ? "on" : ""}`}
              aria-pressed={filter === g.family}
              onClick={() => setFilter((f) => (f === g.family ? null : g.family))}
            >
              {g.family} <span className="mono">{g.skills.length}</span>
            </button>
          ))}
        </div>

        <div className="sk-layout">
          <ul ref={gridRef} className={`sk-grid ${inView ? "is-in" : ""}`} aria-label="Kompetenser">
            {tiles.map((t, i) => {
              const dim = filter !== null && t.family !== filter;
              return (
                <li key={t.id} className="sk-cell">
                <button
                  className={`sk-tile ${dim ? "dim" : ""} ${activeId === t.id ? "on" : ""}`}
                  style={{
                    ["--d8" as string]: `${(Math.floor(i / 8) + (i % 8)) * 40}ms`,
                    ["--d4" as string]: `${(Math.floor(i / 4) + (i % 4)) * 40}ms`,
                  }}
                  onMouseEnter={() => setActiveId(t.id)}
                  onFocus={() => setActiveId(t.id)}
                  onClick={() => setActiveId(t.id)}
                  aria-label={`${t.name}, ${t.family}`}
                  aria-describedby="sk-inspector"
                >
                  <span className="sk-n mono" aria-hidden="true">{t.n}</span>
                  <span className="sk-sym" aria-hidden="true">{t.symbol}</span>
                  <span className="sk-name" aria-hidden="true">{t.name}</span>
                  <span className="sk-fam mono" aria-hidden="true">{t.short}</span>
                </button>
                </li>
              );
            })}
          </ul>

          <aside id="sk-inspector" className="sk-insp card" aria-live="polite">
            <div className="sk-insp-top mono">
              <span>Nr {String(active.n).padStart(2, "0")}</span>
              <span>{active.symbol}</span>
            </div>
            <div key={active.id} className={`sk-logo ${isBrand(active.logo) ? "brand" : "concept"}`}>
              <TechLogo logo={active.logo} size={150} glow label={`${active.name} – logotyp`} />
            </div>
            <h3 className="sk-insp-name">{active.name}</h3>
            <p className="sk-insp-fam mono">{active.family}</p>
            <div className="sk-insp-used">
              <p className="mono">Används i</p>
              {used.length ? (
                <ul>{used.map((p) => <li key={p} className="chip">{p}</li>)}</ul>
              ) : (
                <p className="sk-none">Inget av projekten i CV:t – del av yrkeserfarenhet och utbildning.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

const css = `
@layer components {
.sk-filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
.sk-chip{height:36px;padding:0 14px;border-radius:999px;font-size:13.5px;font-weight:500;background:var(--card);box-shadow:var(--hair);
  display:inline-flex;align-items:center;gap:8px;transition:background-color .4s var(--ease),color .4s var(--ease),transform .4s var(--ease)}
.sk-chip .mono{font-size:11px;color:var(--mute)}
.sk-chip:hover{transform:translateY(-1px)}
.sk-chip.on{background:var(--ink);color:#fff;box-shadow:none}
.sk-chip.on .mono{color:rgba(255,255,255,.7)}
.sk-layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:24px;align-items:start}
.sk-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px}
.sk-cell{min-width:0}
.sk-tile{width:100%;position:relative;aspect-ratio:1/1.08;min-width:0;border-radius:14px;background:var(--card);box-shadow:var(--hair);text-align:left;
  padding:10px 10px 9px;display:flex;flex-direction:column;overflow:hidden;
  opacity:0;transform:translateY(16px) scale(.96);
  transition:opacity .8s var(--ease),transform .8s var(--ease),background-color .35s var(--ease),color .35s var(--ease),box-shadow .35s var(--ease);
  transition-delay:var(--d8),var(--d8),0s,0s,0s}
.sk-grid.is-in .sk-tile{opacity:1;transform:none}
.sk-grid.is-in .sk-tile.dim{opacity:.22}
.sk-tile:hover,.sk-tile.on{background:var(--ink);color:#fff;box-shadow:var(--lift)}
.sk-tile:hover .sk-n,.sk-tile.on .sk-n,.sk-tile:hover .sk-fam,.sk-tile.on .sk-fam{color:rgba(255,255,255,.62)}
.sk-n{font-size:10px;color:var(--mute)}
.sk-sym{font-weight:700;letter-spacing:-.05em;font-size:clamp(20px,2.2vw,34px);line-height:1;margin-top:auto}
.sk-name{font-size:11.5px;font-weight:500;line-height:1.2;margin-top:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sk-fam{font-size:9.5px;color:var(--mute);margin-top:2px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sk-insp{position:sticky;top:96px;padding:22px;min-height:440px;display:flex;flex-direction:column}
.sk-insp-top{display:flex;justify-content:space-between;font-size:11.5px;color:var(--mute)}
.sk-logo{height:200px;display:grid;place-items:center;animation:pop .7s var(--ease) both}
@keyframes pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.06);opacity:1}100%{transform:scale(1)}}
.sk-logo.concept .tlogo{color:var(--ink)}
.sk-insp-name{font-weight:700;letter-spacing:-.04em;font-size:30px;line-height:1.05;margin:4px 0 6px}
.sk-insp-fam{font-size:12px;color:var(--mute);margin:0 0 18px;text-transform:uppercase;letter-spacing:.05em}
.sk-insp-used{border-top:1px solid var(--line);padding-top:14px;margin-top:auto}
.sk-insp-used>p.mono{font-size:11px;color:var(--mute);text-transform:uppercase;letter-spacing:.06em;margin:0 0 10px}
.sk-insp-used ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.sk-none{margin:0;font-size:13.5px;color:var(--ink-2)}
@media (max-width: 1080px){
  .sk-layout{grid-template-columns:1fr}
  .sk-insp{position:relative;top:0;min-height:0}
  .sk-logo{height:180px}
}
@media (max-width: 720px){
  .sk-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
  .sk-tile{transition-delay:var(--d4),var(--d4),0s,0s,0s}
  .sk-sym{font-size:24px}
}
}
`;
