import { getTelegramQueryFn } from "@/api/queries";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BotTemplateSettings } from "../components/bot-settings/bot-template-settings";
import { Button } from "@/components/ui/button";

const TelegramTemplatesPage = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["telegram", shop._id],
    queryFn: () => getTelegramQueryFn(shop._id),
    enabled: Boolean(shop._id),
  });

  if (isLoading) {
    return <LayoutLoader />;
  }

  if (!data?._id) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-muted-foreground">
          {t("dashboard.telegram.no-bot-setup")}
        </p>
        <Button asChild variant="outline">
          <Link to="/dashboard/telegram/setup">
            {t("dashboard.telegram.go-to-setup")}
          </Link>
        </Button>
      </div>
    );
  }

  return <BotTemplateSettings botId={data._id} />;
};

export default TelegramTemplatesPage;
