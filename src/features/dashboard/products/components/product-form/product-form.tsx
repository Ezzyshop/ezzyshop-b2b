import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form } from "@/components/ui/form/form";
import { Button } from "@/components/ui/button/button";
import { ProductFormBasicInformation } from "./product-form-sections/basic-information";
import { IProductForm } from "../../utils/product.interface";
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
import { ImageUploadSingle } from "@/components/ui/image-upload";

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

        <ImageUploadSingle
          value={form.watch("main_image")}
          onChange={(value) => form.setValue("main_image", value)}
          title={t("dashboard.products.main_image")}
          description={t("dashboard.products.main_image_description")}
          error={form.formState.errors.main_image?.message}
        />

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
