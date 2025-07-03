import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";

const recentSales = [
  {
    initials: "OM",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
  },
  {
    initials: "JL",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
  },
  {
    initials: "IN",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
  },
  {
    initials: "WK",
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
  },
  {
    initials: "SD",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
  },
];

export const RecentSales = () => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentSales.map((sale, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-sm font-medium">
                  {sale.initials}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1 flex-1 min-w-0">
                <p className="text-sm font-medium leading-none">{sale.name}</p>
                <p className="text-sm text-gray-500 truncate">{sale.email}</p>
              </div>
              <div className="ml-auto font-medium text-sm">{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
