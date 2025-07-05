import { useForm } from "react-hook-form";
import { IPlanForm } from "../../utils/plan.interface";
import { joiResolver } from "@hookform/resolvers/joi";
import { createPlanValidator } from "../../utils/plan.validator";
import { PlanStatus } from "../../utils/plan.enum";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IProps {
  initialValues?: IPlanForm;
  onSubmit: (data: IPlanForm) => void;
  isLoading: boolean;
}

export const PlanForm = ({ onSubmit, initialValues, isLoading }: IProps) => {
  const form = useForm<IPlanForm>({
    resolver: joiResolver(createPlanValidator),
    defaultValues: initialValues ?? {
      name: "",
      description: "",
      price: 0,
      products: { max: 0 },
      categories: { max: 0 },
      orders: { max: 0 },
      order: 0,
      status: PlanStatus.Inactive,
    },
  });

  const handleSubmit = (data: IPlanForm) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Nomi</FormLabel>
                <FormControl>
                  <Input placeholder="Tarif nomini kiriting" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Narxi</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Tartib raqami</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Tavsifi</FormLabel>
              <FormControl>
                <textarea
                  className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  placeholder="Tarif tavsifini kiriting"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Limitlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="products.max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Maximal productlar</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories.max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Maximal kategoriyalar</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="orders.max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Maximal buyurtmalar</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Holati</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Tarif holatini tanlang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={PlanStatus.Active}>Faol</SelectItem>
                  <SelectItem value={PlanStatus.Inactive}>Faol emas</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer"
          >
            {isLoading ? "Saqlanyapti" : "Saqlash"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
