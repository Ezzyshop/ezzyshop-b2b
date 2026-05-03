import { getTelegramQueryFn } from "@/api/queries";
import { LayoutLoader } from "@/components/loaders/global-loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { TelegramForm } from "../components/telegram-form";
import { useMemo } from "react";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";

const TelegramSetupPage = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();
  const isEnabled = useIsFeatureEnabled("telegram_setup");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["telegram", shop._id],
    queryFn: () => getTelegramQueryFn(shop._id),
    enabled: Boolean(shop._id) && isEnabled,
  });

  const initialValues = useMemo(() => {
    if (data) {
      return {
        menu_text: data.menu_text,
        token: data.token,
        business_type: data.business_type,
      };
    }
  }, [data]);

  if (isLoading) {
    return <LayoutLoader />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.telegram.title")}</CardTitle>
        <CardDescription>{t("dashboard.telegram.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <TelegramForm
          initialValues={initialValues}
          telegramId={data?._id}
          refetch={refetch}
        />
      </CardContent>
    </Card>
  );
};

export default TelegramSetupPage;
