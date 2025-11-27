import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import TemplateCard from "@/components/layouts/root/Templates/TemplateCard";

const templates = [
  { name: "Elegan", color: "from-primary/20 to-chart-4/30" },
  { name: "Minimalis", color: "from-chart-2/20 to-primary/30" },
  { name: "Classic", color: "from-chart-3/20 to-chart-1/30" },
  { name: "Modern", color: "from-chart-1/20 to-chart-3/30" },
  { name: "Rustic", color: "from-chart-4/20 to-primary/30" },
  { name: "Ethereal", color: "from-primary/20 to-chart-2/30" },
];

export default function Templates() {
  return (
    <section id="templates" className="relative overflow-hidden">
      <div className="container py-16 md:py-24">
        <SectionHeader
          title="Pilih Template untuk Setiap Momen"
          description="Koleksi template siap pakai yang dapat disesuaikan. Cocok untuk pernikahan, ulang tahun, dan berbagai acara."
          action={
            <Button className="w-full md:w-auto md:mt-0 mt-2">
              <Eye className="size-4" /> Lihat Semua
            </Button>
          }
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <TemplateCard key={t.name} name={t.name} color={t.color} />
          ))}
        </div>
      </div>
    </section>
  );
}
