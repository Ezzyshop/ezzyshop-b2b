import { Truck } from "lucide-react";

export const DeliveryMethodEmptyState = () => {
  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="mb-6 flex flex-col items-center max-w-md w-full">
        <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
          <Truck className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Yetkazib berish usullari yo'q
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed text-center">
          Hozircha hech qanday yetkazib berish usuli qo'shilmagan. Birinchi
          yetkazib berish usulini qo'shish uchun tugmani bosing.
        </p>
      </div>
    </div>
  );
};
