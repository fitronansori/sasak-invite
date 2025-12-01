"use client";

import { useState } from "react";

import { toast } from "sonner";

import {
  deleteCategory,
  toggleCategoryStatus,
} from "@/actions/dash-category-action";
import type { CategoryModel } from "@/generated/prisma/models";

export function useCategoryTable() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryModel | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (category: CategoryModel) => {
    setSelectedCategory(category);
    setShowEditDialog(true);
  };

  const handleDelete = (category: CategoryModel) => {
    setSelectedCategory(category);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    setIsDeleting(true);
    const result = await deleteCategory(selectedCategory.id);

    if (result.success) {
      toast.success("Kategori berhasil dihapus");
      setShowDeleteDialog(false);
      setSelectedCategory(null);
    } else {
      toast.error(result.error || "Gagal menghapus kategori");
    }
    setIsDeleting(false);
  };

  const handleToggleStatus = async (
    category: CategoryModel,
    checked: boolean
  ) => {
    const result = await toggleCategoryStatus(category.id, checked);

    if (result.success) {
      toast.success(
        `Kategori ${checked ? "diaktifkan" : "dinonaktifkan"} berhasil`
      );
    } else {
      toast.error(result.error || "Gagal mengubah status kategori");
    }
  };

  return {
    selectedCategory,
    showEditDialog,
    setShowEditDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    isDeleting,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleToggleStatus,
  };
}
