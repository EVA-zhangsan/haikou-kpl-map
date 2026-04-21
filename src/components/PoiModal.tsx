import { useRef, useEffect } from "react";
import type { Poi } from "@/data/pois";
import { typeConfig } from "@/data/pois";
import { getPoiDetail } from "@/data/poi-details";

interface PoiModalProps {
  poi: Poi;
  explored: boolean;
  onCollect: () => void;
  onClose: () => void;
}

export function PoiModal({ poi, explored, onCollect, onClose }: PoiModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const detail = getPoiDetail(poi);
  const config = typeConfig[poi.type];

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(2, 2, 15, 0.88)",
        backdropFilter: "blur(8px)",
        animation: "modalFadeIn 0.25s ease-out",
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-xl"
        style={{
          background: "linear-gradient(145deg, rgba(12,12,35,0.95), rgba(8,8,25,0.98))",
          border: `1px solid ${config.colors[0]}33`,
          boxShadow: `0 0 40px rgba(0,0,0,0.6), 0 0 20px ${config.glowColor.replace("0.6", "0.15")}, inset 0 1px 0 rgba(255,255,255,0.05)`,
          animation: "modalSlideUp 0.3s ease-out",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${config.colors[0]}, transparent)`,
          }}
        />

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-5">
          {/* Header: type badge + name */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: `linear-gradient(135deg, ${config.colors[0]}22, ${config.colors[1]}22)`,
                color: config.colors[0],
                border: `1px solid ${config.colors[0]}33`,
              }}
            >
              {config.label}
            </span>
            {explored && (
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider"
                style={{
                  background: "rgba(255,215,0,0.1)",
                  color: "#ffd700",
                  border: "1px solid rgba(255,215,0,0.2)",
                }}
              >
                EXPLORED
              </span>
            )}
          </div>

          <h2
            className="text-xl font-bold mb-3"
            style={{
              color: "#fff",
              textShadow: `0 0 12px ${config.glowColor.replace("0.6", "0.3")}`,
            }}
          >
            {poi.name}
          </h2>

          {/* Description */}
          <p
            className="text-xs leading-relaxed mb-4"
            style={{
              color: "rgba(255,255,255,0.7)",
              lineHeight: "1.8",
            }}
          >
            {detail.description}
          </p>

          {/* Video placeholder */}
          <div
            className="relative w-full rounded-lg overflow-hidden mb-4"
            style={{
              height: "140px",
              background: "linear-gradient(135deg, rgba(20,20,45,0.8), rgba(15,15,35,0.9))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Play icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${config.colors[0]}33, ${config.colors[1]}33)`,
                  border: `1px solid ${config.colors[0]}44`,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill={config.colors[0]}>
                  <path d="M4 2L14 8L4 14V2Z" />
                </svg>
              </div>
              <span
                className="text-[10px]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {detail.videoText}
              </span>
            </div>

            {/* Corner brackets */}
            <FrameCorner position="tl" color={config.colors[0]} />
            <FrameCorner position="tr" color={config.colors[0]} />
            <FrameCorner position="bl" color={config.colors[0]} />
            <FrameCorner position="br" color={config.colors[0]} />
          </div>

          {/* Collect button */}
          <button
            onClick={onCollect}
            disabled={explored}
            className="w-full py-2.5 rounded-lg text-sm font-bold tracking-wider transition-all duration-200"
            style={
              explored
                ? {
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.25)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    cursor: "default",
                  }
                : {
                    background: `linear-gradient(135deg, ${config.colors[0]}, ${config.colors[1]})`,
                    color: "#fff",
                    boxShadow: `0 0 16px ${config.glowColor.replace("0.6", "0.35")}`,
                    border: "none",
                    cursor: "pointer",
                  }
            }
          >
            {explored ? "HIGHLIGHT COLLECTED" : "WATCH HIGHLIGHT +1"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FrameCorner({ position, color }: { position: string; color: string }) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 4, left: 4 },
    tr: { top: 4, right: 4, transform: "scaleX(-1)" },
    bl: { bottom: 4, left: 4, transform: "scaleY(-1)" },
    br: { bottom: 4, right: 4, transform: "scale(-1)" },
  };

  return (
    <div className="absolute pointer-events-none" style={styles[position]}>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M0 8V0H8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}
