import { useTranslation } from "react-i18next";
import { PlansType } from "../utils/plans.enum";
import { Switch } from "@/components/ui/switch";

interface IProps {
  type: PlansType;
  setType: (type: PlansType) => void;
}

export const PlanTypeSwitch = ({ type, setType }: IProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm">{t("dashboard.plans.type.monthly")}</p>
      <Switch
        checked={type === PlansType.Annual}
        onCheckedChange={(e) =>
          setType(e ? PlansType.Annual : PlansType.Monthly)
        }
      />
      <p className="text-sm">{t("dashboard.plans.type.annual")}</p>
    </div>
  );
};
