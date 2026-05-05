import { updateProductVariantMutationFn, IVariantPatch } from "@/api/mutations";
import { IPaginatedResponse } from "@/api/utils/axios.interface";
import { IProduct } from "@/features/dashboard/products/utils/product.interface";
import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query";

interface IUpdateVariantArgs {
  productId: string;
  variantId: string;
  patch: IVariantPatch;
}

export const useUpdateVariant = (shopId: string, queryKey: readonly unknown[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, variantId, patch }: IUpdateVariantArgs) =>
      updateProductVariantMutationFn(shopId, productId, variantId, patch),

    onMutate: async ({ productId, variantId, patch }) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<InfiniteData<IPaginatedResponse<IProduct>>>(queryKey);

      queryClient.setQueryData<InfiniteData<IPaginatedResponse<IProduct>>>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((product) => {
              if (product._id !== productId) return product;
              return {
                ...product,
                variants: product.variants?.map((variant) => {
                  if (variant._id !== variantId) return variant;
                  const next = { ...variant };
                  if (patch.price !== undefined) next.price = patch.price;
                  if (patch.quantity !== undefined) next.quantity = patch.quantity;
                  if (patch.compare_at_price === null) {
                    delete next.compare_at_price;
                  } else if (patch.compare_at_price !== undefined) {
                    next.compare_at_price = patch.compare_at_price;
                  }
                  return next;
                }),
              };
            }),
          })),
        };
      });

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
  });
};
