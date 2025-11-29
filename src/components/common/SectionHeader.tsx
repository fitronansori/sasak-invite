import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  title,
  description,
  action,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center"
          ? "flex flex-col items-center gap-4"
          : "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div
        className={cn(
          align === "center"
            ? "max-w-2xl text-center"
            : "max-w-2xl text-center md:text-left"
        )}
      >
        <h2
          className={cn(
            "text-2xl font-bold tracking-tight text-balance md:text-4xl"
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className={cn("text-muted-foreground mt-2 md:text-lg")}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div
          className={cn(
            align === "center" ? "mt-2" : "mt-2 w-full md:mt-0 md:w-auto"
          )}
        >
          {action}
        </div>
      ) : null}
    </div>
  );
}
