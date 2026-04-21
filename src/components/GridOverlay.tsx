/**
 * Cyberpunk grid overlay for the map background
 */
export function GridOverlay({ className }: { className?: string }) {
  return (
    <svg
      className={
        [
          "absolute inset-0 h-full w-full pointer-events-none",
          "text-primary",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      <defs>
        <pattern id="grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <pattern id="grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="url(#grid-sm)" />
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-lg)" />
    </svg>
  );
}
