import { AppAreaChart } from "@/app/dashboard/_components/AppAreaChart";
import { AppBarChart } from "@/app/dashboard/_components/AppBarChart";
import { AppLineChart } from "@/app/dashboard/_components/AppLineChart";
import { AppPieChart } from "@/app/dashboard/_components/AppPieChart";
import { EmployeeCard } from "@/app/dashboard/_components/EmployeeCard";
import { DepartmentCard } from "./_components/DepartmentCard";
import { useEmployeeStore } from "@/store/employeeState";
import { AppSpinner } from "@/components/AppSpinner";
import { MessageCircleWarning } from "lucide-react";

export default function Dashboard() {
  const { isLoading, error } = useEmployeeStore();
  if (isLoading) return <AppSpinner />;
  if (error) return <MessageCircleWarning />;
  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <EmployeeCard />
        </div>
        <div className="flex-1">
          <AppPieChart />
        </div>
        <div className="flex-1">
          <DepartmentCard />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <AppBarChart />
        </div>
        <div className="flex-1">
          <AppLineChart />
        </div>
        <div className="flex-1">
          <AppAreaChart />
        </div>
      </div>
    </div>
  );
}
