import { getTelegramQueryFn } from "@/api/queries";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BroadcastForm } from "../components/bot-settings/broadcast-form";
import { Button } from "@/components/ui/button";
import { useIsFeatureEnabled } from "@/hooks/use-plan-features";

const TelegramSendMessagePage = () => {
  const { shop } = useShopContext();
  const { t } = useTranslation();
  const isEnabled = useIsFeatureEnabled("telegram_send_message");

  const { data, isLoading } = useQuery({
    queryKey: ["telegram", shop._id],
    queryFn: () => getTelegramQueryFn(shop._id),
    enabled: Boolean(shop._id) && isEnabled,
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

  return <BroadcastForm botId={data._id} />;
};

export default TelegramSendMessagePage;
