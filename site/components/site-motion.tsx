"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollMotionQuery } from "./scroll-sequence";

export function SiteMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (window.scrollY < 80) {
        gsap.from(".hero-enter", { y: 18, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" });
      }

      gsap.to(".hero-image", {
        yPercent: -3.5, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(".hero-grain", {
        yPercent: 6, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 25, opacity: 0, duration: 0.72, ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });
    });

    media.add(scrollMotionQuery, () => {
      const section = document.getElementById("sobre");
      const stage = section?.querySelector<HTMLElement>(".about-stage");
      const slot = section?.querySelector<HTMLElement>(".about-photo-slot");
      const photo = section?.querySelector<HTMLElement>(".about-photo");
      if (!section || !stage || !slot || !photo) return;
      section.dataset.scrollActive = "";

      const position = () => {
        const area = stage.getBoundingClientRect();
        const target = slot.getBoundingClientRect();
        return { x: target.left - area.left, y: target.top - area.top, width: target.width, height: target.height };
      };
      const reveal = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
      });
      reveal.fromTo(photo, {
        x: 0, y: 0, width: () => stage.clientWidth, height: () => stage.clientHeight, borderRadius: 0,
      }, {
        x: () => position().x, y: () => position().y,
        width: () => position().width, height: () => position().height,
        borderRadius: 24, duration: 0.8, ease: "power2.inOut",
      }, 0.08);
      reveal.fromTo(photo.querySelector("img"), { objectPosition: "50% 3.5%" }, {
        objectPosition: "50% 50%", duration: 0.8, ease: "power2.inOut",
      }, 0.08);
      reveal.to(photo, { duration: 0.12 }, 0.88);

      const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(frame);
        delete section.dataset.scrollActive;
      };
    });
    return () => media.revert();
  }, []);
  return null;
}
