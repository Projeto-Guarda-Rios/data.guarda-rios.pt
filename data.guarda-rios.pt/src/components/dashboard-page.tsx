"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarRange, RefreshCw, X } from "lucide-react";
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

const PRESET_RANGES = ["10m", "30m", "1h", "12h", "24h", "7d"] as const;
type PresetRange = (typeof PRESET_RANGES)[number];

function toLocalDateTimeValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function DashboardPage({
  title,
  description,
  charts,
}: DashboardPageProps) {
  const [refreshToken, setRefreshToken] = useState(0);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<PresetRange | null>("1h");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [customRange, setCustomRange] = useState<{ from: string; to: string } | null>(null);
  const t = useTranslations("dashboard");

  const timeRange = useMemo(
    () => customRange ?? { from: `now-${selectedPreset ?? "1h"}`, to: "now" },
    [customRange, selectedPreset],
  );

  const customRangeIsValid =
    customFrom.length > 0 &&
    customTo.length > 0 &&
    new Date(customFrom).getTime() < new Date(customTo).getTime();

  const handleRefresh = useCallback(() => {
    setRefreshToken((token) => token + 1);
  }, []);

  const selectPreset = (preset: PresetRange) => {
    setSelectedPreset(preset);
    setCustomRange(null);
    setIsTimePickerOpen(false);
  };

  const applyCustomRange = () => {
    if (!customRangeIsValid) return;

    setSelectedPreset(null);
    setCustomRange({
      from: String(new Date(customFrom).getTime()),
      to: String(new Date(customTo).getTime()),
    });
    setIsTimePickerOpen(false);
  };

  const openTimePicker = () => {
    if (!customFrom || !customTo) {
      const now = new Date();
      setCustomTo(toLocalDateTimeValue(now));
      setCustomFrom(toLocalDateTimeValue(new Date(now.getTime() - 60 * 60 * 1000)));
    }
    setIsTimePickerOpen(true);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="relative flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <RefreshCw className="h-3 w-3" />
            {t("refresh")}
          </button>
          <button
            onClick={openTimePicker}
            aria-expanded={isTimePickerOpen}
            aria-haspopup="dialog"
            className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <CalendarRange className="h-3 w-3" />
            {selectedPreset ?? t("custom")}
          </button>

          {isTimePickerOpen && (
            <div
              role="dialog"
              aria-label={t("timeRange")}
              className="absolute right-0 top-full z-30 mt-2 w-72 rounded-md border border-border bg-card p-3 shadow-lg"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium text-foreground">{t("timeRange")}</p>
                <button
                  onClick={() => setIsTimePickerOpen(false)}
                  aria-label={t("closeTimePicker")}
                  className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {PRESET_RANGES.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => selectPreset(preset)}
                    className={`rounded border px-2 py-1.5 text-xs transition-colors ${
                      selectedPreset === preset
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <div className="my-3 border-t border-border" />
              <p className="mb-2 text-xs font-medium text-foreground">{t("custom")}</p>
              <div className="space-y-2">
                <label className="block text-[11px] text-muted-foreground">
                  {t("from")}
                  <input
                    type="datetime-local"
                    value={customFrom}
                    max={customTo || undefined}
                    onChange={(event) => setCustomFrom(event.target.value)}
                    className="mt-1 block w-full rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground"
                  />
                </label>
                <label className="block text-[11px] text-muted-foreground">
                  {t("to")}
                  <input
                    type="datetime-local"
                    value={customTo}
                    min={customFrom || undefined}
                    onChange={(event) => setCustomTo(event.target.value)}
                    className="mt-1 block w-full rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground"
                  />
                </label>
              </div>
              {!customRangeIsValid && customFrom && customTo && (
                <p className="mt-2 text-[11px] text-destructive">{t("invalidTimeRange")}</p>
              )}
              <button
                onClick={applyCustomRange}
                disabled={!customRangeIsValid}
                className="mt-3 w-full rounded bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("apply")}
              </button>
            </div>
          )}
        </div>
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
            timeRange={timeRange}
          />
        ))}
      </div>
    </div>
  );
}
