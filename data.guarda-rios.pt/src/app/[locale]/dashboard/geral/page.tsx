"use client";

import { useTranslations } from "next-intl";
import { DashboardPage } from "@/components/dashboard-page";

export default function GeralPage() {
  const t = useTranslations("dashboard");
  const tc = useTranslations("dashboard.charts");

  const charts = [
    { panelId: 1, title: tc("qualidadeGeral") },
    { panelId: 5, title: tc("temperatura") },
    { panelId: 6, title: tc("turbidez") },
    { panelId: 8, title: tc("ph") },
    { panelId: 7, title: tc("tds") },
    { panelId: 24, title: tc("indicadorQualidade") },
  ];

  return (
    <DashboardPage
      title={t("geral.title")}
      description={t("geral.description")}
      charts={charts}
      refreshInterval={30000}
    />
  );
}
