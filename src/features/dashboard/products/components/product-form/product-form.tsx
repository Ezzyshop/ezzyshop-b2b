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
import { useTranslation } from "react-i18next";
import { LanguageSelectTab } from "@/components/form/language-select-tab";

interface IProps {
  onSubmit: (data: IProductForm) => void;
  isLoading: boolean;
  initialValues?: IProductForm;
}

export const ProductForm = ({ onSubmit, isLoading, initialValues }: IProps) => {
  const { shop } = useShopContext();
  const { t } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState<LanguageType>(
    shop.languages.find((lang) => lang.is_main)?.type || LanguageType.Uz
  );

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
        <LanguageSelectTab
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
        />

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
            {t("common.save")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            {t("common.form_reset")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
