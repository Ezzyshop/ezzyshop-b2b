import { useForm } from "react-hook-form";
import { IShopForm, shopUpdatePlanSchema } from "../../utils";
import { joiResolver } from "@hookform/resolvers/joi";
import { IPlan } from "@/features/moderator/plans/utils/plan.interface";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button/button";
import {
  PlansType,
  plansTypeTranslations,
} from "@/features/dashboard/plans/utils/plans.enum";

interface IProps {
  initialValue: { plan: IShopForm["plan"]; type: PlansType };
  onSubmit: (data: { plan: IShopForm["plan"]; type: PlansType }) => void;
  plans: IPlan[];
  isLoading: boolean;
}

export const ShopPlanForm = ({
  initialValue,
  onSubmit,
  isLoading,
  plans,
}: IProps) => {
  const form = useForm<{ plan: IShopForm["plan"]; type: PlansType }>({
    resolver: joiResolver(shopUpdatePlanSchema),
    defaultValues: initialValue,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Tarif turi</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tarif turini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(PlansType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {plansTypeTranslations[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
