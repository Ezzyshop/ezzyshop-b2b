import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ArrowRight, OctagonAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/contexts";
import { getSetupChecklistQueryFn } from "@/api/queries/setup-checklist.query";

export const SetupChecklist = () => {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const shopId = shop._id;

  const { data } = useQuery({
    queryKey: ["setup-checklist", shopId],
    queryFn: () => getSetupChecklistQueryFn(shopId),
    enabled: !!shopId && !shop.setup,
  });

  const steps = [
    {
      key: "bot",
      label: t("dashboard.setup.steps.bot"),
      href: "/dashboard/telegram/setup",
      completed: data?.telegram ?? false,
    },
    {
      key: "category",
      label: t("dashboard.setup.steps.category"),
      href: "/dashboard/categories",
      completed: data?.categories ?? false,
    },
    {
      key: "product",
      label: t("dashboard.setup.steps.product"),
      href: "/dashboard/products",
      completed: data?.products ?? false,
    },
    {
      key: "delivery",
      label: t("dashboard.setup.steps.delivery"),
      href: "/dashboard/delivery-methods",
      completed: data?.deliveryMethods ?? false,
    },
    {
      key: "payment",
      label: t("dashboard.setup.steps.payment"),
      href: "/dashboard/payment-methods",
      completed: data?.paymentMethods ?? false,
    },
  ];

  if (shop.setup) return null;

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = (completedCount / steps.length) * 100;
  const allDone = completedCount === steps.length;

  if (allDone) return null;

  return (
    <Card className="py-6 shadow-none ">
      <CardHeader className="pb-3 px-6">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          {t("dashboard.setup.title")} <OctagonAlert />
        </CardTitle>
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {t("dashboard.setup.progress", {
                completed: completedCount,
                total: steps.length,
              })}
            </span>
            <span className="font-medium text-foreground">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-4">
        <ul className="space-y-1">
          {steps.map((step) => (
            <li
              key={step.key}
              className="flex items-center justify-between gap-3 rounded-lg px-3 py-1 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
                <span
                  className={
                    step.completed
                      ? "text-sm text-muted-foreground line-through"
                      : "text-sm font-medium"
                  }
                >
                  {step.label}
                </span>
              </div>
              {!step.completed && (
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="h-7 shrink-0 gap-1 px-2 text-xs"
                >
                  <Link to={step.href}>
                    {t("dashboard.setup.go_to")}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
