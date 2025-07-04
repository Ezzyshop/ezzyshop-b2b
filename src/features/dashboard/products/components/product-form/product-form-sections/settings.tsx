import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { IProductForm } from "../../../utils/product.interface";
import { Switch } from "@/components/ui/switch";
import { ProductStatus } from "../../../utils/product.enum";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormSettings = ({ form }: IProps) => {
  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">Settings</h3>

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>Product Status</FormLabel>
              <div className="text-sm text-muted-foreground">
                Enable or disable this product
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value === ProductStatus.ACTIVE}
                onCheckedChange={(checked) =>
                  field.onChange(
                    checked ? ProductStatus.ACTIVE : ProductStatus.INACTIVE
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};
