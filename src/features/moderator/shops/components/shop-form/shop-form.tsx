import { useForm } from "react-hook-form";
import {
  IShopForm,
  shopCreateSchema,
  BusinessType,
  ShopPlatform,
  ShopStatus,
} from "../../utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form } from "@/components/ui/form/form";
import { Button } from "@/components/ui/button/button";
import { ShopFormBasicInformation } from "./shop-form-sections/basic-information";
import { ShopFormAddress } from "./shop-form-sections/address";
import { ShopFormSocialLinks } from "./shop-form-sections/social-links";
import { cn } from "@/lib";

interface IProps {
  initialValue?: IShopForm;
  onSubmit: (data: IShopForm) => void;
  isLoading?: boolean;
}

export const ShopForm = ({ initialValue, onSubmit, isLoading }: IProps) => {
  const form = useForm({
    defaultValues: initialValue || {
      name: undefined,
      business_type: BusinessType.OnlineStore,
      platform: ShopPlatform.Telegram,
      logo: undefined,
      status: ShopStatus.Active,
      description: undefined,
      social_links: {
        telegram: undefined,
        instagram: undefined,
        facebook: undefined,
        twitter: undefined,
        youtube: undefined,
      },
      currency: "",
      address: {
        address: undefined,
        long: undefined,
        lat: undefined,
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
        <ShopFormBasicInformation form={form} isEdit={!!initialValue} />

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
