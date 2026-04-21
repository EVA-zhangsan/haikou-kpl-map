import { memo } from "react";
import type { Poi, PoiType } from "@/data/pois";
import { typeConfig } from "@/data/pois";

interface MapMarkerProps {
  poi: Poi;
  explored?: boolean;
  onClick?: (poi: Poi) => void;
}

function getMarkerStyle(type: PoiType) {
  const config = typeConfig[type];
  return {
    background: `linear-gradient(135deg, ${config.colors[0]}, ${config.colors[1]})`,
    boxShadow: `0 0 12px ${config.glowColor}, 0 0 24px ${config.glowColor}, 0 0 4px ${config.glowColor}`,
  };
}

function getMarkerRingStyle(type: PoiType) {
  const config = typeConfig[type];
  return {
    borderColor: config.colors[0],
    boxShadow: `0 0 8px ${config.glowColor}`,
  };
}

function MapMarkerInner({ poi, explored, onClick }: MapMarkerProps) {
  const markerStyle = getMarkerStyle(poi.type);
  const ringStyle = getMarkerRingStyle(poi.type);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(poi);
  };

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: `${poi.x}%`,
        top: `${poi.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {/* Outer breathing ring */}
      <div
        className="absolute w-12 h-12 rounded-full border-2 opacity-60 pointer-events-none"
        style={{
          ...ringStyle,
          animation: `breathe ${1.8 + (poi.id % 5) * 0.2}s ease-in-out infinite`,
        }}
      />

      {/* Inner glowing dot */}
      <div
        className="relative w-7 h-7 rounded-full flex items-center justify-center z-10 transition-transform duration-200"
        style={{
          ...markerStyle,
          transform: explored ? "scale(0.85)" : undefined,
          opacity: explored ? 0.6 : 1,
        }}
      >
        {explored ? (
          /* Checkmark for explored */
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M3 7L6 10L11 4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          /* Core bright center */
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 0 6px rgba(255,255,255,0.5)",
            }}
          />
        )}
      </div>

      {/* Pin tail */}
      <div
        className="w-0.5 h-3 -mt-0.5"
        style={{
          background: `linear-gradient(to bottom, ${typeConfig[poi.type].colors[0]}, transparent)`,
          opacity: explored ? 0.4 : 1,
        }}
      />

      {/* Name label */}
      <span
        className="mt-0.5 text-xs font-semibold whitespace-nowrap px-1.5 py-0.5 rounded"
        style={{
          color: "#fff",
          textShadow: "0 0 4px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(4px)",
          letterSpacing: "0.02em",
          opacity: explored ? 0.5 : 1,
        }}
      >
        {poi.name}
      </span>
    </div>
  );
}

export const MapMarker = memo(MapMarkerInner);
