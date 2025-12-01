type DashboardPageHeaderProps = {
  title: string;
  description?: string;
};

export const DashboardPageHeader = ({
  title,
  description,
}: DashboardPageHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
};
