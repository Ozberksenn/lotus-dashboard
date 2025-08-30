"use client";
import { useEffect } from "react";
import { Label, Pie, PieChart } from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEmployeeStore } from "@/store/employeeState";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const AppPieChart = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const departments = useEmployeeStore((state) => state.departments);

  const chartData = departments.map((dept, index) => {
    const deptEmployees = employees.filter(
      (emp) => emp.departmentId === dept.id
    );
    return {
      name: dept.name,
      value: deptEmployees.length,
      fill: `var(--chart-${index + 1})`,
    };
  });

  const totalDep = chartData.reduce((sum, dept) => sum + dept.value, 0);
  const chartConfig = {} satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium mb-6">
          Department And Employee Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalDep.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Department
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 leading-none font-medium">
          Departments within the company
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          There are a total of {totalDep} departments.
        </div>
      </div>
    </Card>
  );
};
