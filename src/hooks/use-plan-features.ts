import { useQuery } from "@tanstack/react-query";
import { useShopContext } from "@/contexts";
import { getPlanFeaturesQueryFn } from "@/api/queries/dashboard-stats.query";

export type PlanFeaturesMap = Record<string, { enabled: boolean; limit: number }>;

export const usePlanFeatures = () => {
  const { shop } = useShopContext();

  return useQuery<PlanFeaturesMap>({
    queryKey: ["plan-features", shop._id],
    queryFn: () => getPlanFeaturesQueryFn(shop._id),
    staleTime: 5 * 60 * 1000,
    enabled: !!shop._id,
  });
};

/** Returns true when the feature is enabled on the shop's current plan. */
export const useIsFeatureEnabled = (featureKey: string): boolean => {
  const { data } = usePlanFeatures();
  return data?.[featureKey]?.enabled ?? false;
};
