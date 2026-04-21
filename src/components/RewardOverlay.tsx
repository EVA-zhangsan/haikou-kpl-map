interface RewardOverlayProps {
  onDismiss: () => void;
}

export function RewardOverlay({ onDismiss }: RewardOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-6"
      style={{
        background: "rgba(2, 2, 10, 0.94)",
        backdropFilter: "blur(12px)",
        animation: "rewardFadeIn 0.5s ease-out",
      }}
      onClick={onDismiss}
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(255,215,0,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              background:
                i % 3 === 0
                  ? "#ffd700"
                  : i % 3 === 1
                  ? "#0affed"
                  : "#ff2d55",
              boxShadow: `0 0 6px ${i % 3 === 0 ? "#ffd700" : i % 3 === 1 ? "#0affed" : "#ff2d55"}`,
              animation: `particleFloat ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className="relative flex flex-col items-center gap-6 max-w-xs text-center"
        style={{ animation: "rewardBounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Crown / trophy icon */}
        <div
          className="relative"
          style={{ animation: "goldPulse 2s ease-in-out infinite" }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#ffed4a" />
                <stop offset="100%" stopColor="#ff8c00" />
              </linearGradient>
            </defs>
            {/* Trophy shape */}
            <path
              d="M16 8L8 24H20L18 40H46L44 24H56L48 8H16Z"
              fill="url(#goldGrad)"
              stroke="#ffd700"
              strokeWidth="1"
            />
            <rect x="24" y="40" width="16" height="6" rx="1" fill="url(#goldGrad)" />
            <rect x="20" y="46" width="24" height="4" rx="2" fill="url(#goldGrad)" />
            {/* Star */}
            <polygon
              points="32,16 35,24 43,24 37,29 39,37 32,33 25,37 27,29 21,24 29,24"
              fill="#fff"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Title */}
        <div>
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-2"
            style={{
              color: "#0affed",
              textShadow: "0 0 8px rgba(10,255,237,0.4)",
            }}
          >
            ACHIEVEMENT UNLOCKED
          </p>
          <h2
            className="text-lg font-bold leading-snug"
            style={{
              background: "linear-gradient(135deg, #ffd700, #ffed4a, #ff8c00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 8px rgba(255,215,0,0.4))",
            }}
          >
            2026 KPL 海口春决
            <br />
            专属纪念票根
          </h2>
        </div>

        {/* Ticket stub placeholder */}
        <div
          className="relative w-64 rounded-xl overflow-hidden"
          style={{
            height: "140px",
            background: "linear-gradient(135deg, #1a1a2e, #0f0f2a)",
            border: "1px solid rgba(255,215,0,0.25)",
            boxShadow:
              "0 0 30px rgba(255,215,0,0.15), inset 0 0 20px rgba(255,215,0,0.05)",
          }}
        >
          {/* Ticket perforation */}
          <div
            className="absolute left-0 right-0 flex justify-center"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full mx-1"
                style={{ background: "rgba(255,215,0,0.15)" }}
              />
            ))}
          </div>

          {/* Top half */}
          <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center" style={{ height: "50%" }}>
            <span
              className="text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,215,0,0.5)" }}
            >
              ADMIT ONE
            </span>
            <span
              className="text-sm font-bold mt-0.5"
              style={{
                color: "#ffd700",
                textShadow: "0 0 6px rgba(255,215,0,0.3)",
              }}
            >
              KPL 2026 SPRING
            </span>
          </div>

          {/* Bottom half */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4" style={{ height: "50%" }}>
            <div className="flex flex-col">
              <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                VENUE
              </span>
              <span className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                HAIKOU
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                SEAT
              </span>
              <span className="text-[10px] font-semibold" style={{ color: "rgba(255,215,0,0.7)" }}>
                VIP-001
              </span>
            </div>
          </div>

          {/* Gold shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.08) 45%, rgba(255,215,0,0.15) 50%, rgba(255,215,0,0.08) 55%, transparent 60%)",
              animation: "ticketShimmer 3s ease-in-out infinite",
            }}
          />
        </div>

        {/* Dismiss hint */}
        <p
          className="text-[10px]"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          TAP ANYWHERE TO CONTINUE
        </p>
      </div>
    </div>
  );
}
