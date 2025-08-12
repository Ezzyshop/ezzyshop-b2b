import { api } from "@/api/axios";
import { IResponse } from "@/api/utils/axios.interface";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { ErrorResponse } from "react-router-dom";
import { toast } from "sonner";

export interface IFileData {
  url: string;
  size: number;
  filename: string;
  mime_type: string;
}

export interface IUploadFile {
  file: File;
  url: string;
  name?: string;
  fileName?: string;
  fileMaxSize?: number;
  onError?: (err: AxiosError<ErrorResponse>) => void;
  onSuccess: (data: IFileData) => void;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  setUploadProgress?: Dispatch<SetStateAction<number>>;
}

export const uploadFile = async ({
  url,
  file,
  onError,
  onSuccess,
  name = "File",
  setIsUploading,
  fileMaxSize = 5,
  setUploadProgress,
  fileName = "file",
}: IUploadFile): Promise<IResponse<IFileData> | void> => {
  const fileSizeMB = file.size / (1024 * 1024);

  if (fileSizeMB > fileMaxSize) {
    toast.error(`${name} size exceeds ${fileMaxSize} MB`);
    return;
  }

  const toastId = toast.loading(`${name} jo'natilmoqda...`);
  setIsUploading(true);

  try {
    const formData = new FormData();
    formData.append(fileName, file);

    const { data } = await api.post<IResponse<IFileData>>(url, formData, {
      onUploadProgress: ({ total, loaded }) => {
        const progress = Math.round((loaded * 100) / (total ?? 0));
        if (setUploadProgress) setUploadProgress(progress);

        toast.info(`${name} jo'natilmoqda: ${progress}%`, {
          id: toastId,
        });
      },
    });

    onSuccess(data?.data);

    toast.success(`${name} muvaffaqiyatli jo'natildi!`, {
      id: toastId,
    });

    return data;
  } catch (err) {
    const axiosError = err as AxiosError<ErrorResponse>;

    toast.error(`${name} jo'natishda xatolik bor: ${axiosError?.message}`, {
      id: toastId,
    });

    if (onError) onError(axiosError);
  } finally {
    setIsUploading(false);
  }
};
