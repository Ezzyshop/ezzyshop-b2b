import {
  BotIcon,
  ChartBarIcon,
  CreditCardIcon,
  DollarSignIcon,
  HomeIcon,
  ListIcon,
  Package2,
  PackageIcon,
  SettingsIcon,
  SwitchCameraIcon,
  TruckIcon,
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
    icon: Package2,
    title: "sidebar.dashboard.orders",
    url: "/dashboard/orders",
  },
  {
    icon: TruckIcon,
    title: "sidebar.dashboard.delivery-methods",
    url: "/dashboard/delivery-methods",
  },
  {
    icon: CreditCardIcon,
    title: "sidebar.dashboard.payment-methods",
    url: "/dashboard/payment-methods",
  },
  {
    icon: SwitchCameraIcon,
    title: "sidebar.dashboard.plans",
    url: "/dashboard/plans",
  },
  {
    icon: SettingsIcon,
    title: "sidebar.dashboard.settings",
    url: "/dashboard/settings",
  },
];
