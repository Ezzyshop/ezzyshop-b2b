import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Sparkles, Trash2, Loader2, Expand, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IAiImage } from "@/api/queries/ai-images.query";
import { deleteAiImageMutationFn } from "@/api/mutations/upload.mutation";
import { useShopContext } from "@/contexts";
import { AiImageEditDialog } from "./ai-image-edit-dialog";

interface Props {
  image: IAiImage;
}

export const AiImageCard = ({ image }: Props) => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(image.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteAiImageMutationFn(shop._id, image._id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ai-images", shop._id] }),
  });

  return (
    <>
      <div className="group relative flex flex-col rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
        {/* Image area — click opens lightbox */}
        <div
          className="relative aspect-square overflow-hidden bg-muted cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={image.url}
            alt={image.prompt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Expand hint on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Expand className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
          </div>
          <div className="absolute top-2 left-2">
            <Badge
              variant={image.type === "product" ? "default" : "secondary"}
              className="text-xs"
            >
              {t(`dashboard.ai_images.type_${image.type}`)}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-3">
          <div className="flex items-start gap-1">
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
              {image.prompt}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Copy prompt"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            {new Date(image.createdAt).toLocaleDateString()}
          </p>

          <div className="flex gap-2 mt-1">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="flex-1 gap-1.5 text-xs"
              onClick={() => setEditOpen(true)}
            >
              <Sparkles className="w-3 h-3 text-violet-500" />
              {t("dashboard.ai_images.edit")}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs text-destructive hover:text-destructive"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="sm:max-w-[95vw] max-h-[95vh] w-full p-0 border-0 bg-black/95 gap-0 overflow-hidden">
          <div className="flex flex-col items-center">
            <img
              src={image.url}
              alt={image.prompt}
              className="max-h-[80vh] max-w-[95vw] object-contain"
            />
            <div className="w-full px-6 py-4 flex items-start gap-3">
              <Badge
                variant={image.type === "product" ? "default" : "secondary"}
                className="shrink-0 mt-0.5"
              >
                {t(`dashboard.ai_images.type_${image.type}`)}
              </Badge>
              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-sm text-white/90 leading-relaxed">
                  {image.prompt}
                </p>
                <p className="text-xs text-white/50">
                  {new Date(image.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AiImageEditDialog
        image={image}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
};
