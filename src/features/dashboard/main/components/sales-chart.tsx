"use client";

import { useQuery } from "@tanstack/react-query";
import { getSalesChartQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { useTranslation } from "react-i18next";
import { LineChart } from "./line-chart";

export const description = "A line chart";

export const SalesChart = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    startDate: dayjs().subtract(11, "month").format("YYYY-MM-DD"),
    endDate: dayjs().add(0, "month").format("YYYY-MM-DD"),
  });

  const { data } = useQuery({
    queryKey: ["sales-chart", shop._id, filter.startDate, filter.endDate],
    queryFn: () =>
      getSalesChartQueryFn(shop._id, filter.startDate, filter.endDate),
  });

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.data.monthly_data.map((item) => ({
      date: item.month,
      orders: item.orders,
    }));
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <LineChart
      data={chartData}
      description={t("dashboard.main.sales.description")}
      title={t("dashboard.main.sales.title")}
      filter={filter}
      setFilter={setFilter}
      lineDataKey="orders"
    />
  );
};
