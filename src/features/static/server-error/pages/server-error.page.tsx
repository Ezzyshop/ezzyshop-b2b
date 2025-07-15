import { Button } from "@/components/ui/button/button";
import { dashboardSidebarData } from "@/lib";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ServerErrorPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
            500
          </h1>
          <p className="text-gray-500">{t("common.server_error")}</p>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => navigate(dashboardSidebarData[0].url)}
        >
          {t("common.back_to_site")}
        </Button>
      </div>
    </div>
  );
}
