"use server";

import { prisma } from "@/lib/prisma";

import { OrderStatus } from "@/generated/prisma/enums";

export type AnalyticsOverview = {
  total_templates: number;
  total_categories: number;
  total_orders: number;
  total_revenue: number;
  active_templates: number;
  featured_templates: number;
  pending_orders: number;
  completed_orders: number;
};

export type RevenueByMonth = {
  month: string;
  revenue: number;
  orders: number;
};

export type OrdersByStatus = {
  status: string;
  count: number;
  percentage: number;
};

export type TopTemplate = {
  id: string;
  title: string;
  orders_count: number;
  total_revenue: number;
  category_name: string;
};

export type CategoryPerformance = {
  category_name: string;
  templates_count: number;
  orders_count: number;
  total_revenue: number;
};

// Get analytics overview
export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  try {
    const [
      total_templates,
      total_categories,
      total_orders,
      revenue_result,
      active_templates,
      featured_templates,
      pending_orders,
      completed_orders,
    ] = await Promise.all([
      prisma.template.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total_amount: true },
        where: {
          status: {
            in: [OrderStatus.PAID, OrderStatus.COMPLETED],
          },
        },
      }),
      prisma.template.count({ where: { is_active: true } }),
      prisma.template.count({ where: { is_featured: true } }),
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      prisma.order.count({ where: { status: OrderStatus.COMPLETED } }),
    ]);

    return {
      total_templates,
      total_categories,
      total_orders,
      total_revenue: revenue_result._sum.total_amount || 0,
      active_templates,
      featured_templates,
      pending_orders,
      completed_orders,
    };
  } catch (error) {
    console.error("Error fetching analytics overview:", error);
    throw new Error("Gagal mengambil overview analytics");
  }
}

// Get revenue by month (last 6 months)
export async function getRevenueByMonth(): Promise<RevenueByMonth[]> {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const orders = await prisma.order.findMany({
      where: {
        status: {
          in: [OrderStatus.PAID, OrderStatus.COMPLETED],
        },
        created_at: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        created_at: true,
        total_amount: true,
      },
    });

    // Group by month
    const monthlyData = new Map<string, { revenue: number; orders: number }>();

    orders.forEach((order) => {
      const monthKey = order.created_at.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
      });

      const existing = monthlyData.get(monthKey) || { revenue: 0, orders: 0 };
      monthlyData.set(monthKey, {
        revenue: existing.revenue + order.total_amount,
        orders: existing.orders + 1,
      });
    });

    // Convert to array and sort by date
    return Array.from(monthlyData.entries())
      .map(([month, data]) => ({
        month,
        revenue: data.revenue,
        orders: data.orders,
      }))
      .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
      });
  } catch (error) {
    console.error("Error fetching revenue by month:", error);
    throw new Error("Gagal mengambil data revenue per bulan");
  }
}

// Get orders by status distribution
export async function getOrdersByStatus(): Promise<OrdersByStatus[]> {
  try {
    const [total, statusCounts] = await Promise.all([
      prisma.order.count(),
      prisma.order.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      }),
    ]);

    return statusCounts.map((item) => ({
      status: item.status,
      count: item._count.status,
      percentage: total > 0 ? (item._count.status / total) * 100 : 0,
    }));
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    throw new Error("Gagal mengambil data order berdasarkan status");
  }
}

// Get top performing templates
export async function getTopTemplates(limit = 5): Promise<TopTemplate[]> {
  try {
    const orderItems = await prisma.orderItem.groupBy({
      by: ["template_id"],
      _count: {
        template_id: true,
      },
      _sum: {
        price: true,
      },
      orderBy: {
        _count: {
          template_id: "desc",
        },
      },
      take: limit,
    });

    // Get template details
    const templateIds = orderItems.map((item) => item.template_id);
    const templates = await prisma.template.findMany({
      where: {
        id: {
          in: templateIds,
        },
      },
      include: {
        category: true,
      },
    });

    // Combine data
    return orderItems.map((item) => {
      const template = templates.find((t) => t.id === item.template_id);
      return {
        id: item.template_id,
        title: template?.title || "Unknown",
        orders_count: item._count.template_id,
        total_revenue: item._sum.price || 0,
        category_name: template?.category.name || "Unknown",
      };
    });
  } catch (error) {
    console.error("Error fetching top templates:", error);
    throw new Error("Gagal mengambil data template terpopuler");
  }
}

// Get category performance
export async function getCategoryPerformance(): Promise<CategoryPerformance[]> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        templates: {
          include: {
            order_items: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });

    return categories
      .map((category) => {
        const templates_count = category.templates.length;
        const orders_count = category.templates.reduce(
          (sum, template) => sum + template.order_items.length,
          0
        );
        const total_revenue = category.templates.reduce(
          (sum, template) =>
            sum +
            template.order_items.reduce(
              (itemSum, item) => itemSum + item.price,
              0
            ),
          0
        );

        return {
          category_name: category.name,
          templates_count,
          orders_count,
          total_revenue,
        };
      })
      .sort((a, b) => b.total_revenue - a.total_revenue);
  } catch (error) {
    console.error("Error fetching category performance:", error);
    throw new Error("Gagal mengambil data performa kategori");
  }
}

// Get recent orders for activity feed
export async function getRecentOrders(limit = 10) {
  try {
    const orders = await prisma.order.findMany({
      take: limit,
      orderBy: {
        created_at: "desc",
      },
      include: {
        order_items: {
          include: {
            template: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    throw new Error("Gagal mengambil data order terbaru");
  }
}
