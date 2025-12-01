import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { QUICK_ACTIONS } from "@/constants/dashboardData";

export const QuickActionsSection = () => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Menu Cepat</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {QUICK_ACTIONS.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="h-full cursor-pointer gap-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className={`rounded-lg p-3 ${action.bgColor} w-fit`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>

                <CardTitle className="mt-4 text-lg">{action.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription>{action.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
