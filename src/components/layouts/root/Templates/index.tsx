import Link from "next/link";

import { Eye } from "lucide-react";

import SectionHeader from "@/components/common/SectionHeader";
import TemplateCard from "@/components/layouts/root/Templates/TemplateCard";
import { Button } from "@/components/ui/button";

import { getFeaturedTemplates } from "@/actions/templates-action";

export default async function Templates() {
  const result = await getFeaturedTemplates();
  const templates = result.success && result.data ? result.data : [];

  return (
    <section id="templates" className="relative overflow-hidden">
      <div className="container py-16 md:py-24">
        <SectionHeader
          title="Pilih Template untuk Setiap Momen"
          description="Koleksi template siap pakai yang dapat disesuaikan. Cocok untuk pernikahan, ulang tahun, dan berbagai acara."
          action={
            <Button className="mt-2 w-full md:mt-0 md:w-auto" asChild>
              <Link href="/templates">
                <Eye className="size-4" /> Lihat Semua
              </Link>
            </Button>
          }
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              title={template.title}
              image={template.image || undefined}
              price={template.price}
              discount_price={template.discount_price || undefined}
              demo_url={template.demo_url || undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
