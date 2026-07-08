"use client";

import { useTranslations } from "next-intl";
import { DashboardPage } from "@/components/dashboard-page";

export default function FaqtosPage() {
  const t = useTranslations("dashboard");
  const tc = useTranslations("dashboard.charts");

  const charts = [
    { panelId: 43, title: tc("temperatura") },
    { panelId: 42, title: tc("turbidez") },
  ];

  return (
    <DashboardPage
      title={t("faqtos.title")}
      description={t("faqtos.description")}
      charts={charts}
      refreshInterval={300000}
      showRefreshButton
    />
  );
}
