"use server";

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
