import { useEffect, useState } from "react";

import { GridOverlay } from "./components/GridOverlay";

const LOADING_TEXTS = [
  "初始化天工机关术...",
  "接入腾讯位置服务 (TMap GL)...",
  "注入峡谷元器 AI 核心...",
  "同步海口非遗文化坐标...",
  "正在构建赛博全景沙盘...",
] as const;

const LOADING_TOTAL_MS = 3000;
const LOADING_STEP_MS = 500;
const LOADING_EXIT_MS = 800;

function App() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [progressOn, setProgressOn] = useState(false);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setProgressOn(true));
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      if (index < LOADING_TEXTS.length) {
        setLoadingIndex(index);
      }
    }, LOADING_STEP_MS);

    const timer = window.setTimeout(() => {
      window.clearInterval(interval);
      setPhase("exiting");

      window.setTimeout(() => {
        setPhase("done");
      }, LOADING_EXIT_MS);
    }, LOADING_TOTAL_MS);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, []);

  const loadingText = LOADING_TEXTS[Math.min(loadingIndex, LOADING_TEXTS.length - 1)];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      {phase !== "done" && (
        <div
          className={
            "absolute inset-0 z-50 flex items-center justify-center bg-background " +
            "transition-[opacity,transform,filter] ease-in-out " +
            (phase === "exiting" ? "opacity-0 scale-105 blur-md" : "opacity-100 scale-100 blur-0")
          }
          style={{ transitionDuration: `${LOADING_EXIT_MS}ms` }}
        >
          <GridOverlay className="opacity-20" />

          <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-6 text-center">
            <div className="mb-8 grid size-24 place-items-center rounded-full border border-foreground/20 animate-spin [animation-duration:4s]">
              <div className="size-16 rounded-full border border-foreground/30 animate-pulse" />
            </div>

            <h1 className="text-xl font-semibold tracking-[0.2em] sm:text-2xl">
              海口平行峡谷系统
            </h1>

            <div className="mt-4 h-6 overflow-hidden">
              <p
                key={loadingText}
                className="text-sm font-mono tracking-wider text-muted-foreground"
              >
                &gt;_ {loadingText}
              </p>
            </div>

            <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full bg-primary transition-[width] ease-in-out"
                style={{
                  width: progressOn ? "100%" : "0%",
                  transitionDuration: `${LOADING_TOTAL_MS}ms`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      <iframe
        src="/map_demo.html"
        title="海口阵营战地图"
        className="absolute inset-0 z-0 h-full w-full border-0"
      />
    </div>
  );
}

export default App;