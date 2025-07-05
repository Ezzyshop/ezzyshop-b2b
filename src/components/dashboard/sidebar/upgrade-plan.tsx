import { getPlansQueryFn } from "@/api/queries";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const UpgradePlan = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans", shop?._id],
    queryFn: () => getPlansQueryFn({ order: shop.plan.order + 1 }),
    enabled: Boolean(shop?.plan.order),
  });

  if (isLoading || !plans?.data.length) {
    return null;
  }

  return (
    <Card className="p-4 bg-muted gap-2">
      <h2 className="text-lg font-semibold">
        {t("sidebar.dashboard.upgrade_plan.title", {
          plan: plans.data[0].name,
        })}
      </h2>
      <p className="text-sm">
        {t("sidebar.dashboard.upgrade_plan.description", {
          plan: plans.data[0].name,
        })}
      </p>
      <Button>{t("sidebar.dashboard.upgrade_plan.button_text")}</Button>
    </Card>
  );
};
