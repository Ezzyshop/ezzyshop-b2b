import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IBranch } from "../utils/branches.interface";
import { useTranslation } from "react-i18next";
import { StatusChangeSwitch } from "@/components/moderator/forms/change-status-switch";
import { EditBranch } from "./branch-form/edit-branch";

interface IProps {
  branch: IBranch;
}

export const BranchCard = ({ branch }: IProps) => {
  const { i18n, t } = useTranslation();
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>
          {branch.name[i18n.language as keyof typeof branch.name]}
        </CardTitle>
        <div className="flex items-center gap-2">
          <StatusChangeSwitch
            status={branch.status}
            url={`/branches/${branch.shop._id}/${branch._id}/status`}
            invalidateQueryKey={["branches"]}
          />
          <EditBranch branch={branch} />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground text-sm">
            {t("dashboard.branches.pickup_enabled")}:
          </p>
          <p className="text-sm">
            {branch.pickup_enabled ? t("common.yes") : t("common.no")}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground text-sm">
            {t("dashboard.branches.delivery_enabled")}:
          </p>
          <p className="text-sm">
            {branch.delivery_enabled ? t("common.yes") : t("common.no")}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground text-sm">
            {t("dashboard.branches.address")}:
          </p>
          <p className="text-sm">{branch.address.address}</p>
        </div>
      </CardContent>
    </Card>
  );
};
