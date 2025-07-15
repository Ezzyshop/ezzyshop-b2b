import { Form } from "@/components/ui/form/form";
import { ShopFormTelegramConfiguration } from "../shop-form/shop-form-sections/telegram-configuration";
import { Button } from "@/components/ui/button/button";
import { IShopTelegramForm, telegramSchema } from "../../utils";
import { useForm } from "react-hook-form";
import { cn } from "@/lib";
import { joiResolver } from "@hookform/resolvers/joi";

interface IProps {
  initialValues: IShopTelegramForm;
  onSubmit: (data: IShopTelegramForm) => void;
  isLoading: boolean;
}

export const ShopTelegramForm = ({
  initialValues,
  onSubmit,
  isLoading,
}: IProps) => {
  const form = useForm<IShopTelegramForm>({
    resolver: joiResolver(telegramSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ShopFormTelegramConfiguration form={form} />

        <div className={cn("grid mt-3 grid-cols-2 gap-4")}>
          <Button
            type="button"
            className="w-full cursor-pointer"
            variant="outline"
            disabled={isLoading}
            onClick={() => form.reset()}
          >
            Formani tozalash
          </Button>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading || !form.formState.isDirty}
          >
            Sozlamalarni saqlash
          </Button>
        </div>
      </form>
    </Form>
  );
};
