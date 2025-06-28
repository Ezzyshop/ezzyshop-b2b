import { useForm } from "react-hook-form";
import {
  IShopForm,
  shopCreateSchema,
  BusinessType,
  ShopPlatform,
  ShopStatus,
} from "../../utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ShopFormBasicInformation } from "./shop-form-sections/basic-information";
import { ShopFormTelegramConfiguration } from "./shop-form-sections/telegram-configuration";
import { ShopFormAddress } from "./shop-form-sections/address";
import { ShopFormSocialLinks } from "./shop-form-sections/social-links copy";
import { cn } from "@/lib";

interface IProps {
  initialValue?: IShopForm;
  onSubmit: (data: IShopForm) => void;
  isLoading?: boolean;
}

export const ShopForm = ({ initialValue, onSubmit, isLoading }: IProps) => {
  const form = useForm({
    defaultValues: initialValue || {
      name: "",
      business_type: BusinessType.OnlineStore,
      platform: ShopPlatform.Telegram,
      plan: "",
      logo: null,
      status: ShopStatus.Active,
      description: null,
      telegram: {
        token: null,
        menu_text: null,
        menu_url: null,
      },
      social_links: {
        telegram: null,
        instagram: null,
        facebook: null,
        twitter: null,
        youtube: null,
      },
      currency: "",
      address: {
        address: null,
        long: null,
        lat: null,
      },
    },
    resolver: joiResolver(shopCreateSchema),
  });

  const onSubmitHandler = (data: IShopForm) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="space-y-8 "
      >
        <ShopFormBasicInformation form={form} isEdit={!!initialValue} />

        <ShopFormTelegramConfiguration form={form} />

        <ShopFormSocialLinks form={form} />

        <ShopFormAddress form={form} />

        <div
          className={cn(
            "grid",
            initialValue ? "grid-cols-2 gap-4" : "grid-cols-1"
          )}
        >
          {initialValue && (
            <Button
              type="button"
              className="w-full cursor-pointer"
              variant="outline"
              disabled={isLoading}
              onClick={() => form.reset()}
            >
              Formani tozalash
            </Button>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading || !form.formState.isDirty}
          >
            {initialValue ? "Biznesni tahrirlash" : "Biznes yaratish"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
