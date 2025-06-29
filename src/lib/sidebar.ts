import {
  BotIcon,
  CreditCardIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";

export const sidebarData = [
  {
    title: "Foydalanuvchilar",
    url: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    title: "Bizneslar",
    url: "/dashboard/shops",
    icon: BotIcon,
  },
  {
    title: "Tariflar",
    url: "/dashboard/plans",
    icon: CreditCardIcon,
  },
  {
    title: "Valyutalar",
    url: "/dashboard/currencies",
    icon: DollarSignIcon,
  },
];
