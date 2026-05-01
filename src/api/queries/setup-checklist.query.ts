import { api } from "../axios";

export interface ISetupChecklist {
  telegram: boolean;
  categories: boolean;
  products: boolean;
  deliveryMethods: boolean;
  paymentMethods: boolean;
}

export const getSetupChecklistQueryFn = (shopId: string): Promise<ISetupChecklist> =>
  api.get(`/setup-checklist/${shopId}`).then((res) => res.data.data);
