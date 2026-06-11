import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MPMBI - Masyarakat Profesional Manajemen dan Bisnis Indonesia",
  description: "Wadah kolaboratif bagi profesional, akademisi, dan praktisi untuk memperkuat kapasitas manajemen dan bisnis di Indonesia.",
};

import { FooterWrapper } from "@/components/footer-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <div className="flex-grow">{children}</div>
        <FooterWrapper />
      </body>
    </html>
  );
}
