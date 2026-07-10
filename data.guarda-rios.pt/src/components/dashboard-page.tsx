"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { RefreshCw } from "lucide-react";
import { GrafanaChart } from "./grafana-chart";

interface ChartConfig {
  panelId: number;
  title: string;
}

interface DashboardPageProps {
  title: string;
  description: string;
  charts: ChartConfig[];
}

export function DashboardPage({
  title,
  description,
  charts,
}: DashboardPageProps) {
  const [refreshToken, setRefreshToken] = useState(0);
  const t = useTranslations("dashboard");

  const handleRefresh = useCallback(() => {
    setRefreshToken((token) => token + 1);
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <RefreshCw className="h-3 w-3" />
          {t("refresh")}
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Charts grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {charts.map((chart) => (
          <GrafanaChart
            key={chart.panelId}
            panelId={chart.panelId}
            title={chart.title}
            refreshToken={refreshToken}
          />
        ))}
      </div>
    </div>
  );
}
