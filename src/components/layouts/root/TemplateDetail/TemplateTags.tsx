import { Badge } from "@/components/ui/badge";

interface TemplateTagsProps {
  tags: string[];
}

export default function TemplateTags({ tags }: TemplateTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div>
      <p className="text-muted-foreground mb-3 text-sm">Tags:</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
