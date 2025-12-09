"use client";

import { useState } from "react";

import Image from "next/image";

import {
  ExternalLink,
  Eye,
  MoreHorizontal,
  Pencil,
  Power,
  Star,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { formatCurrency } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { TemplateWithCategory } from "@/actions/dash-template-action";
import {
  deleteTemplate,
  toggleTemplateFeatured,
  toggleTemplateStatus,
} from "@/actions/dash-template-action";
import type { Category } from "@/generated/prisma";

import { EditTemplateDialog } from "./EditTemplateDialog";

type TemplatesTableProps = {
  templates: TemplateWithCategory[];
  categories: Category[];
};

export function TemplatesTable({ templates, categories }: TemplatesTableProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateWithCategory | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedTemplate) return;

    setIsDeleting(true);
    try {
      const result = await deleteTemplate(selectedTemplate.id);
      if (result.success) {
        toast.success(result.message);
        setIsDeleteDialogOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Gagal menghapus template");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (
    template: TemplateWithCategory,
    newStatus: boolean
  ) => {
    try {
      const result = await toggleTemplateStatus(template.id, newStatus);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Gagal mengubah status template");
    }
  };

  const handleToggleFeatured = async (
    template: TemplateWithCategory,
    newStatus: boolean
  ) => {
    try {
      const result = await toggleTemplateFeatured(template.id, newStatus);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Gagal mengubah status unggulan template");
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Gambar</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Unggulan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Tidak ada template ditemukan
                </TableCell>
              </TableRow>
            ) : (
              templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                      {template.thumbnail || template.image ? (
                        <Image
                          src={template.thumbnail || template.image || ""}
                          alt={template.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                          <Eye className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{template.title}</span>
                      {template.description && (
                        <span className="text-muted-foreground line-clamp-1 text-sm">
                          {template.description}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{template.category.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {formatCurrency(template.price)}
                      </span>
                      {template.discount_price && (
                        <span className="text-muted-foreground text-sm line-through">
                          {formatCurrency(template.discount_price)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={template.is_active ? "default" : "secondary"}
                    >
                      {template.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {template.is_featured && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        {template.demo_url && (
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(template.demo_url!, "_blank")
                            }
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Lihat Demo
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTemplate(template);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleToggleStatus(template, !template.is_active)
                          }
                        >
                          <Power className="mr-2 h-4 w-4" />
                          {template.is_active ? "Nonaktifkan" : "Aktifkan"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleToggleFeatured(
                              template,
                              !template.is_featured
                            )
                          }
                        >
                          <Star className="mr-2 h-4 w-4" />
                          {template.is_featured
                            ? "Hapus Unggulan"
                            : "Jadikan Unggulan"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTemplate(template);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditTemplateDialog
        template={selectedTemplate}
        categories={categories}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus template
              &quot;{selectedTemplate?.title}&quot; secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
