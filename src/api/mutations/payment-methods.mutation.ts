import {
  IClickConfig,
  IClickTelegramConfig,
  IPaymeConfig,
  IPaymentMethod,
  TPaymentMethodForm,
} from "@/features/dashboard/payment-methods/utils/payment-methods.interface";
import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export const createPaymentMethodMutationFn = async (
  shopId: string,
  data: TPaymentMethodForm
): Promise<IResponse<IPaymentMethod>> =>
  await api.post(`/payment-methods/${shopId}`, data).then((res) => res.data);

export const updatePaymentMethodMutationFn = async (
  shopId: string,
  paymentMethodId: string,
  data: TPaymentMethodForm
): Promise<IResponse<IPaymentMethod>> =>
  await api
    .put(`/payment-methods/${shopId}/${paymentMethodId}`, data)
    .then((res) => res.data);

export const deletePaymentMethodMutationFn = async (
  shopId: string,
  paymentMethodId: string
): Promise<IResponse<IPaymentMethod>> =>
  await api
    .delete(`/payment-methods/${shopId}/${paymentMethodId}`)
    .then((res) => res.data);

export const updateClickConfigMutationFn = async (
  shopId: string,
  paymentMethodId: string,
  data: IClickConfig
): Promise<IResponse<IPaymentMethod>> =>
  await api
    .put(`/payment-methods/${shopId}/${paymentMethodId}/click-config`, {
      click_config: data,
    })
    .then((res) => res.data);

export const updateClickTelegramConfigMutationFn = async (
  shopId: string,
  paymentMethodId: string,
  data: IClickTelegramConfig
): Promise<IResponse<IPaymentMethod>> =>
  await api
    .put(
      `/payment-methods/${shopId}/${paymentMethodId}/click-telegram-config`,
      { click_telegram_config: data }
    )
    .then((res) => res.data);

export const updatePaymeConfigMutationFn = async (
  shopId: string,
  paymentMethodId: string,
  data: IPaymeConfig
): Promise<IResponse<IPaymentMethod>> =>
  await api
    .put(`/payment-methods/${shopId}/${paymentMethodId}/payme-config`, {
      payme_config: data,
    })
    .then((res) => res.data);
