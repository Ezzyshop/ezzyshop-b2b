import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Loader2, Sparkles, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { generateAiImageMutationFn } from "@/api/mutations/upload.mutation";
import { IAiImage } from "@/api/queries/ai-images.query";
import { useShopContext } from "@/contexts";

interface Props {
  image: IAiImage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AiImageEditDialog = ({ image, open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();

  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!open) {
      setPrompt("");
      setPreviewUrl(null);
      setProgress(0);
    }
  }, [open]);

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

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const editMutation = useMutation({
    mutationFn: () =>
      generateAiImageMutationFn(shop._id, {
        prompt,
        imageUrl: image!.url,
        type: image!.type,
      }),
    onMutate: startProgress,
    onSuccess: (data) => {
      stopProgress(100);
      setPreviewUrl(data.data.url);
      queryClient.invalidateQueries({ queryKey: ["ai-images", shop._id] });
    },
    onError: () => stopProgress(0),
  });

  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            {t("dashboard.ai_images.edit_dialog_title")}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {/* Original */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {t("dashboard.ai_images.original")}
            </p>
            <img
              src={image.url}
              alt="original"
              className="w-full aspect-square object-cover rounded-lg border"
            />
            <p className="text-xs text-muted-foreground line-clamp-2">{image.prompt}</p>
          </div>

          {/* Result */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {t("dashboard.ai_images.result")}
            </p>
            <div className="w-full aspect-square rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
              {editMutation.isPending && (
                <div className="flex flex-col items-center gap-2 p-4 w-full">
                  <Progress value={progress} className="h-2 w-full" />
                  <p className="text-xs text-muted-foreground">{progress}%</p>
                </div>
              )}
              {previewUrl && !editMutation.isPending && (
                <img
                  src={previewUrl}
                  alt="result"
                  className="w-full h-full object-cover"
                />
              )}
              {!editMutation.isPending && !previewUrl && (
                <p className="text-xs text-muted-foreground text-center px-4">
                  {t("dashboard.ai_images.result_placeholder")}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Textarea
            placeholder={t("common.ai_image_prompt_placeholder")}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="resize-none text-sm"
            disabled={editMutation.isPending}
          />

          {editMutation.isError && (
            <p className="text-xs text-destructive">{t("common.ai_image_error")}</p>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={editMutation.isPending}
            >
              {t("common.close")}
            </Button>
            {previewUrl && (
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => {
                  setPreviewUrl(null);
                  setProgress(0);
                }}
                disabled={editMutation.isPending}
              >
                {t("common.ai_image_regenerate")}
              </Button>
            )}
            <Button
              type="button"
              className="gap-2"
              onClick={() => editMutation.mutate()}
              disabled={!prompt.trim() || editMutation.isPending}
            >
              {editMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : previewUrl ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {editMutation.isPending
                ? t("common.ai_image_generating_button")
                : previewUrl
                  ? t("dashboard.ai_images.edit_again")
                  : t("common.ai_image_generate")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
