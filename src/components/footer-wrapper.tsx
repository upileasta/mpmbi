"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function FooterWrapper() {
  const pathname = usePathname();

  // Jangan tampilkan footer di semua rute yang berawalan /admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}
