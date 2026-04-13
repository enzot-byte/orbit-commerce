"use client";

interface BlueprintGridProps {
  className?: string;
  /** Show "+" markers at grid intersections */
  markers?: boolean;
  /** Grid cell size in pixels */
  cellSize?: number;
}

export default function BlueprintGrid({
  className = "",
  markers = true,
  cellSize = 80,
}: BlueprintGridProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Grid lines via CSS */}
      <div
        className="absolute inset-0 blueprint-grid"
        style={{ backgroundSize: `${cellSize}px ${cellSize}px` }}
      />

      {/* SVG markers at intersections */}
      {markers && (
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="blueprint-markers"
              x="0"
              y="0"
              width={cellSize}
              height={cellSize}
              patternUnits="userSpaceOnUse"
            >
              {/* + marker at each intersection */}
              <line
                x1={cellSize / 2 - 4}
                y1={cellSize / 2}
                x2={cellSize / 2 + 4}
                y2={cellSize / 2}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <line
                x1={cellSize / 2}
                y1={cellSize / 2 - 4}
                x2={cellSize / 2}
                y2={cellSize / 2 + 4}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-markers)" />
        </svg>
      )}
    </div>
  );
}
