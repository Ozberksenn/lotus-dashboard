import { LayoutDashboard, Users, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type MenuType = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const menu: MenuType[] = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Employees",
    url: "employees",
    icon: Users,
  },
];
