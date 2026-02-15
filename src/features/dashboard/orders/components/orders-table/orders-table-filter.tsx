import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { TObject, useDebounce } from "@/hooks";
import { OrderStatus, orderStatusTranslations } from "../../utils/order.enum";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  TransactionStatus,
  transactionStatusTranslations,
} from "../../utils/transaction.enum";
import {
  PaymentMethodType,
  paymentMethodTypeLabels,
} from "@/features/dashboard/payment-methods/utils/payment-method.enum";

interface IProps {
  setQueryParams: (params: TObject) => void;
  getQueryParams: () => TObject;
}

export const OrdersTableFilters = ({
  setQueryParams,
  getQueryParams,
}: IProps) => {
  const { t } = useTranslation();
  const { status, search } = getQueryParams();
  const transaction_status = getQueryParams()["transaction.status"];
  const payment_method = getQueryParams()["transaction.provider"];
  const [value, setValue] = useState<string>(search as string);
  const debouncedSetQueryParams = useDebounce(value, 500);

  useEffect(() => {
    setQueryParams({ ...getQueryParams(), search: debouncedSetQueryParams || undefined });
  }, [debouncedSetQueryParams]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-2 ">
      <Input
        placeholder={t("table.filters.search")}
        className=" w-full"
        type="text"
        defaultValue={search as string}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Select
        value={status as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), status: value })
        }
      >
        <SelectTrigger
          value={status as string}
          onReset={() => setQueryParams({ ...getQueryParams(), status: "" })}
        >
          <SelectValue placeholder={t("table.filters.order_status")} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(OrderStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {t(orderStatusTranslations[status])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={transaction_status as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), "transaction.status": value })
        }
      >
        <SelectTrigger
          value={transaction_status as string}
          onReset={() =>
            setQueryParams({ ...getQueryParams(), "transaction.status": "" })
          }
        >
          <SelectValue placeholder={t("table.filters.transaction_status")} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(TransactionStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {t(transactionStatusTranslations[status])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={payment_method as string}
        onValueChange={(value) =>
          setQueryParams({ ...getQueryParams(), "transaction.provider": value })
        }
      >
        <SelectTrigger
          value={payment_method as string}
          onReset={() =>
            setQueryParams({ ...getQueryParams(), "transaction.provider": "" })
          }
        >
          <SelectValue placeholder={t("table.filters.payment_method")} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(PaymentMethodType).map((payment_method) => (
            <SelectItem key={payment_method} value={payment_method}>
              {t(paymentMethodTypeLabels[payment_method])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
