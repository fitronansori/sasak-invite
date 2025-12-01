"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

import type { CategoryModel } from "../generated/prisma/models";


// Get all categories
export async function getAllCategories(): Promise<CategoryModel[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { created_at: "desc" },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Gagal mengambil data kategori");
  }
}


// Get active categories only
export async function getActiveCategories(): Promise<CategoryModel[]> {
  try {
    const categories = await prisma.category.findMany({
      where: { is_active: true },
      orderBy: { name: "asc" },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching active categories:", error);
    throw new Error("Gagal mengambil data kategori aktif");
  }
}


// Get categories stats
export async function getCategoriesStats() {
  try {
    const [total, active, inactive] = await Promise.all([
      prisma.category.count(),
      prisma.category.count({ where: { is_active: true } }),
      prisma.category.count({ where: { is_active: false } }),
    ]);

    return { total, active, inactive };
  } catch (error) {
    console.error("Error fetching categories stats:", error);
    throw new Error("Gagal mengambil statistik kategori");
  }
}


// Create new category
export async function createCategory(data: {
  name: string;
  description?: string;
  slug: string;
  image?: string;
  is_active?: boolean;
}) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Anda harus login untuk membuat kategori",
    };
  }

  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        image: data.image,
        is_active: data.is_active ?? true,
      },
    });

    revalidatePath("/dashboard/categories");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Gagal membuat kategori" };
  }
}


// Update category
export async function updateCategory(
  id: string,
  data: {
    name?: string;
    description?: string;
    slug?: string;
    image?: string;
    is_active?: boolean;
  }
) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Anda harus login untuk mengupdate kategori",
    };
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/categories");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Gagal mengupdate kategori" };
  }
}


// Delete category
export async function deleteCategory(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Anda harus login untuk menghapus kategori",
    };
  }

  try {
    // Check if category has templates
    const templatesCount = await prisma.template.count({
      where: { category_id: id },
    });

    if (templatesCount > 0) {
      return {
        success: false,
        error: `Kategori tidak dapat dihapus karena masih memiliki ${templatesCount} template`,
      };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/dashboard/categories");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Gagal menghapus kategori" };
  }
}


// Toggle category active status
export async function toggleCategoryStatus(id: string, is_active: boolean) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Anda harus login untuk mengubah status kategori",
    };
  }

  try {
    // Use transaction to ensure both operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // Update category status
      const category = await tx.category.update({
        where: { id },
        data: { is_active },
      });

      // If category is being deactivated, deactivate all templates in this category
      if (!is_active) {
        await tx.template.updateMany({
          where: { category_id: id },
          data: { is_active: false },
        });
      }

      return category;
    });

    revalidatePath("/dashboard/categories");
    revalidatePath("/dashboard/templates");
    return { success: true, data: result };
  } catch (error) {
    console.error("Error toggling category status:", error);
    return { success: false, error: "Gagal mengubah status kategori" };
  }
}
