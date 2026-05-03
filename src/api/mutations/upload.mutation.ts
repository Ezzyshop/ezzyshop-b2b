import { api } from "../axios";

export type UploadType = "product" | "category" | "cheque" | "logo";
export type AiUploadType = "product" | "category";

export const uploadImageMutationFn = (formData: FormData) =>
  api
    .post("/upload/single", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const uploadShopImageMutationFn = (
  shopId: string,
  type: UploadType,
  formData: FormData,
) => {
  formData.set("type", type);
  return api
    .post(`/shops/${shopId}/upload/single`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const uploadShopVideoMutationFn = (
  shopId: string,
  formData: FormData,
) => {
  return api
    .post(`/shops/${shopId}/upload/video`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const generateAiImageMutationFn = (
  shopId: string,
  payload: { prompt: string; imageUrl: string; type: AiUploadType },
) =>
  api
    .post<{ data: { url: string; filename: string; format: string } }>(
      `/shops/${shopId}/upload/ai-generate`,
      payload,
    )
    .then((res) => res.data);

export const deleteAiImageMutationFn = (shopId: string, imageId: string) =>
  api
    .delete(`/shops/${shopId}/upload/ai-images/${imageId}`)
    .then((res) => res.data);
