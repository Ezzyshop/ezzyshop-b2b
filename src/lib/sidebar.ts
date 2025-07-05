import {
  BotIcon,
  ChartBarIcon,
  CreditCardIcon,
  DollarSignIcon,
  HomeIcon,
  ListIcon,
  PackageIcon,
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
    title: "Bizneslar",
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

export const dashboardSidebarData = [
  {
    icon: HomeIcon,
    title: "sidebar.dashboard.main_page",
    url: "/dashboard/main",
  },
  {
    icon: ListIcon,
    title: "sidebar.dashboard.categories",
    url: "/dashboard/categories",
  },
  {
    icon: PackageIcon,
    title: "sidebar.dashboard.products",
    url: "/dashboard/products",
  },
  {
    icon: CreditCardIcon,
    title: "sidebar.dashboard.plans",
    url: "/dashboard/plans",
  },
];
