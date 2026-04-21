export function MapHeader() {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center py-3 px-4"
      style={{
        background: "linear-gradient(to bottom, rgba(5,5,20,0.92) 0%, rgba(5,5,20,0.6) 70%, transparent 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-0.5">
        {/* Sub title */}
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{
            color: "rgba(10, 255, 237, 0.7)",
            textShadow: "0 0 8px rgba(10, 255, 237, 0.3)",
          }}
        >
          2026 KPL Spring Final
        </span>

        {/* Main title */}
        <h1
          className="text-base font-bold tracking-wider"
          style={{
            background: "linear-gradient(90deg, #0affed, #ff2d55, #0affed)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "titleShimmer 3s linear infinite",
            textShadow: "none",
          }}
        >
          海口春决互动全景攻略
        </h1>

        {/* Decorative line */}
        <div
          className="w-32 h-px mt-1"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(10,255,237,0.5), transparent)",
          }}
        />
      </div>
    </div>
  );
}
