import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "https://data.guarda-rios.pt/PGR_Logo-Full.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
