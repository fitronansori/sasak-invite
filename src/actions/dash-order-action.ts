
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/generated/prisma/enums";

import type { OrderModel, OrderItemModel, TemplateModel, CategoryModel } from "@/generated/prisma/models";

// Extended types with relations
export type OrderWithItems = OrderModel & {
  order_items: (OrderItemModel & {
    template: TemplateModel & {
      category: CategoryModel;
    };
  })[];
};

export type GetOrdersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus | "all";
};

export type GetOrdersResult = {
  orders: OrderWithItems[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Get all orders with pagination and filters
export async function getAllOrders(params: GetOrdersParams = {}): Promise<GetOrdersResult> {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "all",
    } = params;

    const skip = (page - 1) * limit;

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Search filter
    if (search) {
      where.OR = [
        { order_number: { contains: search, mode: "insensitive" } },
        { customer_name: { contains: search, mode: "insensitive" } },
        { customer_email: { contains: search, mode: "insensitive" } },
        { customer_phone: { contains: search, mode: "insensitive" } },
      ];
    }

    // Status filter
    if (status && status !== "all") {
      where.status = status;
    }

    // Get orders and total count
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          order_items: {
            include: {
              template: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
        orderBy: { created_at: "desc" },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Gagal mengambil data order");
  }
}

// Get single order by ID
export async function getOrderById(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        order_items: {
          include: {
            template: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Gagal mengambil data order");
  }
}

// Get orders stats
export async function getOrdersStats() {
  try {
    const [
      total,
      pending,
      processing,
      paid,
      completed,
      cancelled,
      totalRevenue,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      prisma.order.count({ where: { status: OrderStatus.PROCESSING } }),
      prisma.order.count({ where: { status: OrderStatus.PAID } }),
      prisma.order.count({ where: { status: OrderStatus.COMPLETED } }),
      prisma.order.count({ where: { status: OrderStatus.CANCELLED } }),
      prisma.order.aggregate({
        _sum: { total_amount: true },
        where: {
          status: {
            in: [OrderStatus.PAID, OrderStatus.COMPLETED],
          },
        },
      }),
    ]);

    return {
      total,
      pending,
      processing,
      paid,
      completed,
      cancelled,
      total_revenue: totalRevenue._sum.total_amount || 0,
    };
  } catch (error) {
    console.error("Error fetching orders stats:", error);
    throw new Error("Gagal mengambil statistik order");
  }
}

// Create new order
export async function createOrder(data: {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  total_amount: number;
  status?: OrderStatus;
  payment_method?: string;
  payment_proof?: string;
  notes?: string;
  order_items: Array<{
    template_id: string;
    price: number;
    quantity: number;
  }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Anda harus login untuk membuat order",
    };
  }

  try {
    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        order_number: orderNumber,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        total_amount: data.total_amount,
        status: data.status || OrderStatus.PENDING,
        payment_method: data.payment_method,
        payment_proof: data.payment_proof,
        notes: data.notes,
        order_items: {
          create: data.order_items.map((item) => ({
            template_id: item.template_id,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        order_items: {
          include: {
            template: true,
          },
        },
      },
    });

    revalidatePath("/dashboard/orders");
    return { success: true, data: order };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Gagal membuat order" };
  }
}

// Update order
export async function updateOrder(
  id: string,
  data: {
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    status?: OrderStatus;
    payment_method?: string;
    payment_proof?: string;
    notes?: string;
  }
) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Anda harus login untuk mengupdate order",
    };
  }

  try {
    const order = await prisma.order.update({
      where: { id },
      data,
      include: {
        order_items: {
          include: {
            template: true,
          },
        },
      },
    });

    revalidatePath("/dashboard/orders");
    return { success: true, data: order };
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false, error: "Gagal mengupdate order" };
  }
}

// Update order status
export async function updateOrderStatus(id: string, status: OrderStatus) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Anda harus login untuk mengubah status order",
    };
  }

  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/dashboard/orders");
    return { success: true, data: order };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Gagal mengubah status order" };
  }
}

// Delete order
export async function deleteOrder(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Anda harus login untuk menghapus order",
    };
  }

  try {
    // Use transaction to delete order items first, then the order
    await prisma.$transaction(async (tx) => {
      // Delete order items
      await tx.orderItem.deleteMany({
        where: { order_id: id },
      });

      // Delete order
      await tx.order.delete({
        where: { id },
      });
    });

    revalidatePath("/dashboard/orders");
    return { success: true };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { success: false, error: "Gagal menghapus order" };
  }
}
