"use client";

import { Grainient, SplitText } from "./react-bits";

const grainPalette = ["#151216", "#251c23", "#502d42", "#ae6585", "#fff0f5"];

export function GrainBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`grain-backdrop ${className}`} aria-hidden="true">
      <Grainient colors={grainPalette} angle={54} flow={0.8} silk={0.35} grainAmount={0.07}
        scale={0.25} speed={0.15} grainSize={0.5} stir={0.25} dpr={1} />
    </div>
  );
}

export function Heading({ as: Tag = "h2", id, lines, accent = -1 }: {
  as?: "h1" | "h2" | "h3"; id?: string; lines: string[]; accent?: number;
}) {
  return (
    <Tag id={id} aria-label={lines.join(" ")}>
      {lines.map((text, index) => (
        <SplitText key={text} text={text} className={index === accent ? "split-line split-accent" : "split-line"}
          tag="span" effect="wave" splitType="chars" delay={85} duration={0.85} staggerFrom="start"
          trigger="click" hoverEffect="none" loop={false} loopDelay={1.5} mask={false}
          threshold={0.1} rootMargin="-100px" textAlign="left" />
      ))}
    </Tag>
  );
}
