import { useRef, useCallback, useEffect, useState } from "react";

const DRAG_THRESHOLD = 6; // px — movement below this is a "tap", not a drag

interface DragState {
  isDown: boolean;
  didDrag: boolean;
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
  pointerId: number;
}

export function useMapDrag() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<DragState>({
    isDown: false,
    didDrag: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    pointerId: -1,
  });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    // Only capture on the container itself or non-interactive children
    dragState.current = {
      isDown: true,
      didDrag: false,
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
      pointerId: e.pointerId,
    };
    // Do NOT call setPointerCapture — it steals events from child elements
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const state = dragState.current;
    if (!state.isDown) return;
    const container = containerRef.current;
    if (!container) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only start dragging after exceeding the threshold
    if (!state.didDrag && distance < DRAG_THRESHOLD) return;

    if (!state.didDrag) {
      state.didDrag = true;
      setIsDragging(true);
    }

    e.preventDefault();
    container.scrollLeft = state.scrollLeft - dx;
    container.scrollTop = state.scrollTop - dy;
  }, []);

  const handlePointerUp = useCallback(() => {
    dragState.current.isDown = false;
    dragState.current.didDrag = false;
    setIsDragging(false);
  }, []);

  // Center the map on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const mapWidth = 2000;
      const mapHeight = 1500;
      container.scrollLeft = (mapWidth - container.clientWidth) / 2;
      container.scrollTop = (mapHeight - container.clientHeight) / 2;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    containerRef,
    isDragging,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
    },
  };
}
