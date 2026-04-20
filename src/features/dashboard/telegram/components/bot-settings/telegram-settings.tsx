import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { getBotTemplateQueryFn } from "@/api/queries/bot-template.query";
import { TelegramSettingsForm } from "./telegram-settings-form";

const DEFAULT_BOT_ID = "otp_bot";

export const TelegramSettingsPage = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();

  const botId = shop.telegram?._id || DEFAULT_BOT_ID;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["bot-template", botId],
    queryFn: () => getBotTemplateQueryFn(botId),
    enabled: Boolean(botId),
  });

  const initialValues = useMemo(() => {
    if (data) {
      return {
        welcomeMessage: data.welcomeMessage,
        menuHintText: data.menuHintText,
        buttons: data.buttons,
      };
    }
    return {
      welcomeMessage: "",
      menuHintText: "",
      buttons: [],
    };
  }, [data]);

  if (isLoading) {
    return <LayoutLoader />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.telegram-settings.title")}</CardTitle>
        <CardDescription>
          {t("dashboard.telegram-settings.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TelegramSettingsForm
          initialValues={initialValues}
          botId={botId}
          refetch={refetch}
          isExisting={!!data}
        />
      </CardContent>
    </Card>
  );
};

export default TelegramSettingsPage;
