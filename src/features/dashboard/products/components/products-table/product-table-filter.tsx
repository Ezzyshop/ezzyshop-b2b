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
import { getCategoriesQueryFn } from "@/api/queries/categories.query";
import { useQuery } from "@tanstack/react-query";
import { LanguageType } from "@/features/moderator/shops/utils";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
  shopId: string;
}

export const ProductTableFilters = ({
  setQueryParams,
  getQueryParams,
  shopId,
}: IProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as LanguageType;
  const { status, search, categoryId } = getQueryParams();
  const [value, setValue] = useState<string>(search as string);
  const debouncedSetQueryParams = useDebounce(value, 500);

  useEffect(() => {
    setQueryParams({ ...getQueryParams(), search: debouncedSetQueryParams || undefined });
  }, [debouncedSetQueryParams]);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories", shopId, { limit: 100 }],
    queryFn: () => getCategoriesQueryFn(shopId, { limit: 100 }),
    enabled: Boolean(shopId),
  });

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-2">
      <Input
        placeholder={t("table.filters.search")}
        className="md:max-w-[200px]"
        type="text"
        defaultValue={search as string}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
          {Object.values(ProductStatus).map((s) => (
            <SelectItem key={s} value={s}>
              {t(productStatusOptions[s])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={categoryId as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), categoryId: value })
        }
      >
        <SelectTrigger
          value={categoryId as string}
          onReset={() => setQueryParams({ ...getQueryParams(), categoryId: "" })}
        >
          <SelectValue placeholder={t("table.filters.category")} />
        </SelectTrigger>
        <SelectContent>
          {categoriesData?.data.map((cat) => (
            <SelectItem key={cat._id} value={cat._id}>
              {cat.name[lang] ?? cat.name.uz}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
