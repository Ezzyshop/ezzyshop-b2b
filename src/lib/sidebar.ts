import { ChartBarIcon, SettingsIcon, UsersIcon } from "lucide-react";

export const sidebarData = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Statistikalar",
          url: "/dashboard/statistics",
          icon: ChartBarIcon,
        },
        {
          title: "Mijozlar",
          url: "/dashboard/shops",
          icon: UsersIcon,
        },
        {
          title: "Sozlamalar",
          url: "/dashboard/settings",
          icon: SettingsIcon,
        },
      ],
    },
  ],
};
