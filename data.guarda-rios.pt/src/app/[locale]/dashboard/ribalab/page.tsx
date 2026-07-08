"use client";

import { useTranslations } from "next-intl";
import { DashboardPage } from "@/components/dashboard-page";

export default function RibalabPage() {
  const t = useTranslations("dashboard");
  const tc = useTranslations("dashboard.charts");

  const charts = [
    { panelId: 26, title: tc("temperatura") },
    { panelId: 28, title: tc("turbidez") },
  ];

  return (
    <DashboardPage
      title={t("ribalab.title")}
      description={t("ribalab.description")}
      charts={charts}
      refreshInterval={300000}
      showRefreshButton
    />
  );
}
