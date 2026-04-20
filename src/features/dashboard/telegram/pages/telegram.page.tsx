import { getTelegramQueryFn } from "@/api/queries";
import { LayoutLoader } from "@/components/loaders/global-loader";

import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { TelegramForm } from "../components/telegram-form";
import { useMemo } from "react";
import TelegramSettingsPage from "../components/bot-settings/telegram-settings";

export const TelegramPage = () => {
  const { shop } = useShopContext();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["telegram", shop._id],
    queryFn: () => getTelegramQueryFn(shop._id),
    enabled: Boolean(shop._id),
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
    <div className="space-y-4">
      <TelegramForm
        initialValues={initialValues}
        telegramId={data?._id}
        refetch={refetch}
      />

      <TelegramSettingsPage />
    </div>
  );
};

export default TelegramPage;
