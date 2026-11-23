"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True once (or while) the element intersects the viewport. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.2, rootMargin = "0px", once = true }: { threshold?: number; rootMargin?: string; once?: boolean } = {},
): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin, once]);
  return inView;
}

/**
 * Progress (0..1) of an element passing an anchor line in the viewport.
 * 0 when the element's top reaches `anchor`·vh, 1 when its bottom does.
 * Calls `onProgress` from a rAF loop that only runs while the element is near view.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (p: number) => void,
  anchor = 0.6,
): void {
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = false;
    let last = -1;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * anchor - r.top) / Math.max(1, r.height)));
      if (Math.abs(p - last) > 0.0005) {
        last = p;
        cb.current(p);
      }
      if (visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(tick);
        else tick();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(el);
    tick();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, anchor]);
}

/** matchMedia as state. */
export function useMedia(query: string, initial = false): boolean {
  const [m, setM] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return m;
}
