import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useEmployeeStore } from "@/store/employeeState";
import { CartesianGrid, Line, LineChart, LabelList } from "recharts";

const chartConfig = {
  configEmployee: {
    label: "Employees",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function AppLineChart() {
  const employees = useEmployeeStore((state) => state.employees);
  const monthCounts: Record<string, number> = {}; // aynı olan tarih ve sayılarını tutucam.

  employees.forEach((emp) => {
    const date = new Date(emp.startDate);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    if (!monthCounts[monthKey]) monthCounts[monthKey] = 0;
    monthCounts[monthKey] += 1;
  });

  const chartData = Object.entries(monthCounts).map(([month, count]) => ({
    month,
    employees: count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium mb-6">
          Monthly Hiring Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart data={chartData} margin={{ top: 24, left: 24, right: 24 }}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="employees"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="employees"
              type="natural"
              stroke="var(--color-configEmployee)"
              strokeWidth={2}
              dot={{ fill: "var(--color-configEmployee)" }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="month"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
