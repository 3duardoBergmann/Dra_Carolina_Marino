"use client";

import { ScanFace, Smile, Spline } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { treatments } from "@/lib/content";
import { BookingLink } from "./actions";
import { Heading } from "./editorial-effects";
import { Card, CardSwap, type CardSwapControls } from "./react-bits";
import { useScrollSequence } from "./scroll-sequence";

const icons = { face: ScanFace, smile: Smile, profile: Spline };

function TreatmentCard({ treatment }: { treatment: (typeof treatments)[number] }) {
  const Icon = icons[treatment.icon];
  return (
    <article className="treatment-card">
      <div className="treatment-icon"><Icon aria-hidden="true" /></div>
      <Heading as="h3" lines={[treatment.title]} />
      <p>{treatment.description}</p>
      <BookingLink label="Perguntar no WhatsApp" subject={treatment.subject} style="inline" />
    </article>
  );
}

export function TreatmentSequence() {
  const total = treatments.length;
  const { region, active, pinned } = useScrollSequence(total);
  const deck = useRef<HTMLDivElement>(null);
  const controls = useRef<CardSwapControls>(null);
  const [size, setSize] = useState({ width: 430, height: 326 });

  useLayoutEffect(() => {
    const element = deck.current;
    if (!element) return;
    const measure = () => {
      const width = Math.max(205, Math.min(560, Math.floor(element.clientWidth - 31)));
      const compact = window.innerWidth <= 650;
      const height = compact ? 315 : 328;
      setSize((previous) => previous.width === width && previous.height === height ? previous : { width, height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [pinned]);

  useLayoutEffect(() => {
    controls.current?.goTo(active);
  }, [active, pinned]);

  return (
    <section ref={region} className="treatments scroll-sequence" id="tratamentos" aria-labelledby="treatment-title">
      <div className="scroll-stage">
        <div className="container treatment-layout">
          <div className="treatment-intro">
            <Heading id="treatment-title" lines={["Tratamentos"]} />
            <p>Conheça os cuidados para o sorriso e para a face.</p>
            {pinned && (
              <div className="treatment-progress">
                <span>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                <progress max={total} value={active + 1} aria-label="Tratamentos exibidos" />
              </div>
            )}
          </div>
          {pinned ? (
            <div className="treatment-deck" ref={deck} data-active-card={active}>
              <CardSwap ref={controls} label="Tratamentos em destaque" width={size.width} height={size.height}
                theme="light" cardDistance={17} verticalDistance={17} depth={44} skewAmount={2.5} visibleCards={3}
                autoplay={false} draggable={false} parallax={0} speed={1.12} bounce={0.12} intro={false} hoverSpread={0} scrollOnly>
                {treatments.map((treatment, index) => (
                  <Card key={treatment.subject} inert={index !== active} aria-hidden={index !== active}>
                    <TreatmentCard treatment={treatment} />
                  </Card>
                ))}
              </CardSwap>
            </div>
          ) : (
            <div className="treatment-list">
              {treatments.map((treatment) => <TreatmentCard key={treatment.subject} treatment={treatment} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
