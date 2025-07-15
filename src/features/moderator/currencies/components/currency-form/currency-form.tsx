import { useForm } from "react-hook-form";
import { ICreateCurrencyForm } from "../../utils/currency.interface";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button/button";
import { joiResolver } from "@hookform/resolvers/joi";
import { createCurrencyValidator } from "../../utils/currency.validator";
import { CurrencyStatus } from "../../utils/currency.enum";

interface IProps {
  initialData?: ICreateCurrencyForm;
  onSubmit: (data: ICreateCurrencyForm) => void;
  isLoading: boolean;
}

export const CurrencyForm = ({ initialData, onSubmit, isLoading }: IProps) => {
  const form = useForm<ICreateCurrencyForm>({
    defaultValues: initialData || {
      name: "",
      symbol: "",
      status: CurrencyStatus.Active,
    },
    resolver: joiResolver(createCurrencyValidator),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Nomi</FormLabel>
              <FormControl>
                <Input placeholder="Valyuta nomini kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Simvoli</FormLabel>
              <FormControl>
                <Input placeholder="Valyuta simvolini kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Holati</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Holatni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CurrencyStatus.Active}>Aktiv</SelectItem>
                    <SelectItem value={CurrencyStatus.Inactive}>
                      Inaktiv
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </form>
    </Form>
  );
};
