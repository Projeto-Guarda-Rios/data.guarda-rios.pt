"use client";

import { DashboardPage } from "@/components/dashboard-page";

const charts = [
  { panelId: 25, title: "visão geral" },
  { panelId: 26, title: "temperatura" },
  { panelId: 28, title: "turbidez" },
];

export default function Mostra2025Page() {
  return (
    <DashboardPage
      title="Mostra 2025"
      description="Dados da estação Mostra 2025 — atualização a cada 5min"
      charts={charts}
      refreshInterval={300000}
      showRefreshButton
    />
  );
}
