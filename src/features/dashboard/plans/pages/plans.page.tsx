import { useQuery } from "@tanstack/react-query";
import { getPlansQueryFn } from "@/api/queries";
import { DashboardLayoutLoader } from "@/components/loaders/global-loader";
import { PlanCard } from "../components/plan-card";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { PlansType } from "../utils/plans.enum";
import { PlanTypeSwitch } from "../components/plan-type-switch";
import { WhyUsItem } from "../components/why-us-item";
import { whyUsItems } from "../utils/plans.static";

export const PlansPage = () => {
  const { t } = useTranslation();
  const [type, setType] = useState<PlansType>(PlansType.Monthly);
  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: () => getPlansQueryFn(),
  });

  if (isLoading) {
    return <DashboardLayoutLoader />;
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("dashboard.plans.title")}</h1>
        <PlanTypeSwitch type={type} setType={setType} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {plans?.data.map((plan) => (
          <PlanCard key={plan._id} plan={plan} type={type} />
        ))}
      </div>

      <div className="mt-6 md:mt-12 ">
        <h2 className="text-2xl font-bold">
          {t("dashboard.plans.why_us.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {whyUsItems.map((item) => (
            <WhyUsItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
