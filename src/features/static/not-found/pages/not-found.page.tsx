import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDefaultPage } from "@/lib/get-default-page";
import { UserRoles } from "@/lib/enums";

interface IProps {
  isDashboard?: boolean;
}
export default function NotFoundPage({ isDashboard = false }: IProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "flex items-center h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16",
        isDashboard && "h-full"
      )}
    >
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
            404
          </h1>
          <p className="text-gray-500">{t("common.not_found")}</p>
        </div>
        {!isDashboard && (
          <Button
            className="cursor-pointer"
            onClick={() => navigate(getDefaultPage([UserRoles.Staff]))}
          >
            {t("common.back_to_site")}
          </Button>
        )}
      </div>
    </div>
  );
}
