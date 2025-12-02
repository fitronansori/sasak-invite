import { Grid3x3 } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "Tidak ada template yang ditemukan",
}: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <Grid3x3 className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
