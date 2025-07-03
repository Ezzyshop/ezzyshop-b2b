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
import { CategoryStatus } from "../utils/category.enum";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

export const CategoryTableFilters = ({
  setQueryParams,
  getQueryParams,
}: IProps) => {
  const { is_popular, status, search } = getQueryParams();

  return (
    <div className="w-full grid grid-cols-6 gap-2 ">
      <Input
        placeholder="Qidirish"
        className="max-w-[200px]"
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
          <SelectValue placeholder="Status" />
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
          <SelectValue placeholder="Mashxurmi" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(["true", "false"]).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
