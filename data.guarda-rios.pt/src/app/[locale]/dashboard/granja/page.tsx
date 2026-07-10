"use client";

import { useTranslations } from "next-intl";
import { DashboardPage } from "@/components/dashboard-page";

export default function GranjaPage() {
  const t = useTranslations("dashboard");
  const tc = useTranslations("dashboard.charts");

  const charts = [
    { panelId: 2, title: tc("visaoGeral") },
    { panelId: 11, title: tc("temperatura") },
    { panelId: 12, title: tc("turbidez") },
    { panelId: 9, title: tc("ph") },
    { panelId: 10, title: tc("tds") },
    { panelId: 21, title: tc("indicadorQualidade") },
  ];

  return (
    <DashboardPage
      title={t("granja.title")}
      description={t("granja.description")}
      charts={charts}
    />
  );
}
