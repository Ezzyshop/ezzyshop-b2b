import { Card } from "@/components/ui/card";
import { IProductForm } from "../../../utils/product.interface";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQueryFn } from "@/api/queries";
import { useShopContext } from "@/contexts";
import { MultiSelect } from "@/components/ui/multi-select";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormCategories = ({ form }: IProps) => {
  const { shop } = useShopContext();
  const { i18n } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["categories", shop._id],
    queryFn: () => getCategoriesQueryFn(shop._id),
    enabled: Boolean(shop._id),
  });

  const addCategory = (values: string[]) => {
    form.setValue("categories", values);
  };

  if (isLoading || !data?.data) {
    return null;
  }

  const categoriesOptions = data?.data.map((category) => ({
    label: category.name[i18n.language as keyof typeof category.name],
    value: category._id,
  }));

  const categories = form.watch("categories");

  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">Categories</h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <MultiSelect
            options={categoriesOptions ?? []}
            onValueChange={addCategory}
            defaultValue={categories}
          />
        </div>
      </div>
    </Card>
  );
};
