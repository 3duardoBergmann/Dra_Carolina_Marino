"use client";

import type { ReactNode } from "react";
import TiltedCard, { TiltedCardLayer } from "./TiltedCard";

export function ContactCard({ children }: { children: ReactNode }) {
  return (
    <TiltedCard className="contact-tilt" containerWidth="100%" containerHeight="auto"
      imageWidth="100%" imageHeight="auto" rotateAmplitude={6} radius={25}
      scaleOnHover={1.015} glare={0.26} glareColor="#ffd0e4" shadow={0.38}
      parallax={0.4} intro={false} showTooltip={false}>
      <TiltedCardLayer className="contact-plane" depth={12}>{children}</TiltedCardLayer>
    </TiltedCard>
  );
}
