import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  BusinessType,
  enumTranslate,
  IShopForm,
  ShopPlatform,
} from "../../../utils";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueries } from "@tanstack/react-query";
import { getCurrencies, getPlans } from "@/api/queries";

interface IProps {
  form: UseFormReturn<IShopForm>;
}

export const ShopFormBasicInformation = ({ form }: IProps) => {
  const [plans, currencies] = useQueries({
    queries: [
      {
        queryKey: ["plans"],
        queryFn: () => getPlans(),
      },
      {
        queryKey: ["currencies"],
        queryFn: () => getCurrencies(),
      },
    ],
  });

  return (
    <Card className="p-4 grid grid-cols-2 gap-4">
      <h3 className="text-lg font-medium col-span-2">Asosiy ma'lumotlar</h3>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>Biznes nomi</FormLabel>
            <FormControl>
              <Input placeholder="Biznes nomini kiriting" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="plan"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>Tariff</FormLabel>
            <FormControl>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tariffni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {plans.data?.data.map((plan) => (
                    <SelectItem key={plan._id} value={plan._id}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>Biznes turi</FormLabel>
            <FormControl>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Biznes turini tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(BusinessType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {enumTranslate[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="platform"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>Platforma</FormLabel>
            <FormControl>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Platformani tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ShopPlatform).map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {enumTranslate[platform]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>Valyuta</FormLabel>
            <FormControl>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Valyutani tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.data?.data.map((currency) => (
                    <SelectItem key={currency._id} value={currency._id}>
                      {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Logo</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://example.com/logo.png"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Biznes haqida</FormLabel>
            <FormControl>
              <textarea
                {...field}
                value={field.value || ""}
                placeholder="Biznes haqida ma'lumotlarni kiriting"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};
