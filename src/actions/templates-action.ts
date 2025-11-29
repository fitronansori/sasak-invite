"use server";

import { prisma } from "@/lib/prisma";
import type { TemplateModel, CategoryModel } from "../generated/prisma/models";

// Menggunakan type yang sudah di-generate Prisma
export type TemplateWithCategory = TemplateModel & {
  category: Pick<
    CategoryModel,
    "id" | "name" | "slug" | "description" | "image"
  >;
};

export async function getTemplates(): Promise<TemplateWithCategory[]> {
  try {
    const templates = await prisma.template.findMany({
      where: {
        is_active: true,
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
    console.error("Error fetching templates:", error);
    throw new Error("Failed to fetch templates");
  }
}
