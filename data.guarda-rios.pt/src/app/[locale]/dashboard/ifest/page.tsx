"use client";

import { useTranslations } from "next-intl";
import { DashboardPage } from "@/components/dashboard-page";

export default function IFestPage() {
  const t = useTranslations("dashboard");
  const tc = useTranslations("dashboard.charts");

  const charts = [
    { panelId: 31, title: tc("temperatura") },
    { panelId: 32, title: tc("turbidez") },
  ];

  return (
    <DashboardPage
      title={t("ifest.title")}
      description={t("ifest.description")}
      charts={charts}
      refreshInterval={300000}
      showRefreshButton
    />
  );
}
