"use client";
import { useEmployeeStore } from "@/store/employeeState";
import AppAreaChart from "@/app/dashboard/_components/AppAreaChart";
import AppBarChart from "@/app/dashboard/_components/AppBarChart";
import AppLineChart from "@/app/dashboard/_components/AppLineChart";
import AppPieChart from "@/app/dashboard/_components/AppPieChart";
import EmployeeCard from "@/app/dashboard/_components/EmployeeCard";
import DepartmentCard from "./_components/DepartmentCard";
import AppSpinner from "@/components/AppSpinner";
import { MessageCircleWarning } from "lucide-react";

export default function Dashboard() {
  const { isLoading, error } = useEmployeeStore();

  if (isLoading) return <AppSpinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <MessageCircleWarning />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <EmployeeCard />
      <AppPieChart />
      <DepartmentCard />
      <AppBarChart />
      <AppLineChart />
      <AppAreaChart />
    </div>
  );
}
