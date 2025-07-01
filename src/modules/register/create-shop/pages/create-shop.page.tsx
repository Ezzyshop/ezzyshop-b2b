import { getCurrenciesQueryFn } from "@/api/queries";
import { Button } from "@/components/ui/button";
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
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { AddressForm } from "../components/address-form";

export const CreateShopPage = () => {
  const { form, handleSubmitForm, isPending } = useRegisterShopContext();
  const navigate = useNavigate();
  const currency = useQuery({
    queryKey: ["currency"],
    queryFn: () => getCurrenciesQueryFn(),
  });

  if (
    !form.getValues("telegram.token") ||
    !form.getValues("telegram.menu_text")
  ) {
    return <Navigate to="/register/create-telegram" />;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Kompaniya yaratish</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Kompaniya yaratish uchun ma'lumotlarni kiriting
      </p>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleSubmitForm)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Kompaniyangiz nomi</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Kompaniya nomini kiriting" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kompaniyangiz haqida</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder="Kompaniya haqida kiriting"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Valyuta</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Valyuta tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {currency?.data?.data?.map((currency) => (
                        <SelectItem key={currency._id} value={currency._id}>
                          {currency.symbol}{" "}
                          <span className=" text-muted-foreground">
                            ({currency.name})
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AddressForm form={form} />

          <div className="flex flex-col md:flex-row justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => navigate("/register/create-telegram")}
            >
              Orqaga
            </Button>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isPending}
            >
              Kompaniya yaratish
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateShopPage;
