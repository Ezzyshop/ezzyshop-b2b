import {
  BotIcon,
  ChartBarIcon,
  CreditCardIcon,
  DollarSignIcon,
  HomeIcon,
  ListIcon,
  MapIcon,
  Package2,
  PackageIcon,
  SettingsIcon,
  SwitchCameraIcon,
  TruckIcon,
  UsersIcon,
  SendIcon,
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
    icon: MapIcon,
    title: "sidebar.dashboard.branches",
    url: "/dashboard/branches",
  },
  {
    icon: SwitchCameraIcon,
    title: "sidebar.dashboard.plans",
    url: "/dashboard/plans",
  },
  {
    icon: SendIcon,
    title: "sidebar.dashboard.telegram",
    url: "/dashboard/telegram",
  },
  {
    icon: SettingsIcon,
    title: "sidebar.dashboard.settings",
    url: "/dashboard/settings",
  },
];
