import type { ReactNode } from "react";

// Minimal root layout — actual layout with html/body lives in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
