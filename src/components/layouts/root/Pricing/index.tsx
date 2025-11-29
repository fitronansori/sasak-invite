import SectionHeader from "@/components/common/SectionHeader";
import PricingCard from "@/components/layouts/root/Pricing/PricingCard";

import { PRICING_PLANS } from "@/constants/data";

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden">
      <div className="container py-16 md:py-24">
        <SectionHeader
          title="Paket Harga"
          description="Pilih paket yang sesuai. Tersedia opsi kustom dan domain .com bila diperlukan."
          align="center"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {PRICING_PLANS.map((p) => (
            <PricingCard
              key={p.name}
              name={p.name}
              price={p.price}
              description={p.description}
              features={p.features}
              domainNote={p.domainNote}
              cta={p.cta}
              highlight={p.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
