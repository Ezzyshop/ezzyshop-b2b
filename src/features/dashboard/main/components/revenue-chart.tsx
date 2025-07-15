"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

export function RevenueChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  return (
    <Card className="pt-0 md:col-span-4">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Tushumlar</CardTitle>
          <CardDescription>So‘nggi 3 oy uchun umumiy tushumlar</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              So‘nggi 3 oy
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              So‘nggi 30 kun
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              So‘nggi 7 kun
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6"></CardContent>
    </Card>
  );
}
