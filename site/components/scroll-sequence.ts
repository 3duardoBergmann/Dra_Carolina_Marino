"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollPageTo } from "./smooth-scroll";

export const scrollMotionQuery = "(min-height: 520px) and (prefers-reduced-motion: no-preference)";

export function useScrollSequence(total: number) {
  const region = useRef<HTMLElement>(null);
  const controller = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useLayoutEffect(() => {
    const element = region.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(scrollMotionQuery, () => {
      element.dataset.scrollActive = "";
      element.style.setProperty("--scroll-steps", String(total));
      setPinned(true);
      const sync = ({ progress }: ScrollTrigger) => setActive(Math.min(total - 1, Math.floor(progress * total)));
      const trigger = ScrollTrigger.create({
        trigger: element, start: "top top", end: "bottom bottom",
        onUpdate: sync, onRefresh: sync,
      });
      controller.current = trigger;
      sync(trigger);
      return () => {
        controller.current = null;
        delete element.dataset.scrollActive;
        element.style.removeProperty("--scroll-steps");
        setPinned(false);
      };
    });
    return () => media.revert();
  }, [total]);

  function goTo(index: number) {
    const trigger = controller.current;
    if (!trigger) {
      setActive(index);
      return;
    }
    const destination = trigger.start + (trigger.end - trigger.start) * ((index + 0.5) / total);
    scrollPageTo(destination);
  }

  return { region, active, pinned, goTo };
}
