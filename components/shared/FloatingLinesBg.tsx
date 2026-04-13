"use client";

import dynamic from "next/dynamic";

const FloatingLines = dynamic(() => import("@/components/shared/FloatingLines"), {
  ssr: false,
});

interface FloatingLinesBgProps {
  className?: string;
  linesGradient?: string[];
  enabledWaves?: ("top" | "middle" | "bottom")[];
  lineCount?: number | number[];
  lineDistance?: number | number[];
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: string;
}

export default function FloatingLinesBg({
  className = "",
  linesGradient = ["#5B3FD8", "#9B7BFF", "#185FA5", "#C4B5FD"],
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = 10,
  lineDistance = 5,
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5,
  bendStrength = -0.5,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = "screen",
}: FloatingLinesBgProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <FloatingLines
        linesGradient={linesGradient}
        enabledWaves={enabledWaves}
        lineCount={lineCount}
        lineDistance={lineDistance}
        animationSpeed={animationSpeed}
        interactive={interactive}
        bendRadius={bendRadius}
        bendStrength={bendStrength}
        parallax={parallax}
        parallaxStrength={parallaxStrength}
        mixBlendMode={mixBlendMode}
      />
    </div>
  );
}
