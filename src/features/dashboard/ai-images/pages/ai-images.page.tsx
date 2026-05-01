import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ImageIcon, Loader2, Sparkles } from "lucide-react";
import { useShopContext } from "@/contexts";
import { getAiImagesQueryFn } from "@/api/queries/ai-images.query";
import { AiImageCard } from "../components/ai-image-card";
import { GenerateAiImageModal } from "../components/generate-ai-image-modal";
import { Button } from "@/components/ui/button/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AiImagesPage() {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const [typeFilter, setTypeFilter] = useState<"all" | "product" | "category">("all");
  const [page, setPage] = useState(1);
  const [generateOpen, setGenerateOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["ai-images", shop._id, typeFilter, page],
    queryFn: () =>
      getAiImagesQueryFn(shop._id, {
        page,
        limit: 20,
        ...(typeFilter !== "all" && { type: typeFilter }),
      }),
  });

  const images = data?.data ?? [];
  const totalPages = data?.paginationInfo.totalPages ?? 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("dashboard.ai_images.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboard.ai_images.description")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="gap-2"
            onClick={() => setGenerateOpen(true)}
          >
            <Sparkles className="w-4 h-4" />
            {t("dashboard.ai_images.generate_button")}
          </Button>

          <Select
            value={typeFilter}
            onValueChange={(v) => {
              setTypeFilter(v as typeof typeFilter);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("dashboard.ai_images.filter_all")}</SelectItem>
              <SelectItem value="product">{t("dashboard.ai_images.type_product")}</SelectItem>
              <SelectItem value="category">{t("dashboard.ai_images.type_category")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{t("dashboard.ai_images.empty_title")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("dashboard.ai_images.empty_description")}
            </p>
          </div>
          <Button className="gap-2" onClick={() => setGenerateOpen(true)}>
            <Sparkles className="w-4 h-4" />
            {t("dashboard.ai_images.generate_button")}
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img) => (
              <AiImageCard key={img._id} image={img} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                {t("common.previous")}
              </Button>
              <span className="text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                {t("common.next")}
              </Button>
            </div>
          )}
        </>
      )}

      <GenerateAiImageModal
        open={generateOpen}
        onOpenChange={setGenerateOpen}
      />
    </div>
  );
}
