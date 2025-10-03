import { Input } from "@/components/ui/input";

import { TObject, useDebounce } from "@/hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
  
interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

export const StaffsTableFilters = ({
  setQueryParams,
  getQueryParams,
}: IProps) => {
  const { t } = useTranslation();
  const { search } = getQueryParams();
  const [value, setValue] = useState<string>(search as string);
  const debouncedSetQueryParams = useDebounce(value, 500);

  useEffect(() => {
    setQueryParams({ ...getQueryParams(), search: debouncedSetQueryParams });
  }, [debouncedSetQueryParams]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-2 ">
      <Input
        placeholder={t("table.filters.search")}
        className="w-full"
        type="text"
        defaultValue={search as string}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};
