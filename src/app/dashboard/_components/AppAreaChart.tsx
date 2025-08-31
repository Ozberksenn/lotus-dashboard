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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  junior: {
    label: "Junior",
    color: "var(--chart-3)",
  },
  senior: {
    label: "Senior",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// Sadece bu chart da fake data kullanıldı.

const chartData = [
  { month: "January", junior: 186, senior: 80 },
  { month: "February", junior: 305, senior: 200 },
  { month: "March", junior: 237, senior: 120 },
  { month: "April", junior: 73, senior: 190 },
  { month: "May", junior: 209, senior: 130 },
  { month: "June", junior: 214, senior: 140 },
];

export default function AppAreaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium mb-6">
          Performance Distrubitons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <defs>
              <linearGradient id="fillJunior" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-junior)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-junior)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSenior" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-senior)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-senior)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="senior"
              type="natural"
              fill="url(#fillSenior)"
              fillOpacity={0.4}
              stroke="var(--color-senior)"
              stackId="a"
            />
            <Area
              dataKey="junior"
              type="natural"
              fill="url(#fillJunior)"
              fillOpacity={0.4}
              stroke="var(--color-junior)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
