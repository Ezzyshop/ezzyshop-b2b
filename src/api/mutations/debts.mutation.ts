import { api } from "../axios";

export const payCourierDebtMutationFn = async (
  shopId: string,
  courierId: string,
  amount: number,
  note?: string
): Promise<{ data: { balance: number; total_paid: number; amount_paid: number } }> => {
  const response = await api.post(`/courier-debts/${shopId}/${courierId}/pay`, {
    amount,
    note,
  });
  return response.data;
};
