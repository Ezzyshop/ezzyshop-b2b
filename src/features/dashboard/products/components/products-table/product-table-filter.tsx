import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { TObject } from "@/hooks";
import { debounce } from "lodash";
import { ProductStatus, productStatusOptions } from "../../utils/product.enum";
import { useTranslation } from "react-i18next";

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

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-2 ">
      <Input
        placeholder={t("table.filters.search")}
        className="md:max-w-[200px]"
        defaultValue={search as string}
        onChange={debounce(
          ({ target: { value } }) =>
            setQueryParams({ ...getQueryParams(), search: value }),
          500
        )}
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
