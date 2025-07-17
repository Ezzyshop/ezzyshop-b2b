import { api } from "../axios";

export const uploadImageMutationFn = (formData: FormData) =>
  api.post("/upload/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);
