import {
  IShop,
  IShopComment,
  IShopForm,
  ShopPipelineStage,
  ShopPriority,
} from "@/features/moderator/shops/utils";
import { api } from "../axios";
import { IResponse } from "../utils/axios.interface";

export const createShopMutationFn = (data: IShopForm) => {
  return api.post("/shops", data);
};

export const updateShopMutationFn = (
  id: string,
  data: IShopForm
): Promise<IShop> => api.put(`/shops/${id}`, data).then((res) => res.data);

export const updateShopPlanMutationFn = (
  id: string,
  data: { plan: string }
): Promise<IShop> => api.put(`/shops/${id}/plan`, data).then((res) => res.data);

export const updateShopPipelineStageMutationFn = (
  id: string,
  pipeline_stage: ShopPipelineStage
): Promise<IResponse<IShop>> =>
  api
    .put(`/shops/${id}/pipeline-stage`, { pipeline_stage })
    .then((res) => res.data);

export const updateShopPriorityMutationFn = (
  id: string,
  priority: ShopPriority
): Promise<IResponse<IShop>> =>
  api.put(`/shops/${id}/priority`, { priority }).then((res) => res.data);

export const deleteShopMutationFn = (id: string) => {
  return api.delete(`/shops/${id}`);
};

export const createShopCommentMutationFn = (
  shopId: string,
  text: string
): Promise<IResponse<IShopComment>> =>
  api.post(`/shops/${shopId}/comments`, { text }).then((res) => res.data);

export const updateShopCommentMutationFn = (
  commentId: string,
  text: string
): Promise<IResponse<IShopComment>> =>
  api.put(`/shop-comments/${commentId}`, { text }).then((res) => res.data);

export const deleteShopCommentMutationFn = (
  commentId: string
): Promise<IResponse<{ _id: string }>> =>
  api.delete(`/shop-comments/${commentId}`).then((res) => res.data);
