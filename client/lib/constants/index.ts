// Auth routes
export const auth_routes = ["/auth/log-in", "/auth/sign-up"];

// Dashboard routes
import {
  Bolt,
  ChartPie,
  House,
  MessageCircle,
  Package,
  Truck,
  Users,
} from "lucide-react";
export const dashboard_main_routes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: ChartPie,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: Truck,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageCircle,
  },
];

export const dashboard_tools_routes = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Bolt,
  },
  {
    title: "Manage Users",
    href: "/dashboard/manage-users",
    icon: Users,
  },
];
