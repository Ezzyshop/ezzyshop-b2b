import HtmlTranslation from "@/components/ui/html-translation";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CreateTelegramInstruction = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-muted text-muted-foreground text-sm p-4 pl-12 rounded-md relative w-full">
      <Info className="absolute top-4 left-4" />
      <p className="font-bold"> {t("register.create_telegram.tips")}</p>
      <p className="grid grid-cols-1">
        <span>
          1. <HtmlTranslation translationKey="register.create_telegram.tip_1" />
        </span>
        <span>
          2. <HtmlTranslation translationKey="register.create_telegram.tip_2" />
        </span>
        <span>
          3. <HtmlTranslation translationKey="register.create_telegram.tip_3" />
        </span>
        <span>
          4. <HtmlTranslation translationKey="register.create_telegram.tip_4" />
        </span>

        <span>
          6. <HtmlTranslation translationKey="register.create_telegram.tip_5" />
        </span>
      </p>
    </div>
  );
};
