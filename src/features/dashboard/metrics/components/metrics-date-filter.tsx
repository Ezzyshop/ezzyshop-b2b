import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export type GroupBy = "day" | "week" | "month";

interface IProps {
  dateRange: { startDate: string; endDate: string };
  onDateChange: (range: { startDate: string; endDate: string }) => void;
  groupBy?: GroupBy;
  onGroupByChange?: (value: GroupBy) => void;
  showGroupBy?: boolean;
}

const PRESETS = [
  { labelKey: "metrics.filter.today", days: 0 },
  { labelKey: "metrics.filter.last_7_days", days: 7 },
  { labelKey: "metrics.filter.last_30_days", days: 30 },
  { labelKey: "metrics.filter.last_90_days", days: 90 },
] as const;

export const MetricsDateFilter = ({
  dateRange,
  onDateChange,
  groupBy = "day",
  onGroupByChange,
  showGroupBy = true,
}: IProps) => {
  const { t } = useTranslation();
  const [activePreset, setActivePreset] = useState<number | null>(30);

  const applyPreset = (days: number) => {
    setActivePreset(days);
    const start =
      days === 0
        ? dayjs().format("YYYY-MM-DD")
        : dayjs().subtract(days, "day").format("YYYY-MM-DD");
    onDateChange({ startDate: start, endDate: dayjs().format("YYYY-MM-DD") });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex gap-1 items-center">
        {PRESETS.map((p) => (
          <Button
            key={p.days}
            variant={activePreset === p.days ? "default" : "outline"}
            size="sm"
            onClick={() => applyPreset(p.days)}
          >
            {t(p.labelKey)}
          </Button>
        ))}
        <DateRangePicker
          onUpdate={(values) => {
            setActivePreset(null);
            onDateChange({
              startDate: values.range.from.toISOString().split("T")[0],
              endDate:
                values.range.to?.toISOString().split("T")[0] ??
                dayjs().format("YYYY-MM-DD"),
            });
          }}
          initialDateFrom={dateRange.startDate}
          initialDateTo={dateRange.endDate}
          align="end"
          locale="en-US"
        />
      </div>

      {showGroupBy && onGroupByChange && (
        <Select
          value={groupBy}
          onValueChange={(v) => onGroupByChange(v as GroupBy)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">{t("metrics.filter.group_day")}</SelectItem>
            <SelectItem value="week">
              {t("metrics.filter.group_week")}
            </SelectItem>
            <SelectItem value="month">
              {t("metrics.filter.group_month")}
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
