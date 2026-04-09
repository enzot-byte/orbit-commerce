import { cn } from "@/lib/utils";

interface OrbitalAnimationProps {
  size?: number;
  opacity?: number;
  className?: string;
}

export default function OrbitalAnimation({
  size = 400,
  opacity = 0.4,
  className,
}: OrbitalAnimationProps) {
  const half = size / 2;
  const ringPad = 24;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size, opacity }}
      aria-hidden="true"
    >
      {/* Central solid circle */}
      <div
        className="absolute rounded-full bg-orbit-600 shadow-glow-orbit z-10"
        style={{ width: size * 0.12, height: size * 0.12 }}
      />

      {/* Inner glow ring around center */}
      <div
        className="absolute rounded-full border border-orbit-400/30"
        style={{
          width: size * 0.22,
          height: size * 0.22,
        }}
      />

      {/* First orbital ring — slow clockwise */}
      <div
        className="absolute animate-orbit-slow"
        style={{
          width: size * 0.56,
          height: size * 0.56,
        }}
      >
        <div
          className="w-full h-full rounded-full border orbital-ring"
          style={{ borderColor: "rgba(24,95,165,0.45)" }}
        />
        {/* Satellite dot on first ring */}
        <div
          className="absolute rounded-full bg-accent-400 shadow-glow-accent"
          style={{
            width: 10,
            height: 10,
            top: "0%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Second orbital ring — slow reverse (larger, tilted ellipse) */}
      <div
        className="absolute animate-orbit-reverse"
        style={{
          width: size * 0.86,
          height: size * 0.5,
          transform: "rotateX(60deg)",
        }}
      >
        <div
          className="w-full h-full rounded-full border orbital-ring"
          style={{ borderColor: "rgba(12,68,124,0.35)" }}
        />
        {/* Small dot on second ring */}
        <div
          className="absolute rounded-full bg-orbit-400"
          style={{
            width: 6,
            height: 6,
            bottom: "0%",
            left: "30%",
            transform: "translate(-50%, 50%)",
          }}
        />
      </div>

      {/* Outer decorative ring — static */}
      <div
        className="absolute rounded-full border orbital-ring"
        style={{
          width: size * 0.96,
          height: size * 0.96,
          borderColor: "rgba(24,95,165,0.12)",
          borderStyle: "dashed",
        }}
      />

      {/* Subtle radial glow at center */}
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          background: "radial-gradient(circle, rgba(24,95,165,0.35) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
