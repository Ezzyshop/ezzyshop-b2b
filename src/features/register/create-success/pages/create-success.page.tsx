"use client";

import { CheckCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge/badge";
import { useRegisterShopContext, useUserContext } from "@/contexts";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dashboardSidebarData } from "@/lib";

export const CreateSuccessPage = () => {
  const { createdShop } = useRegisterShopContext();
  const { refetch } = useUserContext();

  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!createdShop) {
    return <Navigate to="/register/create-shop" />;
  }

  const handleGoDashboard = async () => {
    await refetch();
    navigate(dashboardSidebarData[0].url);
  };

  return (
    <Card className="w-full border-0 shadow-none h-fit md:gap-2">
      <CardHeader className="text-center p-0">
        <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl md:text-3xl font-bold  mb-2">
          {t("register.create_success.title")} 🎉
        </CardTitle>
        <CardDescription className="md:text-lg text-muted-foreground">
          {t("register.create_success.description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 p-0">
        <div className="bg-background rounded-lg p-4 border">
          <div className="flex items-center gap-3 mb-3">
            <Store className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold ">
              {t("register.create_success.about_shop")}
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                {t("register.create_success.shop_name")}:
              </span>
              <span className="font-medium ">{createdShop?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                {t("register.create_success.shop_id")}:
              </span>
              <Badge variant="secondary" className="font-mono text-xs">
                {createdShop?._id}
              </Badge>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="cursor-pointer w-full" onClick={handleGoDashboard}>
            {t("register.create_success.button_text")}
          </Button>
        </div>

        {/* Success Tips */}
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <h4 className="font-medium text-primary mb-2">
            💡 {t("register.create_success.tips_title")}
          </h4>
          <ul className="text-sm text-primary space-y-1">
            <li>• {t("register.create_success.tips.tip_1")}</li>
            <li>• {t("register.create_success.tips.tip_2")}</li>
            <li>• {t("register.create_success.tips.tip_3")}</li>
            <li>• {t("register.create_success.tips.tip_4")}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateSuccessPage;
