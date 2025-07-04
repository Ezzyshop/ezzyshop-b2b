import { LanguageSwitcher } from "@/components/dashboard/header/language-switcher";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BotIcon, Building, PartyPopper } from "lucide-react";
import { PropsWithChildren, useMemo, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const registerSteps = [
  {
    path: "/register/create-telegram",
    icon: <BotIcon className="w-4 h-4 " />,
    progress: 0,
  },
  {
    path: "/register/create-shop",
    icon: <Building className="w-4 h-4 " />,
    progress: 50,
  },
  {
    path: "/register/finish",
    icon: <PartyPopper className="w-4 h-4 " />,
    progress: 100,
  },
];

export const RegisterShopLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousStepIndex, setPreviousStepIndex] = useState(-1);

  const activeStepIndex = useMemo(
    () =>
      registerSteps.findIndex((step) => location.pathname.includes(step.path)),
    [location]
  );

  const isMovingForward = activeStepIndex > previousStepIndex;

  useEffect(() => {
    if (previousStepIndex !== -1 && previousStepIndex !== activeStepIndex) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
      return () => clearTimeout(timer);
    }
    setPreviousStepIndex(activeStepIndex);
  }, [activeStepIndex, previousStepIndex]);

  if (activeStepIndex === -1) {
    return <Navigate to={registerSteps[0].path} />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background px-5">
      <Card className="max-w-3xl w-full rounded-lg p-4">
        <CardHeader>
          <div className="flex justify-end">
            <LanguageSwitcher />
          </div>
          <div className="flex flex-grow justify-between items-center gap-2 relative">
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
                  <p
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-full p-3 border transition-all duration-300 text-muted-foreground bg-card",
                      isActive && "text-primary border-primary bg-primary/10 ",
                      index === activeStepIndex && "scale-105",
                      "relative"
                    )}
                  >
                    {step.icon}
                  </p>
                </div>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="relative px-2 overflow-scroll">
          <div
            key={location.pathname}
            className={cn(
              "max-h-[80vh]",
              "transition-all duration-100 ease-in-out",
              isTransitioning &&
                isMovingForward &&
                "translate-x-full opacity-0",
              isTransitioning &&
                !isMovingForward &&
                "-translate-x-full opacity-0",
              !isTransitioning && "translate-x-0 opacity-100"
            )}
          >
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
