import { Sparkles, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface TemplateHeaderProps {
  category_name: string;
  is_featured: boolean;
  title: string;
  description?: string;
}

export default function TemplateHeader({
  category_name,
  is_featured,
  title,
  description,
}: TemplateHeaderProps) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Badge variant="secondary" className="gap-1">
          <Tag className="size-3" />
          {category_name}
        </Badge>
        {is_featured && (
          <Badge variant="default" className="gap-1">
            <Sparkles className="size-3" />
            Featured
          </Badge>
        )}
      </div>

      <h1 className="mb-2 text-3xl font-bold">{title}</h1>

      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
