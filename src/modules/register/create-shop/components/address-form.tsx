import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { YandexMap } from "@/components/yandex-map/yandex-map";
import { IShopForm } from "@/modules/moderator/shops/utils";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn<IShopForm>;
}

export const AddressForm = ({ form }: IProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Manzil</h3>
      <p className="text-sm text-muted-foreground">
        Manzilni kiriting yoki xaritadan tanlang
      </p>
      <Form {...form}>
        <FormField
          control={form.control}
          name="address.address"
          render={({ field }) => (
            <FormItem className="col-span-2 mb-4">
              <FormLabel>To'liq manzil</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter address"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <YandexMap
          initialCoordinates={[
            Number(form.getValues("address.lat")),
            Number(form.getValues("address.long")),
          ]}
          onLocationSelect={(data) => {
            form.setValue("address.lat", data.coordinates[0]);
            form.setValue("address.long", data.coordinates[1]);
            form.setValue("address.address", data.address);
          }}
        />
      </Form>
    </div>
  );
};
