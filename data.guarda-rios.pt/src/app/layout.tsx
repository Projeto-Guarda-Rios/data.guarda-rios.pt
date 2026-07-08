import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
