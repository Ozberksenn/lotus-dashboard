"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useEmployeeStore } from "@/store/employeeState";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const AppBarChart = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const departments = useEmployeeStore((state) => state.departments);

  const chartData = departments.map((dept, index) => {
    // maybe i can get active employee
    const deptEmployees = employees.filter(
      (emp) => emp.departmentId === dept.id
    );

    const avgSalary =
      deptEmployees.length > 0
        ? deptEmployees.reduce((sum, emp) => sum + Number(emp.salary), 0) /
          deptEmployees.length
        : 0;

    return {
      name: dept.name,
      salaries: avgSalary,
      fill: `var(--chart-${index + 1})`,
    };
  });
  const chartConfig = {} satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium mb-6">
          Salary Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="salaries" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
