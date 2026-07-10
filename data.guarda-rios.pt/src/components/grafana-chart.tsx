"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface GrafanaChartProps {
  panelId: number;
  title: string;
  refreshToken: number;
}

const DASHBOARD_BASE =
  "https://data.guarda-rios.pt/grafic-embed/d-solo/ae9l1138nc5xce/pgr-all-data";
const REFRESH_INTERVAL = 5000;
const PANEL_RENDER_DELAY = 1200;

export function GrafanaChart({
  panelId,
  title,
  refreshToken,
}: GrafanaChartProps) {
  const [mounted, setMounted] = useState(false);
  const [activeFrame, setActiveFrame] = useState<0 | 1>(0);
  const [frameSources, setFrameSources] = useState<[string, string]>([
    "",
    "",
  ]);
  const { resolvedTheme } = useTheme();
  const activeFrameRef = useRef<0 | 1>(0);
  const loadingRef = useRef(false);
  const readyRef = useRef(false);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousRefreshTokenRef = useRef(refreshToken);

  useEffect(() => {
    setMounted(true);
  }, []);

  const grafanaTheme = resolvedTheme === "light" ? "light" : "dark";
  const baseSrc = `${DASHBOARD_BASE}?orgId=2&from=now-1h&to=now&timezone=browser&panelId=${panelId}&__feature.dashboardSceneSolo&theme=${grafanaTheme}`;

  useEffect(() => {
    if (!mounted) return;

    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    activeFrameRef.current = 0;
    loadingRef.current = false;
    readyRef.current = false;
    setActiveFrame(0);
    setFrameSources([`${baseSrc}&_refresh=${Date.now()}`, ""]);
  }, [baseSrc, mounted]);

  const refresh = useCallback(() => {
    if (!mounted || !readyRef.current || loadingRef.current) return;

    const nextFrame: 0 | 1 = activeFrameRef.current === 0 ? 1 : 0;
    loadingRef.current = true;
    setFrameSources((sources) => {
      const nextSources: [string, string] = [...sources];
      nextSources[nextFrame] = `${baseSrc}&_refresh=${Date.now()}`;
      return nextSources;
    });
  }, [baseSrc, mounted]);

  useEffect(() => {
    const interval = setInterval(refresh, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    if (previousRefreshTokenRef.current === refreshToken) return;
    previousRefreshTokenRef.current = refreshToken;
    refresh();
  }, [refresh, refreshToken]);

  useEffect(() => {
    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    };
  }, []);

  const handleFrameLoad = useCallback((frame: 0 | 1) => {
    if (frame === activeFrameRef.current) {
      readyRef.current = true;
      return;
    }

    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    swapTimerRef.current = setTimeout(() => {
      activeFrameRef.current = frame;
      setActiveFrame(frame);
      loadingRef.current = false;
    }, PANEL_RENDER_DELAY);
  }, []);

  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        <span className="text-[10px] text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100">
          panel #{panelId}
        </span>
      </div>
      <div className="relative h-[350px] overflow-hidden rounded-md border border-border bg-card">
        {mounted &&
          frameSources.map((src, frame) =>
            src ? (
              <iframe
                key={frame}
                src={src}
                className={`absolute inset-0 h-full w-full transition-opacity duration-150 ${
                  activeFrame === frame
                    ? "z-10 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                }`}
                frameBorder="0"
                title={title}
                aria-hidden={activeFrame !== frame}
                onLoad={() => handleFrameLoad(frame as 0 | 1)}
              />
            ) : null,
          )}
      </div>
    </div>
  );
}
