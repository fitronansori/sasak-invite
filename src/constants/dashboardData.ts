import type { ComponentType } from "react";

import {
  BarChart3,
  CheckCircle,
  FileText,
  Home,
  LayoutTemplate,
  Plus,
  ShoppingBag,
  Star,
  TrendingUp,
  XCircle,
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

export type TemplateStatConfig = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
};

export const TEMPLATE_STATS_CONFIG: TemplateStatConfig[] = [
  {
    title: "Total Template",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Aktif",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Nonaktif",
    icon: XCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
  {
    title: "Unggulan",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
];

export type CategoryStatConfig = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
};

export const CATEGORY_STATS_CONFIG: CategoryStatConfig[] = [
  {
    title: "Total Kategori",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Kategori Aktif",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Kategori Nonaktif",
    icon: XCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
];

export type OrderStatConfig = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
};

export const ORDER_STATS_CONFIG: OrderStatConfig[] = [
  {
    title: "Total Order",
    description: "Semua order",
    icon: ShoppingBag,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Revenue",
    description: "Order selesai & dibayar",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Menunggu",
    description: "Order pending",
    icon: Plus,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Selesai",
    description: "Order selesai",
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Dibatalkan",
    description: "Order dibatalkan",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
];

// Analytics chart configuration
export const CHART_CONFIG = {
  revenue: {
    label: "Revenue",
    color: "#10b981",
  },
  orders: {
    label: "Orders",
    color: "#3b82f6",
  },
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "#f59e0b",
  PROCESSING: "#3b82f6",
  PAID: "#10b981",
  COMPLETED: "#059669",
  CANCELLED: "#ef4444",
  REFUNDED: "#6366f1",
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Menunggu",
  PROCESSING: "Diproses",
  PAID: "Dibayar",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  REFUNDED: "Dikembalikan",
};

// Analytics overview stats configuration
export type AnalyticsOverviewStatConfig = {
  key: string;
  titleKey: keyof AnalyticsOverviewData;
  getSubtitle: (data: AnalyticsOverviewData) => string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  formatValue?: (value: number) => string | number;
};

export type AnalyticsOverviewData = {
  total_templates: number;
  total_categories: number;
  total_orders: number;
  total_revenue: number;
  active_templates: number;
  completed_orders: number;
};

export const ANALYTICS_OVERVIEW_CONFIG: AnalyticsOverviewStatConfig[] = [
  {
    key: "total_templates",
    titleKey: "total_templates" as keyof AnalyticsOverviewData,
    getSubtitle: (data) => `${data.active_templates} aktif`,
    icon: LayoutTemplate,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    key: "total_categories",
    titleKey: "total_categories" as keyof AnalyticsOverviewData,
    getSubtitle: () => "Kategori tersedia",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    key: "total_orders",
    titleKey: "total_orders" as keyof AnalyticsOverviewData,
    getSubtitle: (data) => `${data.completed_orders} selesai`,
    icon: ShoppingBag,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    key: "total_revenue",
    titleKey: "total_revenue" as keyof AnalyticsOverviewData,
    getSubtitle: () => "Dari pesanan selesai",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    formatValue: (value: number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(value);
    },
  },
];

export const ANALYTICS_STAT_TITLES: Record<string, string> = {
  total_templates: "Total Template",
  total_categories: "Total Kategori",
  total_orders: "Total Pesanan",
  total_revenue: "Total Revenue",
};
