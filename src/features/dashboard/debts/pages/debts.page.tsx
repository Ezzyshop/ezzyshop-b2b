import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useShopContext } from "@/contexts";
import { getCourierDebtsQueryFn } from "@/api/queries/debts.query";
import { ICourierDebtEntry } from "../utils/debt.interface";
import { PayDebtModal } from "../components/pay-debt/pay-debt-modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DebtsPage() {
  const { t } = useTranslation();
  const { shop } = useShopContext();
  const [selectedDebt, setSelectedDebt] = useState<ICourierDebtEntry | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["courier-debts", shop._id],
    queryFn: () => getCourierDebtsQueryFn(shop._id),
    enabled: Boolean(shop._id),
  });

  const debts = data?.data ?? [];

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl font-bold">{t("sidebar.dashboard.debts")}</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("dashboard.debts.courier")}</TableHead>
              <TableHead>{t("dashboard.debts.phone")}</TableHead>
              <TableHead className="text-right">{t("dashboard.debts.total_accrued")}</TableHead>
              <TableHead className="text-right">{t("dashboard.debts.total_paid")}</TableHead>
              <TableHead className="text-right">{t("dashboard.debts.balance")}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : debts.length === 0
                ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      {t("dashboard.debts.empty")}
                    </TableCell>
                  </TableRow>
                )
                : debts.map((debt) => (
                    <TableRow key={debt._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarImage src={debt.courier.photo ?? undefined} />
                            <AvatarFallback>
                              {debt.courier.full_name[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{debt.courier.full_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{debt.courier.phone}</TableCell>
                      <TableCell className="text-right">
                        {debt.total_accrued.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {debt.total_paid.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-orange-500">
                        {debt.balance.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => setSelectedDebt(debt)}
                        >
                          {t("dashboard.debts.pay_button")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </div>

      {selectedDebt && (
        <PayDebtModal
          debt={selectedDebt}
          open={Boolean(selectedDebt)}
          onOpenChange={(open) => { if (!open) setSelectedDebt(null); }}
        />
      )}
    </div>
  );
}

export default DebtsPage;
