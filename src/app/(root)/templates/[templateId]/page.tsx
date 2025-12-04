import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import {
  TemplateHeader,
  TemplateImageGallery,
  TemplatePricing,
  TemplateTags,
} from "@/components/layouts/root/TemplateDetail";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { getTemplateById } from "@/actions/templates-action";

interface TemplateDetailPageProps {
  params: Promise<{
    templateId: string;
  }>;
}

const TemplateDetailPage = async ({ params }: TemplateDetailPageProps) => {
  const { templateId } = await params;

  const result = await getTemplateById(templateId);

  if (!result.success || !result.data) {
    notFound();
  }

  const template = result.data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/templates">
          <ArrowLeft className="size-4" />
          Kembali ke Templates
        </Link>
      </Button>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Image Gallery */}
        <div className="lg:col-span-2">
          <TemplateImageGallery
            preview_images={template.preview_images}
            image={template.image || undefined}
            title={template.title}
          />
        </div>

        {/* Template Info */}
        <div className="space-y-6">
          <TemplateHeader
            category_name={template.category.name}
            is_featured={template.is_featured}
            title={template.title}
            description={template.description || undefined}
          />

          <Separator />

          <TemplatePricing
            price={template.price}
            discount_price={template.discount_price || undefined}
            lynk_id_url={template.lynk_id_url}
            demo_url={template.demo_url || undefined}
          />

          <TemplateTags tags={template.tags} />
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailPage;
