import type { NextConfig } from "next";

const config: NextConfig = {
  agentRules: false,
  output: "export",
  devIndicators: false,
  images: { unoptimized: true },
};

export default config;
