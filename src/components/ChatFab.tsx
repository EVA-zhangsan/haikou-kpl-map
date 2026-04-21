import { useState, useEffect } from "react";

interface ChatFabProps {
  onClick: () => void;
}

export function ChatFab({ onClick }: ChatFabProps) {
  const [showBubble, setShowBubble] = useState(true);

  // Auto-hide bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed z-40 flex items-end gap-2" style={{ bottom: "24px", right: "16px" }}>
      {/* Speech bubble */}
      {showBubble && (
        <div
          className="relative px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap"
          style={{
            background: "rgba(10, 10, 30, 0.9)",
            border: "1px solid rgba(10, 255, 237, 0.25)",
            color: "#0affed",
            textShadow: "0 0 6px rgba(10,255,237,0.3)",
            backdropFilter: "blur(8px)",
            animation: "bubbleIn 0.4s ease-out",
          }}
        >
          峡谷本地通已上线
          {/* Triangle pointer */}
          <div
            className="absolute -right-1.5 bottom-3 w-0 h-0"
            style={{
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "6px solid rgba(10, 10, 30, 0.9)",
            }}
          />
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={onClick}
        className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(135deg, #0affed, #0088cc)",
          boxShadow: "0 0 16px rgba(10,255,237,0.4), 0 0 32px rgba(10,255,237,0.2)",
          animation: "fabBreathe 2.5s ease-in-out infinite",
          border: "2px solid rgba(10, 255, 237, 0.5)",
        }}
      >
        {/* Robot face icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          {/* Head */}
          <rect x="4" y="6" width="16" height="14" rx="3" stroke="#fff" strokeWidth="1.8" />
          {/* Antenna */}
          <line x1="12" y1="6" x2="12" y2="2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="2" r="1.2" fill="#fff" />
          {/* Eyes */}
          <circle cx="9" cy="12" r="1.5" fill="#fff" />
          <circle cx="15" cy="12" r="1.5" fill="#fff" />
          {/* Mouth */}
          <path d="M9 16 Q12 18 15 16" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Online indicator */}
        <div
          className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full"
          style={{
            background: "#00ff88",
            border: "2px solid #050514",
            boxShadow: "0 0 6px rgba(0,255,136,0.6)",
          }}
        />
      </button>
    </div>
  );
}
