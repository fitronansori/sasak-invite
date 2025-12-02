"use server";

import { prisma } from "@/lib/prisma";

export async function getTemplates() {
  try {
    const templates = await prisma.template.findMany({
      where: {
        is_active: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return {
      success: true,
      data: templates,
    };
  } catch (error) {
    console.error("Error fetching templates:", error);
    return {
      success: false,
      error: "Gagal mengambil data template",
    };
  }
}

export async function getTemplatesWithFilters({
  search = "",
  category_id = "",
  page = 1,
  limit = 8,
}: {
  search?: string;
  category_id?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const skip = (page - 1) * limit;

    // Build where clause
    const where: {
      is_active: boolean;
      OR?: Array<{
        title?: { contains: string; mode: "insensitive" };
        description?: { contains: string; mode: "insensitive" };
        tags?: { has: string };
      }>;
      category_id?: string;
    } = {
      is_active: true,
    };

    // Add search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ];
    }

    // Add category filter
    if (category_id) {
      where.category_id = category_id;
    }

    // Get templates with pagination
    const [templates, total] = await Promise.all([
      prisma.template.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: {
          created_at: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.template.count({ where }),
    ]);

    const total_pages = Math.ceil(total / limit);

    return {
      success: true,
      data: templates,
      pagination: {
        page,
        limit,
        total,
        total_pages,
        has_next: page < total_pages,
        has_prev: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching templates:", error);
    return {
      success: false,
      error: "Gagal mengambil data template",
    };
  }
}

export async function getFeaturedTemplates() {
  try {
    const templates = await prisma.template.findMany({
      where: {
        is_active: true,
        is_featured: true,
      },
      include: {
        category: true,
      },
      take: 6,
      orderBy: {
        created_at: "desc",
      },
    });

    return {
      success: true,
      data: templates,
    };
  } catch (error) {
    console.error("Error fetching featured templates:", error);
    return {
      success: false,
      error: "Gagal mengambil data template unggulan",
    };
  }
}

export async function getTemplateById(id: string) {
  try {
    const template = await prisma.template.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    if (!template) {
      return {
        success: false,
        error: "Template tidak ditemukan",
      };
    }

    return {
      success: true,
      data: template,
    };
  } catch (error) {
    console.error("Error fetching template:", error);
    return {
      success: false,
      error: "Gagal mengambil data template",
    };
  }
}
