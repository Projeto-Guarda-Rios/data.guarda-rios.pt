"use client";

import { DashboardPage } from "@/components/dashboard-page";

const charts = [
  { panelId: 2, title: "visão geral" },
  { panelId: 11, title: "temperatura" },
  { panelId: 12, title: "turbidez" },
  { panelId: 9, title: "pH" },
  { panelId: 10, title: "TDS (sólidos dissolvidos)" },
  { panelId: 21, title: "indicador de qualidade" },
];

export default function GranjaPage() {
  return (
    <DashboardPage
      title="Ribeira da Granja"
      description="Dados da estação Ribeira da Granja — atualização a cada 5min"
      charts={charts}
      refreshInterval={300000}
    />
  );
}
