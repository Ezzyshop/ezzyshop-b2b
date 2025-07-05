import { Loader2 } from "lucide-react";

export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 z-50">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
};

export const LayoutLoader = () => {
  return (
    <div className="flex items-center h-screen justify-center bg-background/50 z-50">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
};

export const DashboardLayoutLoader = () => {
  return (
    <div className="flex items-center h-full flex-grow justify-center bg-background/50 z-50">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
};

export const LoaderWithOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/70 z-50">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
};
