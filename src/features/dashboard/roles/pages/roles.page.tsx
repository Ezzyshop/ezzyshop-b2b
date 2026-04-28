import { DataTable } from "@/components/data-table/data-table";
import { useShopContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getRolesQueryFn } from "@/api/queries";
import { rolesTableColumns } from "../components/roles-table/roles-table-columns";
import { AddRole } from "../components/role-form/add-role";
import { usePermissionContext } from "@/contexts/permission-context/permission.context";

export function RolesPage() {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const { hasPermission, isAdmin } = usePermissionContext();

  const canCreate = isAdmin || hasPermission("roles", "create");
  const canEdit = isAdmin || hasPermission("roles", "update");
  const canDelete = isAdmin || hasPermission("roles", "delete");

  const { data, isLoading } = useQuery({
    queryKey: ["roles", shop._id],
    queryFn: () => getRolesQueryFn(shop._id),
    enabled: Boolean(shop._id),
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("sidebar.dashboard.roles")}</h1>
        {canCreate && <AddRole />}
      </div>
      <DataTable
        columns={rolesTableColumns({ canEdit, canDelete })}
        data={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
}

export default RolesPage;
