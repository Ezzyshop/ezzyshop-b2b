import NotFoundPage from "@/features/static/not-found/pages/not-found.page";
import { UserRoles } from "@/lib/enums";
import {
  BotIcon,
  CreditCardIcon,
  HomeIcon,
  LayoutTemplateIcon,
  ListIcon,
  MapIcon,
  MessageSquareIcon,
  Package2,
  PackageIcon,
  SendIcon,
  SettingsIcon,
  SwitchCameraIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import { lazy, type LazyExoticComponent, type ComponentType } from "react";

export type ChildRoute = {
  path: string;
  title: string;
  icon?: ComponentType;
  roles: UserRoles[];
  element: LazyExoticComponent<ComponentType>;
};

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
    path: "/delivery",
    element: lazy(
      () =>
        import(
          "@/features/dashboard/delivery-methods/pages/delivery-methods.page"
        )
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
    icon: TruckIcon,
    title: "sidebar.dashboard.delivery",
    children: [
      {
        path: "/delivery-methods",
        title: "sidebar.dashboard.delivery-methods",
        icon: TruckIcon,
        roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
        element: lazy(
          () =>
            import(
              "@/features/dashboard/delivery-methods/pages/delivery-methods.page"
            )
        ),
      },
      {
        path: "/delivery-zones",
        title: "sidebar.dashboard.delivery-zones",
        icon: MapIcon,
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
        element: lazy(
          () =>
            import(
              "@/features/dashboard/delivery-zone/pages/delivery-zone.page"
            )
        ),
      },
    ] as ChildRoute[],
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
      () => import("@/features/dashboard/telegram/pages/telegram-setup.page")
    ),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    icon: SendIcon,
    title: "sidebar.dashboard.telegram",
    children: [
      {
        path: "/telegram/setup",
        title: "sidebar.dashboard.telegram-setup",
        icon: BotIcon,
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
        element: lazy(
          () => import("@/features/dashboard/telegram/pages/telegram-setup.page")
        ),
      },
      {
        path: "/telegram/templates",
        title: "sidebar.dashboard.telegram-templates",
        icon: LayoutTemplateIcon,
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
        element: lazy(
          () => import("@/features/dashboard/telegram/pages/telegram-templates.page")
        ),
      },
      {
        path: "/telegram/send-message",
        title: "sidebar.dashboard.telegram-send-message",
        icon: SendIcon,
        roles: [UserRoles.SuperAdmin, UserRoles.Admin],
        element: lazy(
          () => import("@/features/dashboard/telegram/pages/telegram-send-message.page")
        ),
      },
    ] as ChildRoute[],
  },
  {
    path: "/coupons",
    element: lazy(() => import("@/features/dashboard/coupons/pages/coupons.page")),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin],
    icon: TagIcon,
    title: "sidebar.dashboard.coupons",
  },
  {
    path: "/coupons/:couponId/usages",
    element: lazy(() => import("@/features/dashboard/coupons/pages/coupon-usages.page")),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
  },
  {
    path: "/chat",
    element: lazy(() => import("@/features/dashboard/chat/pages/chat.page")),
    roles: [UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Staff],
    icon: MessageSquareIcon,
    title: "sidebar.dashboard.chat",
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
