"use client";

import { DashboardPage } from "@/components/dashboard-page";

const charts = [
  { panelId: 1, title: "qualidade geral" },
  { panelId: 5, title: "temperatura" },
  { panelId: 6, title: "turbidez" },
  { panelId: 8, title: "pH" },
  { panelId: 7, title: "TDS (sólidos dissolvidos)" },
  { panelId: 24, title: "indicador de qualidade" },
];

export default function GeralPage() {
  return (
    <DashboardPage
      title="Gráfico Geral"
      description="Visão geral de todos os sensores — atualização a cada 30s"
      charts={charts}
      refreshInterval={30000}
    />
  );
}
