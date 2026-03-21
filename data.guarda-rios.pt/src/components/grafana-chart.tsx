"use client";

import { useState, useEffect, useCallback } from "react";

interface GrafanaChartProps {
  panelId: number;
  title: string;
  refreshInterval?: number; // in ms
}

const DASHBOARD_BASE =
  "https://data.guarda-rios.pt/grafic-embed/d-solo/ae9l1138nc5xce/pgr-all-data";

function generateTimestamps() {
  const now = Date.now();
  return {
    from: now - 3600000, // 1 hour ago
    to: now,
  };
}

export function GrafanaChart({
  panelId,
  title,
  refreshInterval = 300000,
}: GrafanaChartProps) {
  const [timestamps, setTimestamps] = useState(generateTimestamps);

  const refresh = useCallback(() => {
    setTimestamps(generateTimestamps());
  }, []);

  useEffect(() => {
    const interval = setInterval(refresh, refreshInterval);
    return () => clearInterval(interval);
  }, [refresh, refreshInterval]);

  const src = `${DASHBOARD_BASE}?orgId=2&from=${timestamps.from}&to=${timestamps.to}&timezone=browser&refresh=auto&panelId=${panelId}&__feature.dashboardSceneSolo`;

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
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <iframe
          src={src}
          className="h-[350px] w-full"
          frameBorder="0"
          title={title}
        />
      </div>
    </div>
  );
}
