import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TObject } from "@/hooks";
import { UserRoles } from "@/lib/enums";
import { debounce } from "lodash";
import { userRolesTranslations } from "@/lib/enums";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

export const UserTableFilters = ({
  setQueryParams,
  getQueryParams,
}: IProps) => {
  const { search, roles } = getQueryParams();

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
        value={roles as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), roles: value })
        }
      >
        <SelectTrigger
          value={roles as string}
          onReset={() => setQueryParams({ ...getQueryParams(), roles: "" })}
        >
          <SelectValue placeholder="Rol" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(UserRoles).map((role) => (
            <SelectItem key={role} value={role}>
              {userRolesTranslations[role]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
