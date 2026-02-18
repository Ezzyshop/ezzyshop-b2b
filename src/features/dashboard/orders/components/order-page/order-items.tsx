import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { IOrderResponse } from "../../utils/order.interface";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib";

interface IProps {
  order: IOrderResponse;
}

export const OrderItems = ({ order }: IProps) => {
  const { t, i18n } = useTranslation();

  return (
    <Card className="grid-cols-1 md:col-span-2 flex-grow">
      <CardHeader>
        <CardTitle>{t("dashboard.orders.items.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("dashboard.orders.items.product")}</TableHead>
              <TableHead>{t("dashboard.orders.items.quantity")}</TableHead>
              <TableHead>{t("dashboard.orders.items.price")}</TableHead>
              <TableHead>
                {t("dashboard.orders.items.compare_at_price")}
              </TableHead>
              <TableHead>{t("dashboard.orders.items.total")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products.map((p) => {
              const isCompareAtPrice =
                p.compare_at_price && p.compare_at_price > 0;
              return (
                <TableRow key={p._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={p.variant?.images?.[0] ?? p.product.main_image}
                        alt={
                          p.product.name[
                            i18n.language as keyof typeof p.product.name
                          ]
                        }
                        className="size-10 rounded-md object-cover"
                      />
                      <div className="text-sm font-medium flex flex-col gap-1">
                        <span>
                          {
                            p.product.name[
                              i18n.language as keyof typeof p.product.name
                            ]
                          }
                        </span>
                        {p.variant?.attributes && (
                          <span className="text-xs text-muted-foreground">
                            {Object.entries(p.variant.attributes)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{p.quantity}</TableCell>
                  <TableCell
                    className={cn(isCompareAtPrice && "text-destructive")}
                  >
                    {p.price.toLocaleString()}{" "}
                    {order.transaction.currency.symbol}
                  </TableCell>
                  <TableCell>
                    {isCompareAtPrice ? (
                      <span className="line-through">
                        {p.compare_at_price?.toLocaleString()}{" "}
                        {order.transaction.currency.symbol}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {p.total_price.toLocaleString()}{" "}
                    {order.transaction.currency.symbol}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
