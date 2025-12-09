import type { Template } from "@/generated/prisma";

import TemplateCard from "./TemplateCard";

interface TemplatesGridProps {
  templates: Array<
    Template & {
      category: {
        id: string;
        name: string;
      };
    }
  >;
}

export default function TemplatesGrid({ templates }: TemplatesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {templates.map((template, index) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          title={template.title}
          image={template.thumbnail || template.image || undefined}
          price={template.price}
          discount_price={template.discount_price || undefined}
          lynk_id_url={template.lynk_id_url || undefined}
          demo_url={template.demo_url || undefined}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
