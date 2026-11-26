"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let scroller: Lenis | null = null;

export function scrollPageTo(target: HTMLElement | number) {
  if (scroller) {
    scroller.scrollTo(target, { duration: 0.85, easing: (progress) => 1 - Math.pow(1 - progress, 3) });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "auto" });
  } else {
    target.scrollIntoView();
  }
}

export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const instance = new Lenis({ lerp: 0.085, wheelMultiplier: 0.92, syncTouch: false });
      scroller = instance;
      const tick = (seconds: number) => instance.raf(seconds * 1000);
      const sync = () => ScrollTrigger.update();
      const unsubscribe = instance.on("scroll", sync);
      gsap.ticker.add(tick);

      const onAnchor = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
        const hash = link?.getAttribute("href");
        const target = hash && document.getElementById(hash.slice(1));
        if (!target || !hash || link?.target || link?.hasAttribute("download")) return;

        event.preventDefault();
        if (location.hash !== hash) history.pushState(null, "", hash);
        if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
        target.focus({ preventScroll: true });
        scrollPageTo(target);
      };
      document.addEventListener("click", onAnchor);
      return () => {
        document.removeEventListener("click", onAnchor);
        gsap.ticker.remove(tick);
        unsubscribe();
        instance.destroy();
        scroller = null;
      };
    });
    return () => media.revert();
  }, []);
  return null;
}
