"use client";

import { DashboardPage } from "@/components/dashboard-page";

const charts = [
  { panelId: 31, title: "temperatura" },
  { panelId: 32, title: "turbidez" },
];

export default function IFestPage() {
  return (
    <DashboardPage
      title="I-Fest²"
      description="Dados da estação I-Fest² — atualização a cada 5min"
      charts={charts}
      refreshInterval={300000}
    />
  );
}
