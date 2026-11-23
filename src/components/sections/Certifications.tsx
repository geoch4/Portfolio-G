import { CERTIFICATIONS, SECTIONS } from "@/lib/data";

export default function Certifications() {
  const s = SECTIONS.certifieringar;
  return (
    <section id="certifieringar" className="section certs" aria-labelledby="cert-title">
      <style>{css}</style>
      <div className="wrap certs-grid">
        <div className="certs-left">
          <div className="certs-sticky">
            <p className="tag rv"><span>{s.index}</span> — {s.label}</p>
            <h2 id="cert-title" className="h2">
              <span className="rv-mask"><span>Alltid </span></span>
              <span className="rv-mask" style={{ ["--i" as string]: 1 }}><span><em>lärande.</em></span></span>
            </h2>
            <p className="certs-count mono rv">
              {String(CERTIFICATIONS.length).padStart(2, "0")} certifieringar, legitimation och kurser
            </p>
          </div>
        </div>
        <ol className="certs-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="rv" style={{ ["--i" as string]: i % 4 }}>
              <div className="cert-row" tabIndex={0}>
                <span className="cert-n mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="cert-t">{c.title}</span>
                <span className="cert-i mono">{c.issuer}</span>
                <span className="cert-arrow" aria-hidden="true">↗</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const css = `
@layer components {
.certs{background:var(--card);border-block:1px solid var(--line)}
.certs-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,5vw,80px);align-items:start}
.certs-sticky{position:sticky;top:120px}
.certs-count{margin-top:22px;font-size:12.5px;color:var(--mute)}
.certs-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.certs-list li{border-bottom:1px solid var(--line)}
.cert-row{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr) auto 24px;align-items:center;gap:16px;padding:20px 14px;border-radius:0;isolation:isolate;overflow:hidden;
  transition:color .5s var(--ease)}
.cert-row::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:0 50%;z-index:-1;transition:transform .7s var(--ease)}
.cert-row:hover,.cert-row:focus-visible{color:#fff}
.cert-row:hover::before,.cert-row:focus-visible::before{transform:scaleX(1)}
.cert-row:focus-visible{outline-offset:-2px}
.cert-n{font-size:12px;color:var(--mute);transition:color .5s var(--ease)}
.cert-t{font-weight:600;font-size:clamp(16px,1.4vw,20px);letter-spacing:-.02em;line-height:1.3}
.cert-i{font-size:12px;color:var(--mute);white-space:nowrap;transition:color .5s var(--ease)}
.cert-row:hover .cert-n,.cert-row:hover .cert-i,.cert-row:focus-visible .cert-n,.cert-row:focus-visible .cert-i{color:rgba(255,255,255,.7)}
.cert-arrow{opacity:0;transform:translate(-10px,6px);transition:opacity .5s var(--ease),transform .6s var(--ease)}
.cert-row:hover .cert-arrow,.cert-row:focus-visible .cert-arrow{opacity:1;transform:none}
@media (max-width: 860px){
  .certs-grid{grid-template-columns:1fr}
  .certs-sticky{position:static}
  .cert-row{grid-template-columns:34px minmax(0,1fr) 20px;gap:10px 12px;padding:16px 8px}
  .cert-i{grid-column:2;grid-row:2;white-space:normal}
  .cert-arrow{grid-column:3;grid-row:1}
}
}
`;
