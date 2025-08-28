import { Home, Calendar, LucideProps } from "lucide-react";
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
    title: "Home",
    url: "home",
    icon: Home,
  },

  {
    title: "Management",
    url: "management",
    icon: Calendar,
  },
];
