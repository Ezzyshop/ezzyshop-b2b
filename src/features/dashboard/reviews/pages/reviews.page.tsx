import { getShopReviewsQueryFn } from "@/api/queries";
import { getProductsQueryFn } from "@/api/queries/products.query";
import { DataTable } from "@/components/data-table/data-table";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { reviewTableColumns } from "../components/review-table/review-table-columns";
import { LanguageType } from "@/features/moderator/shops/utils";
import { useQueryParams } from "@/hooks";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { IProduct } from "../../products/utils/product.interface";
import { useState } from "react";

export function ReviewsPage() {
  const { t, i18n } = useTranslation();
  const { shop } = useShopContext();
  const lang = i18n.language as LanguageType;
  const { getQueryParams, setQueryParams } = useQueryParams();

  const [productSearch, setProductSearch] = useState("");

  const params = getQueryParams();

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", shop._id, params],
    queryFn: () => getShopReviewsQueryFn(shop._id, params),
    enabled: Boolean(shop._id),
  });

  const { data: productsData } = useQuery({
    queryKey: ["products-list", shop._id],
    queryFn: () => getProductsQueryFn(shop._id, { limit: 200 }),
    enabled: Boolean(shop._id),
  });

  const products: IProduct[] = productsData?.data ?? [];
  const filteredProducts = productSearch
    ? products.filter((p) =>
        (p.name[lang] ?? p.name.uz ?? "")
          .toLowerCase()
          .includes(productSearch.toLowerCase()),
      )
    : products;

  const handleProductFilter = (productId: string) => {
    const current = getQueryParams();
    if (productId === "all") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { "product._id": _p, page: _pg, ...rest } = current;
      setQueryParams(rest);
    } else {
      setQueryParams({ ...current, "product._id": productId, page: 1 });
    }
  };

  const handleSortRating = () => {
    const current = getQueryParams();
    if (current.sortBy !== "rating") {
      setQueryParams({ ...current, sortBy: "rating", sortOrder: "desc", page: 1 });
    } else if (current.sortOrder === "desc") {
      setQueryParams({ ...current, sortBy: "rating", sortOrder: "asc", page: 1 });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sortBy: _sb, sortOrder: _so, page: _pg, ...rest } = current;
      setQueryParams(rest);
    }
  };

  const ratingSort = params.sortBy === "rating" ? (params.sortOrder as string) : "";
  const RatingSortIcon = ratingSort === "desc" ? ArrowDown : ratingSort === "asc" ? ArrowUp : ArrowUpDown;

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl font-bold">{t("reviews.title")}</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Product filter */}
        <Select
          value={(params["product._id"] as string) ?? "all"}
          onValueChange={handleProductFilter}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder={t("reviews.filter_by_product")} />
          </SelectTrigger>
          <SelectContent>
            <div className="px-2 pb-2">
              <Input
                placeholder={t("reviews.search_product")}
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <SelectItem value="all">{t("reviews.all_products")}</SelectItem>
            {filteredProducts.map((p) => (
              <SelectItem key={p._id} value={p._id}>
                <div className="flex items-center gap-2">
                  {p.main_image && (
                    <img src={p.main_image} alt="" className="w-5 h-5 rounded object-cover" />
                  )}
                  <span className="truncate max-w-44">
                    {p.name[lang] ?? p.name.uz}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort by rating */}
        <button
          onClick={handleSortRating}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm transition-colors ${
            ratingSort ? "border-primary text-primary bg-primary/5" : "border-input hover:border-primary/50"
          }`}
        >
          <RatingSortIcon className="w-4 h-4" />
          {t("reviews.sort_by_rating")}
        </button>
      </div>

      <DataTable
        columns={reviewTableColumns(
          shop._id,
          lang,
          t,
          params.sortBy as string,
          params.sortOrder as string,
          handleSortRating,
        )}
        data={data?.data || []}
        isLoading={isLoading}
        paginationInfo={data?.paginationInfo}
      />
    </div>
  );
}

export default ReviewsPage;
