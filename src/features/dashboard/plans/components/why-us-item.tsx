import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IWhyUsItem } from "../utils/plans.interface";
import { useTranslation } from "react-i18next";

interface IProps {
  item: IWhyUsItem;
}

export const WhyUsItem = ({ item }: IProps) => {
  const { t } = useTranslation();
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>{t(item.title)}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t(item.description)}</p>
      </CardContent>
    </Card>
  );
};
