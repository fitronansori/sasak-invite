import type { TemplateModel } from "@/generated/prisma/models";

import TemplateCard from "./TemplateCard";

interface TemplatesGridProps {
  templates: Array<
    TemplateModel & {
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
          demo_url={template.demo_url || undefined}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
