import { Button } from "@/components/ui/button/button";
import { BellIcon } from "lucide-react";

export const Notification = () => {
  return (
    <Button variant="outline" size="icon" className="cursor-pointer">
      <BellIcon className="w-4 h-4" />
    </Button>
  );
};
