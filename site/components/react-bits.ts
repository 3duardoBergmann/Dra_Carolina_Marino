import type { ComponentType, ReactNode, Ref } from "react";
import GrainientSource from "./Grainient";
import MagnetSource from "./Magnet";
import CardSwapSource, { Card as CardSource } from "./CardSwap";
import StepperSource, { Step as StepSource } from "./Stepper";
import SplitTextSource from "./SplitText";

export const Grainient = GrainientSource as ComponentType<{
  colors: string[]; angle: number; flow: number; silk: number; grainAmount: number;
  scale: number; speed: number; grainSize: number; stir: number; dpr: number;
}>;

export const Magnet = MagnetSource as ComponentType<{
  children: ReactNode; padding: number; magnetStrength: number; maxOffset: number; disabled?: boolean;
  spring?: { stiffness?: number; damping?: number; mass?: number };
}>;

export type CardSwapControls = { goTo: (index: number) => void };
export const CardSwap = CardSwapSource as unknown as ComponentType<{
  children: ReactNode; ref: Ref<CardSwapControls>; width: number; height: number;
  visibleCards: number; cardDistance: number; verticalDistance: number; depth: number;
  skewAmount: number; autoplay: boolean; draggable: boolean; parallax: number;
  speed: number; bounce: number; intro: boolean; hoverSpread: number; scrollOnly: boolean;
  theme: "light" | "dark"; label: string;
}>;
export const Card = CardSource as ComponentType<{ children: ReactNode; inert?: boolean; "aria-hidden"?: boolean }>;

export const Stepper = StepperSource as unknown as ComponentType<{
  children: ReactNode; step: number; onStepChange: (step: number) => void;
  onFinalStepCompleted: () => void; backButtonText: string; nextButtonText: string;
  completeButtonText: string; indicator: "bars"; linear: boolean; theme: "light";
  width: string; accentColor: string; className: string;
}>;
export const Step = StepSource as ComponentType<{ children: ReactNode; title: string }>;

export const SplitText = SplitTextSource as ComponentType<{
  text: string; className: string; tag: "span"; effect: "wave"; splitType: "chars";
  delay: number; duration: number; staggerFrom: "start"; trigger: "click";
  hoverEffect: "none"; loop: boolean; loopDelay: number; mask: boolean;
  threshold: number; rootMargin: string; textAlign: "left";
}>;
