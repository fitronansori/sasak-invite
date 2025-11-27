import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/root/Header";
import { cn } from "@/lib/utils";

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
      <body className={cn("antialiased", inter.variable)}>
        <Header />
        {children}
      </body>
    </html>
  );
}
