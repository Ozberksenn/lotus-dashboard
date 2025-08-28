import { AppAreaChart } from "@/app/dashboard/_components/AppAreaChart";
import { AppBarChart } from "@/app/dashboard/_components/AppBarChart";
import { AppLineChart } from "@/app/dashboard/_components/AppLineChart";
import { AppPieChart } from "@/app/dashboard/_components/AppPieChart";
import { EmployeeCard } from "@/app/dashboard/_components/EmployeeCard";

export default function Dashboard() {
  return (
    <div className="p-4">
      <div className="flex flex-row gap-2">
        <div className="flex-1">
          <EmployeeCard />
        </div>
        <div className="flex-1">
          <AppPieChart />
        </div>
        <div className="flex-1">
          <EmployeeCard />
        </div>
      </div>
      <div className="flex flex-row gap-2">
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
