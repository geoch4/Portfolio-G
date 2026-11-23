"use client";
import { useState } from "react";
import { PROFILE, SECTIONS } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

function Hop({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i} className="hop-sp"> </span>
        ) : (
          <span
            key={i}
            className="hop"
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.classList.remove("is-hop");
              void el.offsetWidth;
              el.classList.add("is-hop");
            }}
            onAnimationEnd={(e) => e.currentTarget.classList.remove("is-hop")}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

export default function Contact() {
  const s = SECTIONS.kontakt;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const t = document.createElement("textarea");
      t.value = PROFILE.email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };
  const badge = "SÄG HEJ · SÄG HEJ · SÄG HEJ · SÄG HEJ ·";

  return (
    <section id="kontakt" className="section contact" aria-labelledby="kontakt-title">
        <style>{css}</style>
        <div className="wrap">
          <p className="tag rv"><span>{s.index}</span> — {s.label}</p>
          <h2 id="kontakt-title" className="ct-h">
            <span className="sr-only">Låt oss bygga något tillsammans.</span>
            <Hop text="Låt oss bygga" className="ct-line" />
            <span className="ct-line" aria-hidden="true">
              <Hop text="något " />
              <em><Hop text="tillsammans." /></em>
            </span>
          </h2>

          <div className="ct-row">
            <div className="ct-mail-wrap">
              <a className="ct-mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <button className={`ct-copy ${copied ? "is-done" : ""}`} onClick={copy} aria-label="Kopiera e-postadressen">
                {copied ? "Kopierad ✓" : "Kopiera"}
              </button>
              <span className="sr-only" aria-live="polite">{copied ? "E-postadressen är kopierad" : ""}</span>
            </div>
            <a className="ct-badge" href={`mailto:${PROFILE.email}`} aria-label={`Säg hej – skicka e-post till ${PROFILE.email}`}>
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <defs><path id="ct-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
                <text><textPath href="#ct-circle" textLength="484" lengthAdjust="spacing">{badge}</textPath></text>
              </svg>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ul className="ct-links">
            <li><span className="mono">Telefon</span><a className="u-link" href={PROFILE.phoneHref}>{PROFILE.phone}</a></li>
            <li><span className="mono">GitHub</span><a className="u-link" href={PROFILE.github} target="_blank" rel="noopener noreferrer">{PROFILE.githubLabel}</a></li>
            <li><span className="mono">LinkedIn</span><a className="u-link" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">Georgia Chalkia</a></li>
            <li><span className="mono">Plats</span><span>{PROFILE.location}</span></li>
          </ul>
        </div>
      </section>
  );
}

export function Footer() {
  return (
    <footer className="ft wrap">
        <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        <a href="#top" className="u-link" onClick={(e) => { e.preventDefault(); scrollToTarget("top"); }}>Till toppen ↑</a>
        <p className="mono">Byggd med Next.js</p>
    </footer>
  );
}

const css = `
@layer components {
.contact{padding-bottom:clamp(64px,10vh,110px)}
.ct-h{margin:0 0 clamp(40px,7vh,72px);font-weight:700;letter-spacing:-.05em;line-height:.98;font-size:clamp(46px,9.6vw,156px)}
.ct-line{display:block}
.ct-h em{font-family:var(--font-serif);font-style:italic;font-weight:400;letter-spacing:-.02em;color:var(--mute)}
.hop{display:inline-block;will-change:transform}
.hop.is-hop{animation:hop .6s var(--ease)}
@keyframes hop{0%{transform:none}35%{transform:translateY(-.16em)}65%{transform:translateY(.03em)}100%{transform:none}}
.hop-sp{display:inline-block;width:.24em}
.ct-row{display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap;padding-bottom:36px;border-bottom:1px solid var(--line)}
.ct-mail-wrap{display:flex;align-items:center;gap:16px;flex-wrap:wrap;min-width:0}
.ct-mail{font-weight:600;letter-spacing:-.035em;font-size:clamp(24px,4.2vw,58px);overflow-wrap:anywhere;
  background:linear-gradient(currentColor,currentColor) 0 100%/100% 2px no-repeat;padding-bottom:4px;transition:background-size .6s var(--ease)}
.ct-mail:hover{background-size:0 2px;background-position:100% 100%}
.ct-copy{height:36px;padding:0 16px;border-radius:999px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.22);font-size:13.5px;font-weight:500;transition:background-color .4s var(--ease),color .4s var(--ease)}
.ct-copy:hover,.ct-copy.is-done{background:var(--ink);color:#fff}
.ct-badge{position:relative;flex:none;width:136px;height:136px;border-radius:50%;display:grid;place-items:center;font-size:26px}
.ct-badge svg{position:absolute;inset:0;width:100%;height:100%;animation:spin 18s linear infinite}
.ct-badge text{font-family:var(--font-mono);font-size:15px;letter-spacing:.2em;fill:var(--ink)}
.ct-badge>span{width:54px;height:54px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;transition:transform .6s var(--ease)}
.ct-badge:hover>span{transform:rotate(45deg) scale(1.06)}
@keyframes spin{to{transform:rotate(360deg)}}
.ct-links{list-style:none;margin:0;padding:28px 0 0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}
.ct-links li{display:flex;flex-direction:column;gap:6px;min-width:0;overflow-wrap:anywhere}
.ct-links .mono{font-size:11.5px;color:var(--mute);text-transform:uppercase;letter-spacing:.06em}
.ct-links a,.ct-links li>span:last-child{font-weight:500;justify-self:start;align-self:flex-start}
.ft{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding-top:24px;padding-bottom:28px;border-top:1px solid var(--line);font-size:13.5px;color:var(--ink-2)}
.ft p{margin:0}
.ft .mono{font-size:12px;color:var(--mute)}
@media (max-width: 760px){ .ct-links{grid-template-columns:1fr 1fr} }
@media (max-width: 420px){ .ct-links{grid-template-columns:1fr} .ct-badge{width:112px;height:112px} }
}
`;
