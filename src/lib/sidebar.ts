import {
  BotIcon,
  ChartBarIcon,
  CreditCardIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";

export const moderatorSidebarData = [
  {
    title: "Asosiy",
    url: "/moderator/statistics",
    icon: ChartBarIcon,
  },
  {
    title: "Foydalanuvchilar",
    url: "/moderator/users",
    icon: UsersIcon,
  },
  {
    title: "Do'konlar",
    url: "/moderator/shops",
    icon: BotIcon,
  },
  {
    title: "Tariflar",
    url: "/moderator/plans",
    icon: CreditCardIcon,
  },
  {
    title: "Valyutalar",
    url: "/moderator/currencies",
    icon: DollarSignIcon,
  },
];
