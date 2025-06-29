import { useForm } from "react-hook-form";
import { IShopForm, shopUpdatePlanSchema } from "../../utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { IPlan } from "@/modules/dashboard/plans/utils/plan.interface";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";

interface IProps {
  initialValue: { plan: IShopForm["plan"] };
  onSubmit: (data: { plan: IShopForm["plan"] }) => void;
  plans: IPlan[];
  isLoading: boolean;
}

export const ShopPlanForm = ({
  initialValue,
  onSubmit,
  isLoading,
  plans,
}: IProps) => {
  const form = useForm<{ plan: IShopForm["plan"] }>({
    resolver: joiResolver(shopUpdatePlanSchema),
    defaultValues: initialValue,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Tariff</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tariffni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan._id} value={plan._id}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
