import { useForm } from "react-hook-form";
import {
  IShopForm,
  shopCreateSchema,
  BusinessType,
  ShopPlatform,
} from "../../utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ShopFormBasicInformation } from "./shop-form-sections/basic-information";
import { ShopFormTelegramConfiguration } from "./shop-form-sections/telegram-configuration";
import { ShopFormAddress } from "./shop-form-sections/address";
import { ShopFormSocialLinks } from "./shop-form-sections/social-links copy";

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
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="space-y-8 "
      >
        <ShopFormBasicInformation form={form} />

        <ShopFormTelegramConfiguration form={form} />

        <ShopFormSocialLinks form={form} />

        <ShopFormAddress form={form} />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Shop..." : "Create Shop"}
        </Button>
      </form>
    </Form>
  );
};
