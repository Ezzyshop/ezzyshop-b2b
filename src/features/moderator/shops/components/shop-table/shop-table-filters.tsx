import { getCurrenciesQueryFn, getPlansQueryFn } from "@/api/queries";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { useQueries } from "@tanstack/react-query";
import {
  BusinessType,
  SHOP_PRIORITIES,
  ShopPlatform,
  shopPriorityTranslations,
  shopTypesTranslations,
} from "../../utils";
import { TObject, useDebounce } from "@/hooks";
import { useEffect, useState } from "react";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

export const ShopTableFilters = ({
  setQueryParams,
  getQueryParams,
}: IProps) => {
  const { plan, currency, businessType, platform, status, priority, search } =
    getQueryParams();
  const [value, setValue] = useState<string>(search as string);
  const debouncedSetQueryParams = useDebounce(value, 500);

  useEffect(() => {
    setQueryParams({
      ...getQueryParams(),
      search: debouncedSetQueryParams || undefined,
    });
  }, [debouncedSetQueryParams]);

  const [currencies, plans] = useQueries({
    queries: [
      {
        queryKey: ["currencies"],
        queryFn: () => getCurrenciesQueryFn(),
      },
      {
        queryKey: ["plans"],
        queryFn: () => getPlansQueryFn(),
      },
    ],
  });

  return (
    <div className="w-full grid grid-cols-7 gap-2 ">
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
        value={plan as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), plan: value })
        }
      >
        <SelectTrigger
          value={plan as string}
          onReset={() => setQueryParams({ ...getQueryParams(), plan: "" })}
        >
          <SelectValue placeholder="Tarif" />
        </SelectTrigger>
        <SelectContent>
          {plans?.data?.data.map((plan) => (
            <SelectItem key={plan._id} value={plan._id}>
              {plan.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={currency as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), currency: value })
        }
      >
        <SelectTrigger
          value={currency as string}
          onReset={() => setQueryParams({ ...getQueryParams(), currency: "" })}
        >
          <SelectValue placeholder="Valyuta" />
        </SelectTrigger>
        <SelectContent>
          {currencies?.data?.data.map((currency) => (
            <SelectItem key={currency._id} value={currency._id}>
              {currency.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={businessType as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), businessType: value })
        }
      >
        <SelectTrigger
          value={businessType as string}
          onReset={() =>
            setQueryParams({ ...getQueryParams(), businessType: "" })
          }
        >
          <SelectValue placeholder="Do'kon turi" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(BusinessType).map((platform) => (
            <SelectItem key={platform} value={platform}>
              {shopTypesTranslations[platform]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={platform as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), platform: value })
        }
      >
        <SelectTrigger
          value={platform as string}
          onReset={() => setQueryParams({ ...getQueryParams(), platform: "" })}
        >
          <SelectValue placeholder="Platforma" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(ShopPlatform).map((platform) => (
            <SelectItem key={platform} value={platform}>
              {shopTypesTranslations[platform]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
          <SelectItem value="ACTIVE">Aktiv</SelectItem>
          <SelectItem value="INACTIVE">Inaktiv</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={priority as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), priority: value })
        }
      >
        <SelectTrigger
          value={priority as string}
          onReset={() => setQueryParams({ ...getQueryParams(), priority: "" })}
        >
          <SelectValue placeholder="Muhimligi" />
        </SelectTrigger>
        <SelectContent>
          {SHOP_PRIORITIES.map((p) => (
            <SelectItem key={p} value={String(p)}>
              {shopPriorityTranslations[p]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
