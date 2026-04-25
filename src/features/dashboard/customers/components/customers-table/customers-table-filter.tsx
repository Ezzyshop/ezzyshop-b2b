import { Input } from "@/components/ui/input";
import { TObject, useDebounce } from "@/hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

export const CustomersTableFilter = ({ setQueryParams, getQueryParams }: IProps) => {
  const { t } = useTranslation();
  const { search } = getQueryParams();
  const [searchValue, setSearchValue] = useState<string>((search as string) ?? "");
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    setQueryParams({
      ...getQueryParams(),
      search: debouncedSearch || undefined,
      page: 1,
    });
  }, [debouncedSearch]);

  return (
    <div className="w-full">
      <Input
        placeholder={t("table.filters.search")}
        className="w-full max-w-sm"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
