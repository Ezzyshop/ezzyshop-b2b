import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPlan } from "@/features/moderator/plans/utils/plan.interface";
import { useTranslation } from "react-i18next";
import { PlansType } from "../utils/plans.enum";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { useShopContext } from "@/contexts";
import { Badge } from "@/components/ui/badge/badge";

interface IProps {
  plan: IPlan;
  type: PlansType;
}

export const PlanCard = ({ plan, type }: IProps) => {
  const { t, i18n } = useTranslation();
  const { shop } = useShopContext();
  const isCurrentPlan =
    shop.plan._id === plan._id && shop.subscription_info.plan_type === type;
  const gapBetweenPricesInPercent =
    100 - (plan.annual_price / plan.price) * 100;

  const isProductsLimitInfinity = true;
  const isCategoriesLimitInfinity = true;
  const isOrdersLimitInfinity = true;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="md:text-2xl font-semibold">{plan.name}</span>
          {plan.price > 0 && type === PlansType.Annual && (
            <Badge variant="default">-{gapBetweenPricesInPercent}%</Badge>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {plan.description[i18n.language as keyof typeof plan.description]}
        </p>
      </CardHeader>
      <CardContent className="flex-grow">
        <PlanCardPrice plan={plan} type={type} />
        <div className="mt-4 space-y-2">
          <PlanCardAdvantages
            title={t("dashboard.plans.advantages.telegram_bot")}
          />
          <PlanCardAdvantages
            title={
              isProductsLimitInfinity
                ? t("dashboard.plans.advantages.product_count_infinity")
                : t("dashboard.plans.advantages.product_count", {
                    count: 10,
                  })
            }
          />
          <PlanCardAdvantages
            title={
              isCategoriesLimitInfinity
                ? t("dashboard.plans.advantages.category_count_infinity")
                : t("dashboard.plans.advantages.category_count", {
                    count: 20,
                  })
            }
          />
          <PlanCardAdvantages
            title={
              isOrdersLimitInfinity
                ? t("dashboard.plans.advantages.order_count_infinity")
                : t("dashboard.plans.advantages.order_count", {
                    count: 30,
                  })
            }
          />
        </div>
      </CardContent>
      <CardFooter>
        {isCurrentPlan ? (
          <Button variant="outline" className="w-full cursor-pointer">
            {t("dashboard.plans.current_plan")}
          </Button>
        ) : (
          <Button className="w-full cursor-pointer">
            {t("dashboard.plans.buy")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export const PlanCardAdvantages = ({ title }: { title: string }) => {
  return (
    <div className="flex items-start gap-2">
      <CheckIcon className="w-4 h-4 text-primary" />
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};

export const PlanCardPrice = ({ plan, type }: IProps) => {
  const { t } = useTranslation();

  const isFree = plan.price === 0;
  const price =
    type === PlansType.Annual
      ? plan.annual_price.toLocaleString()
      : plan.price.toLocaleString();
  return (
    <div>
      {isFree ? (
        <span className="text-2xl font-bold">{t("dashboard.plans.free")}</span>
      ) : (
        <>
          <span className="text-2xl font-bold">{price} UZS</span>
          <span className="text-sm text-muted-foreground">
            {" "}
            / {t("dashboard.plans.type.monthly")}
          </span>
        </>
      )}
    </div>
  );
};
