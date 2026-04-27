import NotFoundPage from "@/features/static/not-found/pages/not-found.page";
import { RouteAccess } from "@/lib/types/permission.types";
import {
  BotIcon,
  CreditCardIcon,
  HomeIcon,
  KeyRoundIcon,
  LayoutTemplateIcon,
  ListIcon,
  MapIcon,
  MessageSquareIcon,
  Package2,
  PackageIcon,
  PercentIcon,
  SendIcon,
  SettingsIcon,
  ShoppingCartIcon,
  StarIcon,
  SwitchCameraIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import { lazy, type LazyExoticComponent, type ComponentType } from "react";

export type ChildRoute = {
  path: string;
  title?: string;
  icon?: ComponentType;
  access: RouteAccess;
  element: LazyExoticComponent<ComponentType>;
};

export type DashboardRoute = {
  path: string;
  title?: string;
  icon?: ComponentType;
  access: RouteAccess;
  element?: LazyExoticComponent<ComponentType> | ComponentType;
  children?: ChildRoute[];
};

export const dashboardRoutes: DashboardRoute[] = [
  {
    path: "/main",
    element: lazy(() => import("@/features/dashboard/main/pages/main.page")),
    access: { accessType: "admin-only" },
    icon: HomeIcon,
    title: "sidebar.dashboard.main_page",
  },
  {
    path: "/categories",
    element: lazy(
      () => import("@/features/dashboard/categories/pages/categories.page"),
    ),
    access: { accessType: "permission", resource: "categories", action: "read" },
    icon: ListIcon,
    title: "sidebar.dashboard.categories",
  },
  {
    path: "/products",
    element: lazy(
      () => import("@/features/dashboard/products/pages/products.page"),
    ),
    access: { accessType: "permission", resource: "products", action: "read" },
    icon: PackageIcon,
    title: "sidebar.dashboard.products",
  },
  {
    path: "/order-management",
    element: lazy(
      () => import("@/features/dashboard/orders/pages/orders.page"),
    ),
    access: { accessType: "permission", resource: "orders", action: "read" },
    icon: ShoppingCartIcon,
    title: "sidebar.dashboard.orders",
    children: [
      {
        path: "/orders",
        title: "sidebar.dashboard.total_orders",
        icon: Package2,
        access: { accessType: "permission", resource: "orders", action: "read" },
        element: lazy(
          () => import("@/features/dashboard/orders/pages/orders.page"),
        ),
      },
      {
        path: "/customers",
        title: "sidebar.dashboard.customers",
        icon: UsersIcon,
        access: { accessType: "permission", resource: "customers", action: "read" },
        element: lazy(
          () => import("@/features/dashboard/customers/pages/customers.page"),
        ),
      },
    ] as ChildRoute[],
  },
  {
    path: "/orders/:orderId",
    element: lazy(() => import("@/features/dashboard/orders/pages/order.page")),
    access: { accessType: "permission", resource: "orders", action: "read" },
  },
  {
    path: "/delivery",
    element: lazy(
      () =>
        import("@/features/dashboard/delivery-methods/pages/delivery-methods.page"),
    ),
    access: { accessType: "permission", resource: "delivery_methods", action: "read" },
    icon: TruckIcon,
    title: "sidebar.dashboard.delivery",
    children: [
      {
        path: "/delivery-methods",
        title: "sidebar.dashboard.delivery-methods",
        icon: TruckIcon,
        access: { accessType: "permission", resource: "delivery_methods", action: "read" },
        element: lazy(
          () =>
            import("@/features/dashboard/delivery-methods/pages/delivery-methods.page"),
        ),
      },
      {
        path: "/delivery-zones",
        title: "sidebar.dashboard.delivery-zones",
        icon: MapIcon,
        access: { accessType: "permission", resource: "delivery_zones", action: "read" },
        element: lazy(
          () =>
            import("@/features/dashboard/delivery-zone/pages/delivery-zone.page"),
        ),
      },
    ] as ChildRoute[],
  },
  {
    path: "/payment-methods",
    element: lazy(
      () =>
        import("@/features/dashboard/payment-methods/pages/payment-methods.page"),
    ),
    access: { accessType: "permission", resource: "payment_methods", action: "read" },
    icon: CreditCardIcon,
    title: "sidebar.dashboard.payment-methods",
  },
  {
    path: "/branches",
    element: lazy(
      () => import("@/features/dashboard/branches/pages/branches.page"),
    ),
    access: { accessType: "permission", resource: "branches", action: "read" },
    icon: MapIcon,
    title: "sidebar.dashboard.branches",
  },
  {
    path: "/staffs",
    element: lazy(
      () => import("@/features/dashboard/staffs/pages/staffs.page"),
    ),
    access: { accessType: "permission", resource: "staffs", action: "read" },
    icon: UsersIcon,
    title: "sidebar.dashboard.staffs",
  },
  {
    path: "/roles",
    element: lazy(
      () => import("@/features/dashboard/roles/pages/roles.page"),
    ),
    access: { accessType: "admin-only" },
    icon: KeyRoundIcon,
    title: "sidebar.dashboard.roles",
  },
  {
    path: "/plans",
    element: lazy(() => import("@/features/dashboard/plans/pages/plans.page")),
    access: { accessType: "admin-only" },
    icon: SwitchCameraIcon,
    title: "sidebar.dashboard.plans",
  },
  {
    path: "/telegram",
    element: lazy(
      () => import("@/features/dashboard/telegram/pages/telegram-setup.page"),
    ),
    access: { accessType: "permission", resource: "telegram_setup", action: "read" },
    icon: SendIcon,
    title: "sidebar.dashboard.telegram",
    children: [
      {
        path: "/telegram/setup",
        title: "sidebar.dashboard.telegram-setup",
        icon: BotIcon,
        access: { accessType: "permission", resource: "telegram_setup", action: "read" },
        element: lazy(
          () =>
            import("@/features/dashboard/telegram/pages/telegram-setup.page"),
        ),
      },
      {
        path: "/telegram/templates",
        title: "sidebar.dashboard.telegram-templates",
        icon: LayoutTemplateIcon,
        access: { accessType: "permission", resource: "telegram_templates", action: "read" },
        element: lazy(
          () =>
            import("@/features/dashboard/telegram/pages/telegram-templates.page"),
        ),
      },
      {
        path: "/telegram/send-message",
        title: "sidebar.dashboard.telegram-send-message",
        icon: SendIcon,
        access: { accessType: "permission", resource: "telegram_messages", action: "read" },
        element: lazy(
          () =>
            import("@/features/dashboard/telegram/pages/telegram-send-message.page"),
        ),
      },
    ] as ChildRoute[],
  },

  {
    path: "/",
    title: "sidebar.dashboard.marketing",
    access: { accessType: "any" },
    icon: PercentIcon,
    children: [
      {
        path: "/coupons",
        element: lazy(
          () => import("@/features/dashboard/coupons/pages/coupons.page"),
        ),
        access: { accessType: "permission", resource: "coupons", action: "read" },
        icon: TagIcon,
        title: "sidebar.dashboard.coupons",
      },
      {
        path: "/coupons/:couponId/usages",
        element: lazy(
          () => import("@/features/dashboard/coupons/pages/coupon-usages.page"),
        ),
        access: { accessType: "permission", resource: "coupons", action: "read" },
      },
      {
        path: "/reviews",
        element: lazy(
          () => import("@/features/dashboard/reviews/pages/reviews.page"),
        ),
        access: { accessType: "permission", resource: "reviews", action: "read" },
        icon: StarIcon,
        title: "sidebar.dashboard.reviews",
      },
      {
        path: "/chat",
        element: lazy(
          () => import("@/features/dashboard/chat/pages/chat.page"),
        ),
        access: { accessType: "permission", resource: "chat", action: "full" },
        icon: MessageSquareIcon,
        title: "sidebar.dashboard.chat",
      },
    ],
  },

  {
    icon: SettingsIcon,
    title: "sidebar.dashboard.settings",
    path: "/settings",
    element: lazy(
      () => import("@/features/dashboard/settings/pages/settings.page"),
    ),
    access: { accessType: "permission", resource: "shop_settings", action: "read" },
  },

  {
    path: "*",
    element: NotFoundPage,
    access: { accessType: "any" },
  },
];
