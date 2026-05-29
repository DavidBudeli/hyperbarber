import {
  CalendarDaysIcon,
  LayoutDashboardIcon,
  ScissorsIcon,
  ShieldIcon,
  SparklesIcon,
} from "lucide-react"

export const mainNavigation = [
  {
    href: "/",
    label: "Visão geral",
    icon: SparklesIcon,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    href: "/barbershops",
    label: "Studios",
    icon: ScissorsIcon,
  },
  {
    href: "/bookings",
    label: "Agenda",
    icon: CalendarDaysIcon,
  },
  {
    href: "/admin",
    label: "Hyper Admin",
    icon: ShieldIcon,
  },
] as const

export const dashboardNavigation = [
  "Agenda do dia",
  "Clientes",
  "Serviços",
  "Faturamento",
  "IA",
] as const
