"use client";

import { useTranslations } from "next-intl";
import {
  Droplets,
  Github,
  ExternalLink,
  Terminal,
  Activity,
  Instagram,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Hero */}
      <div className="space-y-4 pt-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Terminal className="h-3 w-3" />
          <span className="font-mono">{t("terminalCommand")}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t("title")}{" "}
          <span className="text-primary">{t("titleHighlight")}</span>
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t("welcome")}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {t("parametersLabel")}
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-foreground">2</p>
          <p className="text-[10px] text-muted-foreground">
            {t("parametersDesc")}
          </p>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {t("stationsLabel")}
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-foreground">1</p>
          <p className="text-[10px] text-muted-foreground">
            {t("stationsDesc")}
          </p>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {t("statusLabel")}
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-primary">
            {t("statusValue")}
          </p>
          <p className="text-[10px] text-muted-foreground">{t("statusDesc")}</p>
        </div>
      </div>

      {/* Terminal-style about section */}
      <div className="rounded-md border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          <span className="ml-2 text-[10px] text-muted-foreground">
            {t("aboutFile")}
          </span>
        </div>
        <div className="space-y-3 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
          <p>
            <span className="text-primary">$</span> {t("about1")}
          </p>
          <p>
            <span className="text-primary">$</span> {t("about2")}
          </p>
          <p>
            <span className="text-primary">$</span>{" "}
            {t.rich("about3", {
              mit: (chunks) => (
                <span className="text-foreground">{chunks}</span>
              ),
              cern: (chunks) => (
                <span className="text-foreground">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        <a
          href="https://guarda-rios.pt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ExternalLink className="h-3 w-3" />
          guarda-rios.pt
        </a>
        <a
          href="https://github.com/Projeto-Guarda-Rios"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Github className="h-3 w-3" />
          github
        </a>
        <a
          href="https://www.instagram.com/projeto_guardarios/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Instagram className="h-3 w-3" />
          instagram
        </a>
      </div>
    </div>
  );
}
