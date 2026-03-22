"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect root "/" to default locale "/pt"
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/pt");
  }, [router]);
  return null;
}
