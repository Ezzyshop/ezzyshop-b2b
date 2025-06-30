import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BotIcon, Building, PencilIcon } from "lucide-react";
import { PropsWithChildren, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

const registerSteps = [
  {
    path: "/register/create-shop",
    title: "Biznes qo'shish",
    icon: <Building className="w-4 h-4 " />,
    progress: 0,
  },
  {
    path: "/register/create-bot",
    title: "Bot qo'shish",
    icon: <BotIcon className="w-4 h-4 " />,
    progress: 50,
  },
  {
    path: "/register/edit-shop",
    title: "Biznesni tahrirlash",
    icon: <PencilIcon className="w-4 h-4 " />,
    progress: 100,
  },
];

export const RegisterLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const activeStepIndex = useMemo(
    () =>
      registerSteps.findIndex((step) => location.pathname.includes(step.path)),
    [location]
  );

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Card className="max-w-3xl w-full rounded-lg  p-4">
        <CardHeader>
          <div className="flex justify-between items-center gap-2 relative">
            <Progress
              value={registerSteps[activeStepIndex].progress}
              className="w-full absolute left-0 top-1/2 -translate-y-1/2 h-px"
            />
            {registerSteps.map((step, index) => {
              const isActive = index <= activeStepIndex;
              return (
                <div
                  key={step.path}
                  className="relative bg-background rounded-full"
                >
                  <NavLink
                    to={step.path}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-full p-3 border transition-all duration-300 text-muted-foreground bg-card",
                      isActive && "text-primary border-primary bg-primary/10 ",
                      index === activeStepIndex && "scale-105",
                      "relative"
                    )}
                  >
                    {step.icon}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
