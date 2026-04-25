import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { TObject, useDebounce } from "@/hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

const SORT_OPTIONS = [
  { value: "first_order_date", labelKey: "table.columns.first_order_date" },
  { value: "total_orders", labelKey: "table.columns.total_orders" },
  { value: "total_amount", labelKey: "table.columns.total_amount" },
  { value: "registered_at", labelKey: "table.columns.registered_at" },
] as const;

const SORT_ORDER_OPTIONS = [
  { value: "desc", labelKey: "table.filters.sort_desc" },
  { value: "asc", labelKey: "table.filters.sort_asc" },
] as const;

export const CustomersTableFilter = ({ setQueryParams, getQueryParams }: IProps) => {
  const { t } = useTranslation();
  const { search, sortBy, sortOrder } = getQueryParams();
  const [searchValue, setSearchValue] = useState<string>(search as string ?? "");
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    setQueryParams({
      ...getQueryParams(),
      search: debouncedSearch || undefined,
      page: 1,
    });
  }, [debouncedSearch]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
      <Input
        placeholder={t("table.filters.search")}
        className="w-full"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Select
        value={(sortBy as string) ?? "first_order_date"}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), sortBy: value, page: 1 })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={t("table.filters.sort_by")} />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={(sortOrder as string) ?? "desc"}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), sortOrder: value, page: 1 })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={t("table.filters.sort_order")} />
        </SelectTrigger>
        <SelectContent>
          {SORT_ORDER_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
