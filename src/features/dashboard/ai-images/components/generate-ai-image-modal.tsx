import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Loader2,
  Sparkles,
  UploadIcon,
  X,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  uploadShopImageMutationFn,
  generateAiImageMutationFn,
  AiUploadType,
} from "@/api/mutations/upload.mutation";
import { IAiImage } from "@/api/queries/ai-images.query";
import { useShopContext } from "@/contexts";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GenerateAiImageModal = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();

  const [type, setType] = useState<AiUploadType>("product");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<IAiImage[]>([]);
  const [activeResult, setActiveResult] = useState<IAiImage | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      setUploadedUrl(null);
      setLocalPreview(null);
      setPrompt("");
      setProgress(0);
      setResults([]);
      setActiveResult(null);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [open]);

  useEffect(
    () => () => { if (timerRef.current) clearInterval(timerRef.current); },
    [],
  );

  const startProgress = () => {
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) { clearInterval(timerRef.current!); return 90; }
        return p + 1;
      });
    }, 220);
  };

  const stopProgress = (final: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(final);
  };

  // Upload source image to R2
  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) =>
      uploadShopImageMutationFn(shop._id, type, formData),
    onSuccess: (data) => setUploadedUrl(data.data.url),
  });

  // Generate with AI
  const generateMutation = useMutation({
    mutationFn: () =>
      generateAiImageMutationFn(shop._id, {
        prompt,
        imageUrl: uploadedUrl!,
        type,
      }),
    onMutate: startProgress,
    onSuccess: (data) => {
      stopProgress(100);
      // Build a partial IAiImage for display; the real one is in DB
      const newResult: IAiImage = {
        _id: Date.now().toString(),
        shopId: shop._id,
        type,
        prompt,
        url: data.data.url,
        filename: data.data.filename,
        format: data.data.format,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setResults((prev) => [newResult, ...prev]);
      setActiveResult(newResult);
      queryClient.invalidateQueries({ queryKey: ["ai-images", shop._id] });
    },
    onError: () => stopProgress(0),
  });

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => setLocalPreview(e.target?.result as string);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);
      uploadMutation.mutate(formData);
    },
    [uploadMutation],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const handleRemoveSource = () => {
    setUploadedUrl(null);
    setLocalPreview(null);
    setResults([]);
    setActiveResult(null);
    setPrompt("");
  };

  const canGenerate =
    !!uploadedUrl && !!prompt.trim() && !generateMutation.isPending && !uploadMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            {t("dashboard.ai_images.generate_title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Type selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium shrink-0">
              {t("dashboard.ai_images.generate_type_label")}
            </span>
            <Select
              value={type}
              onValueChange={(v) => setType(v as AiUploadType)}
              disabled={!!uploadedUrl}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">{t("dashboard.ai_images.type_product")}</SelectItem>
                <SelectItem value="category">{t("dashboard.ai_images.type_category")}</SelectItem>
              </SelectContent>
            </Select>
            {uploadedUrl && (
              <span className="text-xs text-muted-foreground">
                {t("dashboard.ai_images.generate_type_locked")}
              </span>
            )}
          </div>

          {/* Main two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left: source image */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t("dashboard.ai_images.generate_source")}
              </p>

              {localPreview ? (
                <div className="relative group aspect-square rounded-xl border overflow-hidden bg-muted">
                  <img
                    src={localPreview}
                    alt="source"
                    className="w-full h-full object-cover"
                  />
                  {uploadMutation.isPending && (
                    <div className="absolute inset-0 bg-background/70 flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm">{t("common.uploading")}</span>
                    </div>
                  )}
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleRemoveSource}
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ) : (
                <div
                  ref={dropZoneRef}
                  onClick={() => inputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/60 hover:bg-muted/50 transition-colors"
                >
                  <UploadIcon className="w-8 h-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {t("dashboard.ai_images.generate_upload_title")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("dashboard.ai_images.generate_upload_description")}
                    </p>
                  </div>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleInputChange}
              />
            </div>

            {/* Right: result */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t("dashboard.ai_images.result")}
              </p>

              <div className="aspect-square rounded-xl border bg-muted flex items-center justify-center overflow-hidden">
                {generateMutation.isPending ? (
                  <div className="flex flex-col items-center gap-3 p-6 w-full">
                    <Progress value={progress} className="h-2 w-full" />
                    <p className="text-xs text-muted-foreground">
                      {t("common.ai_image_generating")} {progress}%
                    </p>
                  </div>
                ) : activeResult ? (
                  <img
                    src={activeResult.url}
                    alt="result"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-xs text-muted-foreground text-center px-6">
                    {t("dashboard.ai_images.result_placeholder")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Prompt + generate */}
          <div className="flex flex-col gap-3">
            <Textarea
              placeholder={t("common.ai_image_prompt_placeholder")}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="resize-none text-sm"
              disabled={generateMutation.isPending || !uploadedUrl}
            />

            {generateMutation.isError && (
              <p className="text-xs text-destructive">{t("common.ai_image_error")}</p>
            )}

            <Button
              type="button"
              className="gap-2 self-end"
              onClick={() => generateMutation.mutate()}
              disabled={!canGenerate}
            >
              {generateMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : activeResult ? (
                <RefreshCw className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {generateMutation.isPending
                ? t("common.ai_image_generating_button")
                : activeResult
                  ? t("common.ai_image_regenerate")
                  : t("dashboard.ai_images.generate_button")}
            </Button>
          </div>

          {/* Previous results in this session */}
          {results.length > 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t("dashboard.ai_images.generate_history")} ({results.length})
              </p>
              <div className="flex gap-2 flex-wrap">
                {results.map((r, i) => (
                  <button
                    key={r._id}
                    type="button"
                    onClick={() => setActiveResult(r)}
                    className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                      activeResult?._id === r._id
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={r.url} alt={`v${results.length - i}`} className="w-full h-full object-cover" />
                    <Badge
                      variant="secondary"
                      className="absolute bottom-0.5 right-0.5 text-[9px] px-1 h-4"
                    >
                      v{results.length - i}
                    </Badge>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.ai_images.generate_history_note")}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
