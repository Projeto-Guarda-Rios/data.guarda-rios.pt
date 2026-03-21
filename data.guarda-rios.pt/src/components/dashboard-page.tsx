"use client";

import { RefreshCw } from "lucide-react";
import { GrafanaChart } from "./grafana-chart";
import { useState, useCallback } from "react";

interface ChartConfig {
  panelId: number;
  title: string;
}

interface DashboardPageProps {
  title: string;
  description: string;
  charts: ChartConfig[];
  refreshInterval?: number;
  showRefreshButton?: boolean;
}

export function DashboardPage({
  title,
  description,
  charts,
  refreshInterval = 300000,
  showRefreshButton = false,
}: DashboardPageProps) {
  const [key, setKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setKey((k) => k + 1);
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        {showRefreshButton && (
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <RefreshCw className="h-3 w-3" />
            refresh
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Charts grid */}
      <div className="grid gap-6 lg:grid-cols-2" key={key}>
        {charts.map((chart) => (
          <GrafanaChart
            key={chart.panelId}
            panelId={chart.panelId}
            title={chart.title}
            refreshInterval={refreshInterval}
          />
        ))}
      </div>
    </div>
  );
}
