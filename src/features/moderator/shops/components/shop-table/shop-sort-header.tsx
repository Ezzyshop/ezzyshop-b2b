import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";
import { useQueryParams } from "@/hooks";
import { cn } from "@/lib/utils";

interface IProps {
  field: string;
  label: string;
}

export const ShopSortHeader = ({ field, label }: IProps) => {
  const { getQueryParams, setQueryParams } = useQueryParams();
  const params = getQueryParams();
  const sortBy = (params.sortBy as string) ?? "priority";
  const sortOrder = (params.sortOrder as string) ?? "desc";
  const isActive = sortBy === field;

  const handleToggle = () => {
    const nextOrder = isActive && sortOrder === "desc" ? "asc" : "desc";
    setQueryParams({ ...params, sortBy: field, sortOrder: nextOrder });
  };

  const Icon = !isActive
    ? ArrowUpDownIcon
    : sortOrder === "desc"
    ? ArrowDownIcon
    : ArrowUpIcon;

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "inline-flex items-center gap-1 text-left font-medium hover:text-foreground",
        isActive ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {label}
      <Icon className="w-3.5 h-3.5" />
    </button>
  );
};
