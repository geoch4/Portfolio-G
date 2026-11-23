"use client";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/** Smoothly scroll to a section id (or "top"), via Lenis when active. */
export function scrollToTarget(target: string) {
  const el = target === "top" ? null : document.getElementById(target);
  if (target !== "top" && !el) return;
  if (lenis) {
    lenis.scrollTo(el ?? 0, { offset: 0, duration: 1.2 });
  } else {
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
  // move focus for keyboard / screen-reader users without a second jump
  const focusEl = el ?? document.getElementById("main");
  if (focusEl) {
    if (!focusEl.hasAttribute("tabindex")) focusEl.setAttribute("tabindex", "-1");
    focusEl.focus({ preventScroll: true });
  }
}

export function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? "hidden" : "";
  if (lenis) {
    if (lock) lenis.stop();
    else lenis.start();
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return <>{children}</>;
}
