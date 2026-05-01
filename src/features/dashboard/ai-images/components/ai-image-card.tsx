import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Sparkles, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge";
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

  const deleteMutation = useMutation({
    mutationFn: () => deleteAiImageMutationFn(shop._id, image._id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ai-images", shop._id] }),
  });

  return (
    <>
      <div className="group relative flex flex-col rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image.url}
            alt={image.prompt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge variant={image.type === "product" ? "default" : "secondary"} className="text-xs">
              {t(`dashboard.ai_images.type_${image.type}`)}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-3">
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {image.prompt}
          </p>
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

      <AiImageEditDialog
        image={image}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
};
