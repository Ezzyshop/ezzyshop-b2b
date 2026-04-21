import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getBotTemplateQueryFn } from "@/api/queries";
import { LayoutLoader } from "@/components/loaders/global-loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BotTemplateForm } from "./bot-template-form";

interface IProps {
  botId: string;
}

export const BotTemplateSettings = ({ botId }: IProps) => {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["bot-template", botId],
    queryFn: () => getBotTemplateQueryFn(botId),
    enabled: Boolean(botId),
  });

  if (isLoading) {
    return <LayoutLoader />;
  }

  const initialValues = {
    welcomeMessage: data?.welcomeMessage ?? "",
    botDescription: data?.botDescription ?? "",
    buttonText: data?.buttonText ?? "",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.telegram-settings.title")}</CardTitle>
        <CardDescription>
          {t("dashboard.telegram-settings.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BotTemplateForm botId={botId} initialValues={initialValues} />
      </CardContent>
    </Card>
  );
};
