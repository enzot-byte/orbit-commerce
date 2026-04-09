import OrbitalAnimation from "@/components/shared/OrbitalAnimation";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0A0A0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      {/* Radial glow background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(24,95,165,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Orbital animation */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <OrbitalAnimation size={220} opacity={0.8} />
      </div>

      {/* Brand name + loading indicator */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "32px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 700,
            background: "linear-gradient(135deg, #185FA5, #378ADD)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px",
          }}
        >
          Orbit Commerce
        </p>

        {/* Animated dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#378ADD",
                animation: "pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
                opacity: 0.5,
              }}
            />
          ))}
        </div>

        {/* Skeleton bar hints */}
        <div
          style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}
        >
          {[200, 280, 160].map((w, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: `${w}px`, height: "12px", borderRadius: "6px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
