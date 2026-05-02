import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlanFeatures } from "@/hooks/use-plan-features";

interface IProps {
  featureKey: string;
  children: ReactNode;
}

export const PlanFeatureGuard = ({ featureKey, children }: IProps) => {
  const { data: features, isLoading } = usePlanFeatures();

  // Don't block during initial load — show content optimistically
  if (isLoading) return <>{children}</>;

  const isEnabled = features?.[featureKey]?.enabled ?? false;

  if (isEnabled) return <>{children}</>;

  return (
    <div className="relative min-h-[60vh] overflow-hidden rounded-lg">
      {/* Blurred background — children rendered but non-interactive */}
      <div
        className="blur-md pointer-events-none select-none opacity-40"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Upgrade overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-background/90 backdrop-blur-sm border rounded-2xl p-8 text-center space-y-4 max-w-sm shadow-lg">
          <div className="flex justify-center">
            <div className="rounded-full bg-muted p-4">
              <LockIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold">Ta'qiqlangan</h3>
            <p className="text-sm text-muted-foreground">
              Bu sahifaga kirish uchun tarifingizni yangilang.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link to="/dashboard/plans">Tarifni yangilash</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
