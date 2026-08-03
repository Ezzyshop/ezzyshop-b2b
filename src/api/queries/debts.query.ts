import { api } from "../axios";
import { ICourierDebtEntry } from "@/features/dashboard/debts/utils/debt.interface";

export const getCourierDebtsQueryFn = async (
  shopId: string
): Promise<{ data: ICourierDebtEntry[] }> => {
  const response = await api.get(`/courier-debts/${shopId}`);
  return response.data;
};
