"use client";

import { useTranslations } from "next-intl";
import { DashboardPage } from "@/components/dashboard-page";

export default function Mostra2025Page() {
  const t = useTranslations("dashboard");
  const tc = useTranslations("dashboard.charts");

  const charts = [
    { panelId: 25, title: tc("visaoGeral") },
    { panelId: 26, title: tc("temperatura") },
    { panelId: 28, title: tc("turbidez") },
  ];

  return (
    <DashboardPage
      title={t("mostra2025.title")}
      description={t("mostra2025.description")}
      charts={charts}
    />
  );
}
