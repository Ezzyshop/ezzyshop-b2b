"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DateRangePicker } from "@/components/ui/date-range-picker";

export const description = "A line chart";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface IProps {
  data: Record<string, string | number>[];
  title: string;
  description: string;
  filter: {
    startDate: string;
    endDate: string;
  };
  setFilter: (filter: { startDate: string; endDate: string }) => void;
  lineDataKey: string;
}

export const LineChart = ({
  data,
  description,
  title,
  filter,
  setFilter,
  lineDataKey,
}: IProps) => {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between flex-col gap-2 border-b sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <DateRangePicker
          onUpdate={(values) => {
            setFilter({
              startDate: values.range.from.toISOString().split("T")[0],
              endDate: values.range.to?.toISOString().split("T")[0] || "",
            });
          }}
          initialDateFrom={filter.startDate}
          initialDateTo={filter.endDate}
          align="start"
          locale="en-US"
        />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[400px]">
          <RechartsLineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey={lineDataKey}
              type="monotone"
              stroke="var(--color-amount)"
              strokeWidth={2}
              dot={false}
            />
          </RechartsLineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
