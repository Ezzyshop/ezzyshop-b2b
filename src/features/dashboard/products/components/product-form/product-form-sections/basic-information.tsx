import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { IProductForm } from "../../../utils/product.interface";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormBasicInformation = ({ form }: IProps) => {
  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">Basic Information</h3>

      {/* Product Name - Localized */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name.uz"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Product Name (UZ)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter product name in Uzbek" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name.en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name (EN)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter product name in English"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name.ru"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Product Name (RU)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter product name in Russian"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter product description"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
};
