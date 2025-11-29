"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import type { CategoryModel, TemplateModel } from "../generated/prisma/models";

// Types
export type TemplateWithCategory = TemplateModel & {
  category: Pick<
    CategoryModel,
    "id" | "name" | "slug" | "description" | "image"
  >;
};

export type CreateTemplateInput = {
  title: string;
  description?: string;
  price: number;
  discount_price?: number;
  image?: string;
  thumbnail?: string;
  preview_images?: string[];
  lynk_id_url: string;
  demo_url?: string;
  category_id: string;
  is_active?: boolean;
  is_featured?: boolean;
  tags?: string[];
};

export type UpdateTemplateInput = Partial<CreateTemplateInput>;

export type GetTemplatesParams = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  status?: "all" | "active" | "inactive" | "featured";
};

export type GetTemplatesResult = {
  templates: TemplateWithCategory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Get all templates (for admin dashboard) with pagination
export async function getAllTemplates(
  params: GetTemplatesParams = {}
): Promise<GetTemplatesResult> {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      categoryId,
      status = "all",
    } = params;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    // Search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ];
    }

    // Category filter
    if (categoryId && categoryId !== "all") {
      where.category_id = categoryId;
    }

    // Status filter
    if (status === "active") {
      where.is_active = true;
    } else if (status === "inactive") {
      where.is_active = false;
    } else if (status === "featured") {
      where.is_featured = true;
    }

    // Get total count and templates in parallel
    const [total, templates] = await Promise.all([
      prisma.template.count({ where }),
      prisma.template.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              image: true,
            },
          },
        },
        orderBy: [{ is_featured: "desc" }, { created_at: "desc" }],
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      templates,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching all templates:", error);
    throw new Error("Gagal mengambil data template");
  }
}

// Get template by ID
export async function getTemplateById(
  id: string
): Promise<TemplateWithCategory | null> {
  try {
    const template = await prisma.template.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
          },
        },
      },
    });

    return template;
  } catch (error) {
    console.error("Error fetching template by ID:", error);
    throw new Error("Gagal mengambil data template");
  }
}

// Create new template
export async function createTemplate(data: CreateTemplateInput) {
  try {
    const template = await prisma.template.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        discount_price: data.discount_price,
        image: data.image,
        thumbnail: data.thumbnail,
        preview_images: data.preview_images || [],
        lynk_id_url: data.lynk_id_url,
        demo_url: data.demo_url,
        category_id: data.category_id,
        is_active: data.is_active ?? true,
        is_featured: data.is_featured ?? false,
        tags: data.tags || [],
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
          },
        },
      },
    });

    revalidatePath("/dashboard/templates");
    revalidatePath("/");

    return {
      success: true,
      data: template,
      message: "Template berhasil dibuat",
    };
  } catch (error) {
    console.error("Error creating template:", error);
    return {
      success: false,
      message: "Gagal membuat template",
    };
  }
}

// Update template
export async function updateTemplate(id: string, data: UpdateTemplateInput) {
  try {
    const template = await prisma.template.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.discount_price !== undefined && {
          discount_price: data.discount_price,
        }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
        ...(data.preview_images !== undefined && {
          preview_images: data.preview_images,
        }),
        ...(data.lynk_id_url && { lynk_id_url: data.lynk_id_url }),
        ...(data.demo_url !== undefined && { demo_url: data.demo_url }),
        ...(data.category_id && { category_id: data.category_id }),
        ...(data.is_active !== undefined && { is_active: data.is_active }),
        ...(data.is_featured !== undefined && {
          is_featured: data.is_featured,
        }),
        ...(data.tags !== undefined && { tags: data.tags }),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
          },
        },
      },
    });

    revalidatePath("/dashboard/templates");
    revalidatePath("/");

    return {
      success: true,
      data: template,
      message: "Template berhasil diperbarui",
    };
  } catch (error) {
    console.error("Error updating template:", error);
    return {
      success: false,
      message: "Gagal memperbarui template",
    };
  }
}

// Delete template
export async function deleteTemplate(id: string) {
  try {
    // Check if template has orders
    const orderItems = await prisma.orderItem.count({
      where: { template_id: id },
    });

    if (orderItems > 0) {
      return {
        success: false,
        message:
          "Tidak dapat menghapus template yang memiliki pesanan. Pertimbangkan untuk menonaktifkan saja.",
      };
    }

    await prisma.template.delete({
      where: { id },
    });

    revalidatePath("/dashboard/templates");
    revalidatePath("/");

    return {
      success: true,
      message: "Template berhasil dihapus",
    };
  } catch (error) {
    console.error("Error deleting template:", error);
    return {
      success: false,
      message: "Gagal menghapus template",
    };
  }
}

// Toggle template active status
export async function toggleTemplateStatus(id: string, is_active: boolean) {
  try {
    const template = await prisma.template.update({
      where: { id },
      data: { is_active },
    });

    revalidatePath("/dashboard/templates");
    revalidatePath("/");

    return {
      success: true,
      data: template,
      message: `Template berhasil ${
        is_active ? "diaktifkan" : "dinonaktifkan"
      }`,
    };
  } catch (error) {
    console.error("Error toggling template status:", error);
    return {
      success: false,
      message: "Gagal mengubah status template",
    };
  }
}

// Toggle template featured status
export async function toggleTemplateFeatured(id: string, is_featured: boolean) {
  try {
    const template = await prisma.template.update({
      where: { id },
      data: { is_featured },
    });

    revalidatePath("/dashboard/templates");
    revalidatePath("/");

    return {
      success: true,
      data: template,
      message: `Template berhasil ${
        is_featured ? "dijadikan unggulan" : "dihapus dari unggulan"
      }`,
    };
  } catch (error) {
    console.error("Error toggling template featured status:", error);
    return {
      success: false,
      message: "Gagal mengubah status unggulan template",
    };
  }
}

// Get templates statistics
export async function getTemplatesStats() {
  try {
    const [total, active, featured, byCategory] = await Promise.all([
      prisma.template.count(),
      prisma.template.count({ where: { is_active: true } }),
      prisma.template.count({ where: { is_featured: true } }),
      prisma.template.groupBy({
        by: ["category_id"],
        _count: true,
      }),
    ]);

    return {
      total,
      active,
      inactive: total - active,
      featured,
      by_category: byCategory,
    };
  } catch (error) {
    console.error("Error fetching templates stats:", error);
    throw new Error("Gagal mengambil statistik template");
  }
}

// Search templates
export async function searchTemplates(query: string) {
  try {
    const templates = await prisma.template.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { tags: { has: query } },
        ],
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
          },
        },
      },
      orderBy: [{ is_featured: "desc" }, { created_at: "desc" }],
    });

    return templates;
  } catch (error) {
    console.error("Error searching templates:", error);
    throw new Error("Gagal mencari template");
  }
}

// Get templates by category
export async function getTemplatesByCategory(category_id: string) {
  try {
    const templates = await prisma.template.findMany({
      where: { category_id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
          },
        },
      },
      orderBy: [{ is_featured: "desc" }, { created_at: "desc" }],
    });

    return templates;
  } catch (error) {
    console.error("Error fetching templates by category:", error);
    throw new Error("Gagal mengambil template berdasarkan kategori");
  }
}
