import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sasak Invite — Platform Undangan Digital Modern & Elegan",
  description:
    "Buat undangan digital untuk pernikahan, ulang tahun, acara keluarga, dan berbagai event lainnya. Pilih template premium, kelola tamu, dan bagikan undangan hanya dengan satu klik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <ClerkProvider>
        <body className={cn("antialiased", inter.variable)}>
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
