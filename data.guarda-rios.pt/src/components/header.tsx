"use client";

import { usePathname, Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Terminal, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/sidebar";

const routeLabels: Record<string, string> = {
  "/": "~/home",
  "/dashboard/geral": "~/dashboard/geral",
  "/dashboard/mostra-2025": "~/dashboard/mostra-2025",
  "/dashboard/granja": "~/dashboard/granja",
  "/dashboard/ifest": "~/dashboard/I-Fest²",
};

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const label = routeLabels[pathname] ?? "~/unknown";
  const { theme, setTheme } = useTheme();
  const t = useTranslations("header");

  const otherLocale = locale === "pt" ? "en" : "pt";

  return (
    <header className="flex h-12 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Terminal className="h-3.5 w-3.5 hidden md:block" />
          <span className="font-mono text-xs">
            <span className="text-primary">pgr</span>
            <span className="text-muted-foreground">@</span>
            <span className="text-foreground">data</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-primary">{label}</span>
            <span className="cursor-blink text-primary">_</span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://guarda-rios.pt"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          guarda-rios.pt
        </a>
        <Link
          href={pathname}
          locale={otherLocale}
          className="text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary px-1"
        >
          {otherLocale}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={t("toggleTheme")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
}
