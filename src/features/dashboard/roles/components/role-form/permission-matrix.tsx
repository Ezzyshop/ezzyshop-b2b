import { Checkbox } from "@/components/ui/checkbox";
import { IRoleForm, PERMISSION_MATRIX, PermissionAction, PermissionResource } from "@/lib/types/permission.types";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  form: UseFormReturn<IRoleForm>;
}

export const PermissionMatrixField = ({ form }: IProps) => {
  const { t } = useTranslation();
  const permissions = form.watch("permissions") || [];

  const getActions = (resource: PermissionResource): PermissionAction[] => {
    return permissions.find((p) => p.resource === resource)?.actions || [];
  };

  const isChecked = (resource: PermissionResource, action: PermissionAction) =>
    getActions(resource).includes(action);

  const toggle = (resource: PermissionResource, action: PermissionAction) => {
    const current = permissions.find((p) => p.resource === resource);
    const currentActions = current?.actions || [];
    let newActions: PermissionAction[];

    if (currentActions.includes(action)) {
      newActions = currentActions.filter((a) => a !== action);
    } else {
      newActions = [...currentActions, action];
    }

    const newPermissions = permissions.filter((p) => p.resource !== resource);
    if (newActions.length > 0) {
      newPermissions.push({ resource, actions: newActions });
    }

    form.setValue("permissions", newPermissions, { shouldDirty: true });
  };

  const toggleAll = (resource: PermissionResource, actions: PermissionAction[]) => {
    const currentActions = getActions(resource);
    const allSelected = actions.every((a) => currentActions.includes(a));
    const newPermissions = permissions.filter((p) => p.resource !== resource);

    if (!allSelected) {
      newPermissions.push({ resource, actions });
    }

    form.setValue("permissions", newPermissions, { shouldDirty: true });
  };

  return (
    <div className="space-y-2">
      {PERMISSION_MATRIX.map(({ resource, label, actions }) => {
        const currentActions = getActions(resource);
        const allSelected = actions.every((a) => currentActions.includes(a));

        return (
          <div key={resource} className="grid grid-cols-[180px_1fr] items-center gap-4 py-2 border-b last:border-0">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={allSelected}
                onCheckedChange={() => toggleAll(resource, actions)}
                id={`all-${resource}`}
              />
              <label htmlFor={`all-${resource}`} className="text-sm font-medium cursor-pointer">
                {t(`dashboard.roles.resources.${resource}`, { defaultValue: label })}
              </label>
            </div>
            <div className="flex flex-wrap gap-4">
              {actions.map((action) => (
                <div key={action} className="flex items-center gap-1.5">
                  <Checkbox
                    checked={isChecked(resource, action)}
                    onCheckedChange={() => toggle(resource, action)}
                    id={`${resource}-${action}`}
                  />
                  <label htmlFor={`${resource}-${action}`} className="text-sm capitalize cursor-pointer text-muted-foreground">
                    {t(`dashboard.roles.actions.${action}`, { defaultValue: action })}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
