import NotFoundPage from "@/features/static/not-found/pages/not-found.page";
import { UserRoles } from "@/lib/enums";
import {
  CreditCardIcon,
  HomeIcon,
  ListIcon,
  MapIcon,
  Package2,
  PackageIcon,
  SendIcon,
  SettingsIcon,
  SwitchCameraIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import { lazy } from "react";

export const dashboardRoutes = [
  {
    path: "/main",
    element: lazy(() => import("@/features/dashboard/main/pages/main.page")),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    icon: HomeIcon,
    title: "sidebar.dashboard.main_page",
  },
  {
    path: "/categories",
    element: lazy(
      () => import("@/features/dashboard/categories/pages/categories.page")
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
    icon: ListIcon,
    title: "sidebar.dashboard.categories",
  },
  {
    path: "/products",
    element: lazy(
      () => import("@/features/dashboard/products/pages/products.page")
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
    icon: PackageIcon,
    title: "sidebar.dashboard.products",
  },
  {
    path: "/orders",
    element: lazy(
      () => import("@/features/dashboard/orders/pages/orders.page")
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
    icon: Package2,
    title: "sidebar.dashboard.orders",
  },
  {
    path: "/orders/:orderId",
    element: lazy(() => import("@/features/dashboard/orders/pages/order.page")),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
  },
  {
    path: "/delivery-methods",
    element: lazy(
      () =>
        import(
          "@/features/dashboard/delivery-methods/pages/delivery-methods.page"
        )
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
    icon: TruckIcon,
    title: "sidebar.dashboard.delivery-methods",
  },
  {
    path: "/payment-methods",
    element: lazy(
      () =>
        import(
          "@/features/dashboard/payment-methods/pages/payment-methods.page"
        )
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
    icon: CreditCardIcon,
    title: "sidebar.dashboard.payment-methods",
  },
  {
    path: "/branches",
    element: lazy(
      () => import("@/features/dashboard/branches/pages/branches.page")
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
    icon: MapIcon,
    title: "sidebar.dashboard.branches",
  },
  {
    path: "/staffs",
    element: lazy(
      () => import("@/features/dashboard/staffs/pages/staffs.page")
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    icon: UsersIcon,
    title: "sidebar.dashboard.staffs",
  },
  {
    path: "/plans",
    element: lazy(() => import("@/features/dashboard/plans/pages/plans.page")),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    icon: SwitchCameraIcon,
    title: "sidebar.dashboard.plans",
  },
  {
    path: "/telegram",
    element: lazy(
      () => import("@/features/dashboard/telegram/pages/telegram.page")
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    icon: SendIcon,
    title: "sidebar.dashboard.telegram",
  },
  {
    path: "/telegram-settings",
    element: lazy(
      () =>
        import(
          "@/features/dashboard/telegram/components/bot-settings/telegram-settings"
        )
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    icon: SendIcon,
    title: "sidebar.dashboard.telegram-settings",
  },
  {
    icon: SettingsIcon,
    title: "sidebar.dashboard.settings",
    path: "/settings",
    element: lazy(
      () => import("@/features/dashboard/settings/pages/settings.page")
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
  },

  {
    path: "*",
    element: NotFoundPage,
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
  },
];
