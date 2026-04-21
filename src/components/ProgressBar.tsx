interface ProgressBarProps {
  collected: number;
  max: number;
}

export function ProgressBar({ collected, max }: ProgressBarProps) {
  const progress = Math.min(collected / max, 1);
  const isFull = collected >= max;

  return (
    <div
      className="absolute top-3 right-3 z-40 flex flex-col items-end gap-1"
      style={{
        filter: isFull ? "none" : undefined,
      }}
    >
      {/* Label */}
      <div className="flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9"
            fill={isFull ? "#ffd700" : "#0affed"}
            opacity={isFull ? 1 : 0.8}
            style={{
              filter: isFull
                ? "drop-shadow(0 0 6px #ffd700)"
                : "drop-shadow(0 0 4px #0affed)",
            }}
          />
        </svg>
        <span
          className="text-xs font-bold tracking-wide"
          style={{
            color: isFull ? "#ffd700" : "#0affed",
            textShadow: isFull
              ? "0 0 8px rgba(255,215,0,0.6)"
              : "0 0 8px rgba(10,255,237,0.4)",
          }}
        >
          {isFull ? "MAX" : ""}
        </span>
      </div>

      {/* Bar container */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: "120px",
          height: "18px",
          background: "rgba(5,5,20,0.85)",
          border: `1px solid ${isFull ? "rgba(255,215,0,0.4)" : "rgba(10,255,237,0.2)"}`,
          boxShadow: isFull
            ? "0 0 12px rgba(255,215,0,0.3), inset 0 0 8px rgba(255,215,0,0.1)"
            : "0 0 12px rgba(10,255,237,0.15), inset 0 0 8px rgba(10,255,237,0.05)",
        }}
      >
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${progress * 100}%`,
            background: isFull
              ? "linear-gradient(90deg, #ff8c00, #ffd700, #ffe066)"
              : "linear-gradient(90deg, #0affed, #00ccff)",
            boxShadow: isFull
              ? "0 0 10px rgba(255,215,0,0.5)"
              : "0 0 8px rgba(10,255,237,0.4)",
          }}
        />

        {/* Scanline effect on fill */}
        {progress > 0 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 4px)",
            }}
          />
        )}

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[10px] font-bold"
            style={{
              color: "#fff",
              textShadow: "0 0 4px rgba(0,0,0,0.8)",
              letterSpacing: "0.05em",
            }}
          >
            {collected} / {max}
          </span>
        </div>
      </div>

      {/* Sub label */}
      <span
        className="text-[9px]"
        style={{
          color: isFull ? "rgba(255,215,0,0.6)" : "rgba(10,255,237,0.5)",
          letterSpacing: "0.08em",
        }}
      >
        {isFull ? "ULTRA KILL!" : "HIGHLIGHT FRAGMENTS"}
      </span>
    </div>
  );
}
