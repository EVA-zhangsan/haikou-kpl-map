import { typeConfig } from "@/data/pois";
import type { PoiType } from "@/data/pois";

const legendItems: { type: PoiType; count: number }[] = [
  { type: "eSports", count: 2 },
  { type: "tourism", count: 6 },
  { type: "food", count: 7 },
];

export function MapLegend() {
  return (
    <div
      className="absolute bottom-4 left-4 z-30 flex flex-col gap-2 px-3 py-2.5 rounded-lg"
      style={{
        background: "rgba(5, 5, 20, 0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(10, 255, 237, 0.15)",
        boxShadow: "0 0 20px rgba(0,0,0,0.4), inset 0 0 20px rgba(10, 255, 237, 0.03)",
      }}
    >
      {legendItems.map(({ type, count }) => {
        const config = typeConfig[type];
        return (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{
                background: `linear-gradient(135deg, ${config.colors[0]}, ${config.colors[1]})`,
                boxShadow: `0 0 6px ${config.glowColor}`,
              }}
            />
            <span
              className="text-xs"
              style={{
                color: config.colors[0],
                textShadow: `0 0 6px ${config.glowColor}`,
              }}
            >
              {config.label}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
