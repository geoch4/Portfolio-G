"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll, scrollToTarget } from "@/lib/scroll";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // scrolled state + progress bar (rAF-throttled)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  // active section
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const hit = ids.find((id) => seen.get(id));
        setActive(hit ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // indicator pill position
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list || !active) return setPill(null);
    const a = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (a) setPill({ x: a.offsetLeft, w: a.offsetWidth });
  }, [active]);
  useIso(() => { measure(); }, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // mobile overlay: lock scroll, Esc, focus
  useEffect(() => {
    if (!open) return;
    const btn = menuBtn.current;
    lockScroll(true);
    const first = overlayRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && overlayRef.current) {
        const f = Array.from(overlayRef.current.querySelectorAll<HTMLElement>("a,button"));
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); lockScroll(false); btn?.focus(); };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // let the overlay unlock scroll before moving
    requestAnimationFrame(() => scrollToTarget(id));
  };

  return (
    <>
      <style>{css}</style>
      <div className="nav-progress" aria-hidden="true"><div ref={barRef} /></div>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#top" className="nav-brand" onClick={go("top")} aria-label={`${PROFILE.name} – till toppen`}>
          <span className="nav-mark mono">{PROFILE.initials}</span>
          <span className="nav-name">{PROFILE.name}</span>
        </a>
        <nav aria-label="Huvudmeny" className="nav-pill">
          <ul ref={listRef}>
            {pill && <li aria-hidden="true" className="nav-ind" style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} />}
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  data-id={n.id}
                  onClick={go(n.id)}
                  aria-current={active === n.id ? "true" : undefined}
                  className={active === n.id ? "on" : ""}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          ref={menuBtn}
          className="nav-menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Stäng" : "Meny"}
        </button>
      </header>

      <div
        id="mobile-menu"
        ref={overlayRef}
        className={`nav-overlay ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Meny"
        hidden={!open}
      >
        <ol>
          {NAV.map((n, i) => (
            <li key={n.id} style={{ ["--i" as string]: i }}>
              <a href={`#${n.id}`} onClick={go(n.id)}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ol>
        <p className="nav-overlay-foot mono">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
      </div>
    </>
  );
}

const css = `
@layer components {
.nav-progress{position:fixed;inset:0 0 auto 0;height:2px;z-index:60;pointer-events:none}
.nav-progress>div{height:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0)}
.nav{position:fixed;z-index:50;top:14px;left:50%;transform:translateX(-50%);width:calc(100% - var(--gutter)*2);max-width:var(--maxw);
  display:flex;align-items:center;justify-content:space-between;gap:16px;padding:8px;border-radius:999px;
  transition:background-color .6s var(--ease),box-shadow .6s var(--ease),backdrop-filter .6s var(--ease)}
.nav.is-scrolled{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:var(--hair),0 10px 30px -18px rgba(13,13,13,.25)}
.nav-brand{display:flex;align-items:center;gap:12px;min-width:0;border-radius:999px}
.nav-mark{flex:none;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:600;
  box-shadow:inset 0 0 0 1.5px var(--ink);transition:background-color .5s var(--ease),color .5s var(--ease),transform .9s var(--ease)}
.nav.is-scrolled .nav-mark{background:var(--ink);color:#fff}
.nav-brand:hover .nav-mark{transform:rotate(360deg)}
.nav-name{font-weight:600;letter-spacing:-.02em;white-space:nowrap;transition:opacity .5s var(--ease),transform .5s var(--ease)}
.nav.is-scrolled .nav-name{opacity:0;transform:translateX(-8px);pointer-events:none}
.nav-pill ul{position:relative;display:flex;gap:2px;list-style:none;margin:0;padding:4px;border-radius:999px}
.nav:not(.is-scrolled) .nav-pill ul{background:rgba(255,255,255,.6);box-shadow:var(--hair)}
.nav-pill a{position:relative;z-index:1;display:block;padding:9px 16px;border-radius:999px;font-size:14px;font-weight:500;color:var(--ink-2);transition:color .4s var(--ease)}
.nav-pill a:hover{color:var(--ink)}
.nav-pill a.on{color:#fff}
.nav-ind{position:absolute;top:4px;bottom:4px;left:0;border-radius:999px;background:var(--ink);transition:transform .6s var(--ease),width .6s var(--ease)}
.nav-menu{display:none;height:42px;padding:0 20px;border-radius:999px;background:var(--ink);color:#fff;font-weight:500;font-size:14px;position:relative;z-index:70}
.nav-overlay{position:fixed;inset:0;z-index:45;background:var(--paper);display:flex;flex-direction:column;justify-content:center;padding:96px var(--gutter) 40px;
  clip-path:circle(0% at calc(100% - 52px) 36px);transition:clip-path .8s var(--ease)}
.nav-overlay.is-open{clip-path:circle(150% at calc(100% - 52px) 36px)}
.nav-overlay ol{list-style:none;margin:0;padding:0}
.nav-overlay li{opacity:0;transform:translateY(30px);transition:opacity .7s var(--ease),transform .7s var(--ease);transition-delay:calc(.15s + var(--i)*70ms)}
.nav-overlay.is-open li{opacity:1;transform:none}
.nav-overlay li a{display:flex;align-items:baseline;gap:14px;font-size:clamp(40px,12vw,64px);font-weight:700;letter-spacing:-.045em;line-height:1.12;border-bottom:1px solid var(--line);padding:6px 0}
.nav-overlay li a .mono{font-size:12px;font-weight:400;letter-spacing:0;color:var(--mute)}
.nav-overlay-foot{margin-top:28px;font-size:13px;color:var(--mute)}
@media (max-width: 860px){
  .nav-pill{display:none}
  .nav-menu{display:block}
}
@media (max-width: 380px){ .nav-name{font-size:14px} }
}
`;
