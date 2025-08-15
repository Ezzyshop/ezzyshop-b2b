import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { TObject, useDebounce } from "@/hooks";
import { CategoryStatus } from "../../utils/category.enum";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

export const CategoryTableFilters = ({
  setQueryParams,
  getQueryParams,
}: IProps) => {
  const { t } = useTranslation();
  const { is_popular, status, search } = getQueryParams();
  const [value, setValue] = useState<string>(search as string);
  const debouncedSetQueryParams = useDebounce(value, 500);

  useEffect(() => {
    setQueryParams({ ...getQueryParams(), search: debouncedSetQueryParams });
  }, [debouncedSetQueryParams]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-2 ">
      <Input
        placeholder={t("table.filters.search")}
        className="md:max-w-[200px]"
        type="text"
        defaultValue={search as string}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Select
        value={status as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), status: value })
        }
      >
        <SelectTrigger
          value={status as string}
          onReset={() => setQueryParams({ ...getQueryParams(), status: "" })}
        >
          <SelectValue placeholder={t("table.filters.status")} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(CategoryStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={is_popular as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), is_popular: value })
        }
      >
        <SelectTrigger
          value={is_popular as string}
          onReset={() =>
            setQueryParams({ ...getQueryParams(), is_popular: "" })
          }
        >
          <SelectValue placeholder={t("table.filters.is_popular")} />
        </SelectTrigger>
        <SelectContent>
          {Object.values([true, false]).map((is_popular) => (
            <SelectItem
              key={is_popular.toString()}
              value={is_popular.toString()}
            >
              {is_popular
                ? t("table.columns.popular")
                : t("table.columns.not_popular")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
