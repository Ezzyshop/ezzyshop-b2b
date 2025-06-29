import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrencyQueryFn } from "@/api/queries";
import { ICreateCurrencyForm } from "../utils/currency.interface";
import { toast } from "sonner";
import { CurrencyForm } from "../components/currency-form/currency-form";
import { useMemo } from "react";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { updateCurrencyMutationFn } from "@/api/mutations/currencies.mutation";

export const CurrencyEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["currency", id],
    queryFn: () => getCurrencyQueryFn(id!),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ICreateCurrencyForm) =>
      updateCurrencyMutationFn(id!, data),
    onSuccess: () => {
      toast.success("Valyuta muvaffaqiyatli o'zgartirildi");
      navigate("/dashboard/currencies");
      queryClient.invalidateQueries({ queryKey: ["currency", id] });
    },
  });

  const handleSubmit = (data: ICreateCurrencyForm) => {
    mutate(data);
  };

  const initialValues: ICreateCurrencyForm = useMemo(() => {
    if (!data?.data) return {} as ICreateCurrencyForm;
    return {
      name: data.data.name,
      symbol: data.data.symbol,
      status: data.data.status,
    };
  }, [data?.data]);

  if (isLoading) return <LayoutLoader />;

  return (
    <CurrencyForm
      initialData={initialValues}
      onSubmit={handleSubmit}
      isLoading={isPending}
    />
  );
};

export default CurrencyEditPage;
