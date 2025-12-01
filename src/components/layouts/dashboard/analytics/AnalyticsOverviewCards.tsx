import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ANALYTICS_OVERVIEW_CONFIG,
  ANALYTICS_STAT_TITLES,
  type AnalyticsOverviewData,
} from "@/constants/dashboardData";

type AnalyticsOverviewCardsProps = {
  data: AnalyticsOverviewData;
};

export function AnalyticsOverviewCards({ data }: AnalyticsOverviewCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {ANALYTICS_OVERVIEW_CONFIG.map((config) => {
        const value = data[config.titleKey];
        const displayValue = config.formatValue
          ? config.formatValue(value as number)
          : value;

        return (
          <Card key={config.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {ANALYTICS_STAT_TITLES[config.key]}
              </CardTitle>
              <div className={`rounded-lg p-2 ${config.bgColor}`}>
                <config.icon className={`h-4 w-4 ${config.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayValue}</div>
              <p className="text-muted-foreground mt-1 text-xs">
                {config.getSubtitle(data)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
