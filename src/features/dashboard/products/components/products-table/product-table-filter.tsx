import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { TObject, useDebounce } from "@/hooks";
import { ProductStatus, productStatusOptions } from "../../utils/product.enum";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

export const ProductTableFilters = ({
  setQueryParams,
  getQueryParams,
}: IProps) => {
  const { t } = useTranslation();
  const { status, search } = getQueryParams();
  const [value, setValue] = useState<string>(search as string);
  const debouncedSetQueryParams = useDebounce(value, 500);

  useEffect(() => {
    setQueryParams({ ...getQueryParams(), search: debouncedSetQueryParams || undefined });
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
          {Object.values(ProductStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {t(productStatusOptions[status])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
