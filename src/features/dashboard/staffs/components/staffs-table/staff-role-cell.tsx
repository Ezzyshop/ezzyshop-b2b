import { Badge } from "@/components/ui/badge";
import { useShopContext } from "@/contexts";
import { IUser } from "@/lib";

export const StaffRoleCell = ({ staff }: { staff: IUser }) => {
  const { shop } = useShopContext();
  const shopEntry = staff.shops?.find(
    (s) => (s.shop as unknown as string) === shop._id,
  );

  if (!shopEntry) return <span className="text-muted-foreground">—</span>;

  if (shopEntry.isAdmin) {
    return <Badge variant="default">Admin</Badge>;
  }

  if (shopEntry.customRole) {
    return <Badge variant="secondary">{shopEntry.customRole.name}</Badge>;
  }

  return <span className="text-muted-foreground">—</span>;
};
