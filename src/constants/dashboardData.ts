import type { ComponentType } from "react";
import {
  Home,
  LayoutTemplate,
  ShoppingBag,
  BarChart3,
  FileText,
  Plus,
  TrendingUp,
} from "lucide-react";

export const dashboardMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Template",
    url: "/dashboard/templates",
    icon: LayoutTemplate,
  },
  {
    title: "Kategori",
    url: "/dashboard/categories",
    icon: FileText,
  },
  {
    title: "Pesanan",
    url: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    title: "Statistik",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
];

export type DashboardStat = {
  title: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  trend: string;
  color: string;
  bgColor: string;
};

export const DASHBOARD_STATS: DashboardStat[] = [
  {
    title: "Total Template",
    value: "24",
    icon: LayoutTemplate,
    trend: "+3 bulan ini",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Pesanan",
    value: "156",
    icon: ShoppingBag,
    trend: "+12 minggu ini",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Kategori",
    value: "8",
    icon: FileText,
    trend: "+2 baru",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Total Pengunjung",
    value: "1,234",
    icon: TrendingUp,
    trend: "+45 hari ini",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export type QuickAction = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bgColor: string;
};

export const QUICK_ACTIONS: QuickAction[] = [
  {
    title: "Buat Template Baru",
    description: "Tambahkan template undangan baru",
    icon: Plus,
    href: "/dashboard/templates/create",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Lihat Semua Template",
    description: "Kelola template yang ada",
    icon: LayoutTemplate,
    href: "/dashboard/templates",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Kelola Pesanan",
    description: "Buat dan kelola pesanan pelanggan",
    icon: ShoppingBag,
    href: "/dashboard/orders",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Lihat Statistik",
    description: "Analisis performa dan data",
    icon: BarChart3,
    href: "/dashboard/analytics",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];
