import { useCallback, useEffect, useRef, useState } from "react";
import { CardContent } from "./card";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  uploadImageMutationFn,
  uploadShopImageMutationFn,
  uploadShopVideoMutationFn,
  generateAiImageMutationFn,
  UploadType,
  AiUploadType,
} from "@/api/mutations/upload.mutation";
import { getAiImagesQueryFn } from "@/api/queries/ai-images.query";
import { Button } from "./button";
import { Loader2, PlusIcon, UploadIcon, VideoIcon, X, Sparkles, CheckCircle, FolderOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib";
import { Checkbox } from "./checkbox";
import { Progress } from "./progress";
import { Textarea } from "./textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

interface ISingleImageUploadProps {
  value: string | undefined;
  onChange: (value: string | null) => void;
  title?: string;
  description?: string;
  error?: string;
  shopId?: string;
  type?: UploadType;
  enableAI?: boolean;
}

export const ImageUploadSingle = ({
  onChange,
  value,
  title,
  description,
  error,
  shopId,
  type,
  enableAI,
}: ISingleImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const [useAi, setUseAi] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const uploadImageMutation = useMutation({
    mutationFn: (formData: FormData) =>
      shopId && type
        ? uploadShopImageMutationFn(shopId, type, formData)
        : uploadImageMutationFn(formData),
    onSuccess: (data) => {
      onChange(data.data.url);
    },
  });

  const aiGenerateMutation = useMutation({
    mutationFn: () =>
      generateAiImageMutationFn(shopId!, {
        prompt,
        imageUrl: value!,
        type: type as AiUploadType,
      }),
    onSuccess: (data) => {
      stopProgress(100);
      setPreviewUrl(data.data.url);
    },
    onError: () => {
      stopProgress(0);
    },
  });

  const startProgress = () => {
    setProgress(0);
    // Animate to ~90% over ~20s; final 100% set on success
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressTimerRef.current!);
          return 90;
        }
        return prev + 1;
      });
    }, 220);
  };

  const stopProgress = (final: number) => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setProgress(final);
  };

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  const handleGenerate = () => {
    if (!prompt.trim() || !shopId || !type) return;
    setPreviewUrl(null);
    startProgress();
    aiGenerateMutation.mutate();
  };

  const handleUseGeneratedImage = () => {
    if (!previewUrl) return;
    onChange(previewUrl);
    setPreviewUrl(null);
    setPrompt("");
    setUseAi(false);
  };

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

  const { data: aiImagesData } = useQuery({
    queryKey: ["ai-images", shopId, type],
    queryFn: () => getAiImagesQueryFn(shopId!, { limit: 50, type: type as AiUploadType }),
    enabled: !!shopId && !!type && enableAI,
  });

  const aiImages = aiImagesData?.data ?? [];

  const renderAiPanel = () => (
    <div className="flex flex-col gap-3 w-full">
      <Textarea
        placeholder={t("common.ai_image_prompt_placeholder")}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        className="resize-none text-sm"
        disabled={aiGenerateMutation.isPending}
      />

      {aiGenerateMutation.isPending && (
        <div className="flex flex-col gap-1">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {t("common.ai_image_generating")} {progress}%
          </p>
        </div>
      )}

      {previewUrl && !aiGenerateMutation.isPending && (
        <div className="relative group">
          <img
            src={previewUrl}
            alt="AI edited"
            className="w-full max-h-[200px] object-contain rounded-lg border"
          />
          <Button
            type="button"
            size="sm"
            className="w-full mt-2 gap-2"
            onClick={handleUseGeneratedImage}
          >
            <CheckCircle className="w-4 h-4" />
            {t("common.ai_image_use")}
          </Button>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          className="flex-1 gap-2"
          onClick={handleGenerate}
          disabled={!prompt.trim() || aiGenerateMutation.isPending}
        >
          {aiGenerateMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {aiGenerateMutation.isPending
            ? t("common.ai_image_generating_button")
            : previewUrl
              ? t("common.ai_image_regenerate")
              : t("common.ai_image_generate")}
        </Button>
      </div>

      {aiGenerateMutation.isError && (
        <p className="text-xs text-destructive text-center">
          {t("common.ai_image_error")}
        </p>
      )}
    </div>
  );

  const renderMyFiles = () => {
    if (aiImages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[160px] gap-2 text-center">
          <FolderOpen className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t("common.my_files_empty")}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-4 gap-2 max-h-[260px] overflow-y-auto pr-1">
        {aiImages.map((img) => (
          <button
            key={img._id}
            type="button"
            onClick={() => onChange(img.url)}
            className={cn(
              "relative aspect-square rounded-lg border-2 overflow-hidden transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring",
              value === img.url ? "border-primary" : "border-transparent",
            )}
          >
            <img
              src={img.url}
              alt={img.prompt}
              className="w-full h-full object-cover"
            />
            {value === img.url && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderUploadArea = useCallback(() => {
    if (!value || value.length === 0) {
      return (
        <div
          onClick={handleOpenFilePicker}
          className="flex flex-col gap-2 items-center justify-center min-h-[160px] w-full"
        >
          <UploadIcon className={cn(error && "text-destructive")} />
          <div>
            <p
              className={cn("text-sm text-center", error && "text-destructive")}
            >
              {title || t("common.upload_image")}
            </p>
            <p
              className={cn(
                "text-xs text-muted-foreground",
                error && "text-destructive"
              )}
            >
              {description || t("common.upload_image_description")}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="group max-h-[200px]">
        <img
          src={value}
          alt="Image"
          className="object-fit w-full max-h-[200px]"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => {
            onChange(null);
            setUseAi(false);
            setPreviewUrl(null);
            setPrompt("");
          }}
          type="button"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }, [value, onChange, t, error, title, description]);

  if (enableAI && shopId && type) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="upload" className="flex-1 gap-1.5">
              <UploadIcon className="w-3.5 h-3.5" />
              {t("common.tab_upload")}
            </TabsTrigger>
            <TabsTrigger value="my-files" className="flex-1 gap-1.5">
              <FolderOpen className="w-3.5 h-3.5" />
              {t("common.tab_my_files")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <div className={cn("flex items-center gap-2 mb-2", !value && "opacity-50")}>
              <Checkbox
                id="use-ai"
                checked={useAi}
                disabled={!value}
                onCheckedChange={(checked) => {
                  setUseAi(!!checked);
                  setPreviewUrl(null);
                  setPrompt("");
                  stopProgress(0);
                }}
              />
              <label
                htmlFor="use-ai"
                className={cn(
                  "flex items-center gap-1.5 text-sm select-none",
                  value ? "cursor-pointer" : "cursor-not-allowed",
                )}
              >
                <Sparkles className="w-4 h-4 text-violet-500" />
                {t("common.ai_image_use_ai")}
              </label>
            </div>

            <CardContent
              className={cn(
                "border border-dashed rounded-xl w-full min-h-[240px] flex p-4 justify-center items-center relative",
                !useAi && "cursor-pointer",
                error && "border-destructive",
              )}
              onClick={!useAi && !value ? handleOpenFilePicker : undefined}
            >
              {uploadImageMutation.isPending ? (
                <div className="flex flex-col gap-2 items-center justify-center min-h-[160px]">
                  <Loader2 className="animate-spin" />
                  <p className="text-sm text-muted-foreground">{t("common.uploading")}</p>
                </div>
              ) : useAi ? (
                renderAiPanel()
              ) : (
                renderUploadArea()
              )}
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/jpeg, image/jpg, image/png, image/gif, image/webp, image/svg"
              />
            </CardContent>
          </TabsContent>

          <TabsContent value="my-files">
            <CardContent className="border border-dashed rounded-xl w-full min-h-[240px] p-4">
              {renderMyFiles()}
            </CardContent>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <CardContent
        className={cn(
          "border border-dashed rounded-xl w-full min-h-[240px] flex p-4 justify-center items-center relative cursor-pointer",
          error && "border-destructive",
        )}
        onClick={!value ? handleOpenFilePicker : undefined}
      >
        {uploadImageMutation.isPending ? (
          <div className="flex flex-col gap-2 items-center justify-center min-h-[160px]">
            <Loader2 className="animate-spin" />
            <p className="text-sm text-muted-foreground">{t("common.uploading")}</p>
          </div>
        ) : (
          renderUploadArea()
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/jpeg, image/jpg, image/png, image/gif, image/webp, image/svg"
        />
      </CardContent>
    </div>
  );
};

interface IMultipleImageUploadProps {
  value: string[] | undefined;
  onChange: (value: string[] | undefined) => void;
  shopId?: string;
  type?: UploadType;
}

export const MultipleImageUpload = ({
  onChange,
  value,
  shopId,
  type,
}: IMultipleImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const uploadImageMutation = useMutation({
    mutationFn: (formData: FormData) =>
      shopId && type
        ? uploadShopImageMutationFn(shopId, type, formData)
        : uploadImageMutationFn(formData),
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
      <div className="grid grid-cols-7 gap-20">
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

interface IVideoUploadProps {
  value: string | undefined;
  onChange: (value: string | null) => void;
  shopId: string;
  error?: string;
}

export const VideoUpload = ({ value, onChange, shopId, error }: IVideoUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const uploadVideoMutation = useMutation({
    mutationFn: (formData: FormData) => uploadShopVideoMutationFn(shopId, formData),
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

    if (file.size > 10 * 1024 * 1024) {
      alert(t("dashboard.products.video_size_limit"));
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    uploadVideoMutation.mutate(formData);
    e.target.value = "";
  };

  const renderContent = useCallback(() => {
    if (uploadVideoMutation.isPending) {
      return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-[200px] w-full">
          <Loader2 className="animate-spin" />
          <p className="text-sm text-muted-foreground">{t("common.uploading")}</p>
        </div>
      );
    }

    if (!value) {
      return (
        <div
          onClick={handleOpenFilePicker}
          className="flex flex-col gap-2 items-center justify-center min-h-[200px] w-full"
        >
          <VideoIcon className={cn(error && "text-destructive")} />
          <div>
            <p className={cn("text-sm text-center", error && "text-destructive")}>
              {t("dashboard.products.upload_video")}
            </p>
            <p className={cn("text-xs text-muted-foreground", error && "text-destructive")}>
              {t("dashboard.products.upload_video_description")}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative group max-h-[200px] flex items-center justify-center">
        <video
          src={value}
          controls
          className="max-h-[200px] w-full rounded"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => onChange(null)}
          type="button"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }, [value, uploadVideoMutation.isPending, error, t]);

  return (
    <CardContent
      className={cn(
        "border border-dashed rounded-xl w-full cursor-pointer min-h-[240px] flex p-4 justify-center items-center relative",
        error && "border-destructive"
      )}
    >
      {renderContent()}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/mpeg"
        onChange={handleFileChange}
      />
    </CardContent>
  );
};
