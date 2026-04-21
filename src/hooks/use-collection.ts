import { useState, useCallback } from "react";

const MAX_FRAGMENTS = 5;

export function useCollection() {
  const [collectedFragments, setCollectedFragments] = useState(0);
  const [exploredIds, setExploredIds] = useState<Set<number>>(new Set());
  const [showReward, setShowReward] = useState(false);

  const collectFragment = useCallback(
    (poiId: number) => {
      if (exploredIds.has(poiId)) return false;

      setExploredIds((prev) => {
        const next = new Set(prev);
        next.add(poiId);
        return next;
      });

      setCollectedFragments((prev) => {
        const next = prev + 1;
        if (next >= MAX_FRAGMENTS) {
          // Small delay so the progress bar fills first
          setTimeout(() => setShowReward(true), 600);
        }
        return next;
      });

      return true;
    },
    [exploredIds]
  );

  const isExplored = useCallback(
    (poiId: number) => exploredIds.has(poiId),
    [exploredIds]
  );

  const dismissReward = useCallback(() => setShowReward(false), []);

  return {
    collectedFragments,
    maxFragments: MAX_FRAGMENTS,
    isExplored,
    collectFragment,
    showReward,
    dismissReward,
  };
}
