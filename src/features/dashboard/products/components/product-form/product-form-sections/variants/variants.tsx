import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IProductForm } from "../../../../utils/product.interface";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VariantAttributeForm } from "./variant-attribute-form";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormVariants = ({ form }: IProps) => {
  const addVariant = () => {
    const currentVariants = form.getValues("variants") || [];
    form.setValue("variants", [
      ...currentVariants,
      {
        sku: "",
        attributes: {},
        price: 0,
        quantity: 0,
        image: "",
      },
    ]);
  };

  const removeVariant = (index: number) => {
    const currentVariants = form.getValues("variants") || [];
    form.setValue(
      "variants",
      currentVariants.filter((_, i) => i !== index)
    );
  };

  const addVariantAttribute = (
    variantIndex: number,
    key: string,
    value: string
  ) => {
    if (key.trim() && value.trim()) {
      const currentVariants = form.getValues("variants") || [];
      const variant = currentVariants[variantIndex];
      if (variant) {
        variant.attributes[key.trim()] = value.trim();
        form.setValue("variants", currentVariants);
      }
    }
  };

  const removeVariantAttribute = (variantIndex: number, key: string) => {
    const currentVariants = form.getValues("variants") || [];
    const variant = currentVariants[variantIndex];
    if (variant) {
      delete variant.attributes[key];
      form.setValue("variants", currentVariants);
    }
  };

  const variants = form.watch("variants") || [];

  return (
    <Card className="p-3 gap-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Product Variants</h3>
        <Button type="button" onClick={addVariant}>
          <Plus className="w-4 h-4 mr-2" />
          Add Variant
        </Button>
      </div>

      {variants.map((variant, variantIndex) => (
        <Card key={variantIndex} className="p-4 mb-4 border-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Variant {variantIndex + 1}</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeVariant(variantIndex)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField
              control={form.control}
              name={`variants.${variantIndex}.sku`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>SKU</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter SKU" maxLength={64} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`variants.${variantIndex}.image`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter image URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`variants.${variantIndex}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`variants.${variantIndex}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="0"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <h5 className="font-medium">Attributes</h5>
            {Object.entries(variant.attributes || {}).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <Input value={key} readOnly className="flex-1" />
                <Input value={value} readOnly className="flex-1" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeVariantAttribute(variantIndex, key)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <VariantAttributeForm
              onAdd={(key, value) =>
                addVariantAttribute(variantIndex, key, value)
              }
            />
          </div>
        </Card>
      ))}
    </Card>
  );
};
