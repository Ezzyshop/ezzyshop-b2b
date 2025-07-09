import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ProductFormBasicInformation } from "./product-form-sections/basic-information";
import { IProductForm } from "../../utils/product.interface";
import { ProductFormPricingInformation } from "./product-form-sections/pricing-information";
import { ProductFormImages } from "./product-form-sections/images";
import { ProductFormCategories } from "./product-form-sections/categories";
import { createProductSchema } from "../../utils/product.validator";
import { ProductFormVariants } from "./product-form-sections/variants/variants";
import { ProductFormSettings } from "./product-form-sections/settings";
import { ProductStatus } from "../../utils/product.enum";
import { LanguageType } from "@/features/moderator/shops/utils";
import { useState } from "react";
import { useShopContext } from "@/contexts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IProps {
  onSubmit: (data: IProductForm) => void;
  isLoading: boolean;
  initialValues?: IProductForm;
}

export const ProductForm = ({ onSubmit, isLoading, initialValues }: IProps) => {
  const { shop } = useShopContext();

  const [activeLanguage, setActiveLanguage] = useState<LanguageType>(
    shop.languages.find((lang) => lang.is_main)?.type || LanguageType.Uz
  );

  const availableLanguages = shop.languages.map((lang) => lang.type);

  const languageLabels = {
    [LanguageType.Uz]: "UZ",
    [LanguageType.En]: "EN",
    [LanguageType.Ru]: "RU",
  };

  const form = useForm<IProductForm>({
    resolver: joiResolver(createProductSchema),
    defaultValues: initialValues || {
      name: {
        uz: undefined,
        en: undefined,
        ru: undefined,
      },
      description: {
        uz: undefined,
        en: undefined,
        ru: undefined,
      },
      price: 0,
      compare_at_price: null,
      images: [],
      categories: [],
      variants: [],
      status: ProductStatus.ACTIVE,
    },
  });

  console.log(form.formState.errors);

  const handleSubmit = (data: IProductForm) => {
    const cleanData = {
      ...data,
      name: {
        uz: data.name.uz,
        ...(data.name.en && { en: data.name.en }),
        ...(data.name.ru && { ru: data.name.ru }),
      },
      ...(data.description && {
        description: {
          ...(data.description.uz && { uz: data.description.uz }),
          ...(data.description.en && { en: data.description.en }),
          ...(data.description.ru && { ru: data.description.ru }),
        },
      }),
      ...(data.compare_at_price && { compare_at_price: data.compare_at_price }),
      ...(data.images?.length && { images: data.images }),
      ...(data.categories?.length && { categories: data.categories }),
      ...(data.variants?.length && { variants: data.variants }),
    };

    onSubmit(cleanData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 overflow-y-scroll px-2 py-4 "
      >
        <Tabs
          value={activeLanguage}
          className="w-full"
          onValueChange={(value) => setActiveLanguage(value as LanguageType)}
        >
          <TabsList className="w-full">
            {availableLanguages.map((langType) => (
              <TabsTrigger key={langType} value={langType}>
                {languageLabels[langType]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <ProductFormBasicInformation
          form={form}
          activeLanguage={activeLanguage}
        />

        <ProductFormPricingInformation form={form} />

        <ProductFormImages form={form} />

        <ProductFormCategories form={form} />

        <ProductFormVariants form={form} />

        <ProductFormSettings form={form} />

        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading
              ? "Saving..."
              : initialValues
              ? "Update Product"
              : "Create Product"}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset Form
          </Button>
        </div>
      </form>
    </Form>
  );
};
