import { useCallback, useRef } from "react";
import { CardContent } from "./card";
import { useMutation } from "@tanstack/react-query";
import { uploadImageMutationFn } from "@/api/mutations/upload.mutation";
import { Button } from "./button";
import { Loader2, PlusIcon, UploadIcon, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ISingleImageUploadProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export const ImageUploadSingle = ({
  onChange,
  value,
}: ISingleImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageMutationFn,

    onSuccess: (data) => {
      onChange(data.data.url);
    },
  });

  const handleOpenFilePicker = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    uploadImageMutation.mutate(formData);
    e.target.value = "";
  };

  const renderImages = useCallback(() => {
    if (!value || value.length === 0) {
      return (
        <div
          onClick={handleOpenFilePicker}
          className="flex flex-col gap-2 items-center justify-center min-h-[200px] w-full"
        >
          <UploadIcon />
          <div>
            <p className="text-sm text-center">{t("common.upload_image")}</p>
            <p className="text-xs text-muted-foreground">
              {t("common.upload_image_description")}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className=" group max-h-[200px]">
        <img src={value} alt="Image" className="object-fit w-full max-h-[200px]" />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => onChange("")}
          type="button"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }, [value, onChange, t]);

  return (
    <CardContent className="border border-dashed rounded-xl w-full cursor-pointer min-h-[240px] flex p-4 justify-center items-center relative">
      {renderImages()}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/jpeg, image/jpg, image/png, image/gif, image/webp, image/svg"
      />
    </CardContent>
  );
};

interface IMultipleImageUploadProps {
  value: string[] | undefined;
  onChange: (value: string[] | undefined) => void;
}

export const MultipleImageUpload = ({
  onChange,
  value,
}: IMultipleImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageMutationFn,

    onSuccess: (data) => {
      onChange([...(value ?? []), data.data.url]);
    },
  });

  const handleOpenFilePicker = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    uploadImageMutation.mutate(formData);
    e.target.value = "";
  };

  const handleRemoveImage = useCallback(
    (index: number) => {
      onChange(value?.filter((_, i) => i !== index));
    },
    [onChange, value]
  );

  const renderImages = useCallback(() => {
    if (!value || value.length === 0) {
      return (
        <div
          onClick={handleOpenFilePicker}
          className="flex flex-col gap-2 items-center justify-center min-h-[200px] w-full"
        >
          <UploadIcon />
          <div>
            <p className="text-sm text-center">{t("common.upload_image")}</p>
            <p className="text-xs text-muted-foreground">
              {t("common.upload_image_description")}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {value.map((image, index) => (
          <div key={index} className="relative w-[96px] h-[96px] ">
            <img
              src={image}
              alt="Image"
              width={96}
              height={96}
              className="rounded object-cover w-[96px] h-[96px]"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-0 right-0 w-6 h-6"
              onClick={() => handleRemoveImage(index)}
              type="button"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {uploadImageMutation.isPending ? (
          <div className="flex w-[96px] h-[96px] border border-dashed rounded items-center flex-col justify-center">
            <Loader2 className="w-4 h-4 animate-spin " />
          </div>
        ) : (
          <div
            onClick={handleOpenFilePicker}
            className="flex w-[96px] h-[96px] border border-dashed rounded items-center flex-col justify-center"
          >
            <PlusIcon className="w-4 h-4" />
            <p className="text-xs">{t("common.upload_image")}</p>
          </div>
        )}
      </div>
    );
  }, [value, handleRemoveImage, t, uploadImageMutation.isPending]);

  return (
    <CardContent className="border border-dashed p-4 rounded-xl w-full cursor-pointer min-h-[240px]">
      {renderImages()}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </CardContent>
  );
};
