"use client";

import { Instagram, Menu, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { contact, sections, whatsappLink } from "@/lib/content";
import { Magnet } from "./react-bits";

const mobileQuery = "(max-width: 820px)";

const socialMagnet = {
  padding: 54,
  magnetStrength: 3.6,
  maxOffset: 5,
  spring: { stiffness: 115, damping: 22, mass: 1 },
};

export function Navigation() {
  const [active, setActive] = useState<string>("inicio");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const rail = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = sections.map(({ id }) => document.getElementById(id)).filter((target) => target !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.48;
      const current = targets.findLast((target) => target.getBoundingClientRect().top <= readingLine);
      setActive(current?.id ?? "inicio");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || (!window.matchMedia(mobileQuery).matches && !rail.current?.contains(document.activeElement))) return;
      setOpen(false);
      toggle.current?.focus();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const closeOnMobile = () => { if (window.matchMedia(mobileQuery).matches) setOpen(false); };

  return (
    <aside ref={rail} className="rail" data-open={open} aria-label="Atalhos e navegação">
      <button ref={toggle} className="rail-toggle" type="button" aria-expanded={open} aria-controls="site-rail-panel"
        aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
        <Menu className="rail-menu-icon" aria-hidden="true" />
        <X className="rail-close-icon" aria-hidden="true" />
      </button>
      <div className="rail-panel" id="site-rail-panel" inert={!open} aria-hidden={!open}>
        <div className="rail-social">
          <Magnet {...socialMagnet} disabled={!open}>
            <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram da Dra. Carolina"><Instagram /></a>
          </Magnet>
          <Magnet {...socialMagnet} disabled={!open}>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp da Dra. Carolina"><MessageCircle /></a>
          </Magnet>
        </div>
        <nav className="rail-nav" aria-label="Menu principal">
          {sections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={closeOnMobile}>
              <span className="rail-indicator" />{label}
            </a>
          ))}
        </nav>
        <a href="#inicio" className="rail-brand" aria-label="Ir ao início" onClick={closeOnMobile}>
          <Image src="/marca/icone.svg" alt="" width={108} height={31} unoptimized />
        </a>
      </div>
    </aside>
  );
}
