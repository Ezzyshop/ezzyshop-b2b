import { useQuery } from "@tanstack/react-query";
import { InputSelect } from "../ui/input-select";
import { getUsersQueryFn } from "@/api/queries";
import { useQueryParams } from "@/hooks";
import { useMemo } from "react";
import { debounce } from "lodash";

interface IProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
}

export const UserSelectField = ({ value, onChange, disabled }: IProps) => {
  const { getQueryParams, setQueryParams } = useQueryParams();

  const { limit = 10, page = 1, ...queries } = getQueryParams();

  const filter = {
    limit,
    page,
    ...queries,
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", filter],
    queryFn: () => getUsersQueryFn(filter),
  });

  const onInputChange = (value: string) => {
    setQueryParams({
      ...queries,
      search: value,
    });
  };

  const options = useMemo(() => {
    return data?.data.map((user) => ({
      value: user._id,
      label: user.full_name,
    }));
  }, [data]);

  return (
    <InputSelect
      disabled={disabled}
      options={options ?? []}
      value={value ?? ""}
      onChange={onChange}
      isLoading={isLoading || isFetching}
      inputValue={getQueryParams().search as string}
      onInputChange={debounce(onInputChange, 500)}
    />
  );
};
