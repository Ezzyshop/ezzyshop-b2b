import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TObject, useDebounce } from "@/hooks";
import { UserRoles } from "@/lib/enums";
import { userRolesTranslations } from "@/lib/enums";
import { useEffect, useState } from "react";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

export const UserTableFilters = ({
  setQueryParams,
  getQueryParams,
}: IProps) => {
  const { search, roles } = getQueryParams();
  const [value, setValue] = useState<string>(search as string);
  const debouncedSetQueryParams = useDebounce(value, 500);

  useEffect(() => {
    setQueryParams({ ...getQueryParams(), search: debouncedSetQueryParams || undefined });
  }, [debouncedSetQueryParams]);

  return (
    <div className="w-full grid grid-cols-6 gap-2 ">
      <Input
        placeholder="Qidirish"
        className="max-w-[200px]"
        defaultValue={search as string}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
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
