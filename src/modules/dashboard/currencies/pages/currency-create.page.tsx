import { createCurrencyMutationFn } from "@/api/mutations/currencies.mutation";
import { useMutation } from "@tanstack/react-query";
import { ICreateCurrencyForm } from "../utils/currency.interface";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CurrencyForm } from "../components/currency-form/currency-form";

export const CurrencyCreatePage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ICreateCurrencyForm) => createCurrencyMutationFn(data),
    onSuccess: () => {
      toast.success("Valyuta muvaffaqiyatli yaratildi");
      navigate("/dashboard/currencies");
    },
  });

  const handleSubmit = (data: ICreateCurrencyForm) => {
    mutate(data);
  };

  return <CurrencyForm onSubmit={handleSubmit} isLoading={isPending} />;
};

export default CurrencyCreatePage;
