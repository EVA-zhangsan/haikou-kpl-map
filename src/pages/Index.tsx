import { useState, useCallback } from "react";
import { useMapDrag } from "@/hooks/use-map-drag";
import { useCollection } from "@/hooks/use-collection";
import { pois } from "@/data/pois";
import type { Poi } from "@/data/pois";
import { MapMarker } from "@/components/MapMarker";
import { MapLegend } from "@/components/MapLegend";
import { MapHeader } from "@/components/MapHeader";
import { GridOverlay } from "@/components/GridOverlay";
import { ProgressBar } from "@/components/ProgressBar";
import { PoiModal } from "@/components/PoiModal";
import { RewardOverlay } from "@/components/RewardOverlay";
import { ChatFab } from "@/components/ChatFab";
import { ChatDrawer } from "@/components/ChatDrawer";

const MAP_WIDTH = 2000;
const MAP_HEIGHT = 1500;

export default function Index() {
  const { containerRef, isDragging, handlers } = useMapDrag();
  const {
    collectedFragments,
    maxFragments,
    isExplored,
    collectFragment,
    showReward,
    dismissReward,
  } = useCollection();

  const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const handleMarkerClick = useCallback((poi: Poi) => {
    setSelectedPoi(poi);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPoi(null);
  }, []);

  const handleCollect = useCallback(() => {
    if (selectedPoi) {
      collectFragment(selectedPoi.id);
    }
  }, [selectedPoi, collectFragment]);

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: "#050514" }}
    >
      {/* Top header bar */}
      <MapHeader />

      {/* Progress bar */}
      <ProgressBar collected={collectedFragments} max={maxFragments} />

      {/* Legend */}
      <MapLegend />

      {/* Drag hint */}
      <div
        className="absolute bottom-4 right-4 z-30 text-[10px] px-2 py-1 rounded"
        style={{
          color: "rgba(255,255,255,0.35)",
          background: "rgba(5,5,20,0.6)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        Drag to explore
      </div>

      {/* Scrollable map container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden"
        style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
        {...handlers}
      >
        {/* Map canvas */}
        <div
          className="relative"
          style={{
            width: `${MAP_WIDTH}px`,
            height: `${MAP_HEIGHT}px`,
            background: `
              radial-gradient(ellipse 60% 50% at 30% 25%, rgba(10, 255, 237, 0.06) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 75% 65%, rgba(255, 45, 85, 0.05) 0%, transparent 70%),
              radial-gradient(ellipse 40% 35% at 50% 50%, rgba(100, 100, 255, 0.04) 0%, transparent 60%),
              linear-gradient(180deg, #050514 0%, #0a0a2e 30%, #080820 70%, #050514 100%)
            `,
          }}
        >
          {/* Grid overlay */}
          <GridOverlay />

          {/* Decorative road-like lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.12 }}
          >
            <path
              d="M 200,200 C 500,300 700,250 1000,400 S 1500,350 1800,500"
              fill="none"
              stroke="#0affed"
              strokeWidth="2"
              strokeDasharray="8 4"
            />
            <path
              d="M 100,600 C 400,550 600,700 900,650 S 1200,800 1600,700"
              fill="none"
              stroke="#0affed"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <path
              d="M 300,900 C 500,850 800,1000 1100,950 S 1400,1100 1700,1000"
              fill="none"
              stroke="#0affed"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <path
              d="M 500,100 C 550,400 450,700 500,1000 S 550,1200 500,1400"
              fill="none"
              stroke="#ff2d55"
              strokeWidth="1"
              strokeDasharray="6 8"
              opacity="0.6"
            />
            <path
              d="M 1200,100 C 1150,350 1250,600 1200,850 S 1150,1100 1200,1400"
              fill="none"
              stroke="#ff2d55"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.5"
            />
          </svg>

          {/* Ambient glow spots */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "400px",
              height: "400px",
              left: "25%",
              top: "15%",
              background: "radial-gradient(circle, rgba(10,255,237,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "350px",
              height: "350px",
              right: "15%",
              bottom: "20%",
              background: "radial-gradient(circle, rgba(255,45,85,0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              left: "55%",
              top: "45%",
              background: "radial-gradient(circle, rgba(255,140,0,0.05) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* POI Markers */}
          {pois.map((poi) => (
            <MapMarker
              key={poi.id}
              poi={poi}
              explored={isExplored(poi.id)}
              onClick={handleMarkerClick}
            />
          ))}

          {/* Corner decorations */}
          <CornerDecor position="top-left" />
          <CornerDecor position="top-right" />
          <CornerDecor position="bottom-left" />
          <CornerDecor position="bottom-right" />
        </div>
      </div>

      {/* POI Detail Modal */}
      {selectedPoi && (
        <PoiModal
          poi={selectedPoi}
          explored={isExplored(selectedPoi.id)}
          onCollect={handleCollect}
          onClose={handleCloseModal}
        />
      )}

      {/* Chat FAB & Drawer */}
      {!chatOpen && !selectedPoi && !showReward && (
        <ChatFab onClick={() => setChatOpen(true)} />
      )}
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Ultimate Reward Overlay */}
      {showReward && <RewardOverlay onDismiss={dismissReward} />}
    </div>
  );
}

function CornerDecor({ position }: { position: string }) {
  const positionClasses: Record<string, string> = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4 rotate-90",
    "bottom-left": "bottom-4 left-4 -rotate-90",
    "bottom-right": "bottom-4 right-4 rotate-180",
  };

  return (
    <div
      className={`absolute pointer-events-none ${positionClasses[position]}`}
      style={{ opacity: 0.2 }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32">
        <path d="M 0 12 L 0 0 L 12 0" fill="none" stroke="#0affed" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="2" fill="#0affed" />
      </svg>
    </div>
  );
}
