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
