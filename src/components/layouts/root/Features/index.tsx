import SectionHeader from "@/components/common/SectionHeader";
import FeatureCard from "@/components/layouts/root/Features/FeatureCard";
import { FEATURES } from "@/constants/data";

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden">
      <div className="container py-16 md:py-24">
        <SectionHeader
          title="Fitur Utama untuk Setiap Undangan"
          description="Semua yang Anda butuhkan untuk membuat undangan digital yang modern, informatif, dan mudah dibagikan."
          align="center"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
