import { z } from "zod";

// Template Form Schema
export const templateFormSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().optional(),
  price: z.number().min(0, "Harga harus positif"),
  discount_price: z.number().min(0, "Harga diskon harus positif").optional(),
  image: z.string().optional(),
  thumbnail: z.string().optional(),
  preview_images: z.array(z.string()).optional(),
  lynk_id_url: z
    .string()
    .min(1, "Lynk.id URL wajib diisi")
    .url("URL tidak valid"),
  demo_url: z.string().url("URL tidak valid").optional().or(z.literal("")),
  category_id: z.string().min(1, "Kategori wajib dipilih"),
  is_active: z.boolean(),
  is_featured: z.boolean(),
  tags: z.array(z.string()).optional(),
});

export type TemplateFormValues = z.infer<typeof templateFormSchema>;

// Category Form Schema
export const categoryFormSchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi"),
  slug: z
    .string()
    .min(1, "Slug harus diisi")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug harus lowercase dan gunakan dash (-)"),
  description: z.string().optional(),
  image: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
  is_active: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
