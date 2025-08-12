import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export const BranchEmptyState = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="mb-6 flex flex-col items-center max-w-md w-full">
        <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
          <MapPin className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {t("dashboard.branches.empty_state.title")}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed text-center">
          {t("dashboard.branches.empty_state.description")}
        </p>
      </div>
    </div>
  );
};
