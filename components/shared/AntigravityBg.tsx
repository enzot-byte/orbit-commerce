"use client";

import dynamic from "next/dynamic";

const Antigravity = dynamic(() => import("@/components/shared/Antigravity"), {
  ssr: false,
});

export interface AntigravityBgProps {
  className?: string;
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "sphere" | "box" | "tetrahedron";
  fieldStrength?: number;
}

export default function AntigravityBg({
  className = "",
  ...props
}: AntigravityBgProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Antigravity {...props} />
    </div>
  );
}
