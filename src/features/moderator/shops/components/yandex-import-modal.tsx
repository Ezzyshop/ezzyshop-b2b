import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllShopsQueryFn } from "@/api/queries/shops.query";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DownloadIcon } from "lucide-react";
import { useYandexImport } from "@/contexts/yandex-import-context/yandex.context";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const YandexImportModal = ({ open, onClose }: IProps) => {
  const { startImport } = useYandexImport();

  const [shopId, setShopId] = useState("");
  const [yandexSlug, setYandexSlug] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const { data } = useQuery({
    queryKey: ["shops", { limit: 200 }],
    queryFn: () => getAllShopsQueryFn({ limit: 200 }),
    enabled: open,
  });

  const shops = data?.data ?? [];
  const selectedShop = shops.find((s) => s._id === shopId);
  const isConfirmed = !!selectedShop && confirmation === selectedShop.name;
  const canSubmit = isConfirmed && yandexSlug.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit || !selectedShop) return;
    startImport(shopId, selectedShop.name, yandexSlug.trim());
    onClose();
    setShopId("");
    setYandexSlug("");
    setConfirmation("");
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      onClose();
      setShopId("");
      setYandexSlug("");
      setConfirmation("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Yandex Eats'dan import qilish</DialogTitle>
          <DialogDescription>
            Do'konni tanlang, Yandex restoran slug'ini kiriting va tasdiqlash
            uchun do'kon nomini yozing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Do'kon</Label>
            <Select value={shopId} onValueChange={setShopId}>
              <SelectTrigger>
                <SelectValue placeholder="Do'konni tanlang..." />
              </SelectTrigger>
              <SelectContent>
                {shops.map((shop) => (
                  <SelectItem key={shop._id} value={shop._id}>
                    {shop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Yandex restoran slug</Label>
            <Input
              placeholder="Masalan: my-restaurant"
              value={yandexSlug}
              onChange={(e) => setYandexSlug(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              URL'dan: eats.yandex.com/…/<strong>slug</strong>
            </p>
          </div>

          <div className="space-y-1.5">
            <Label>
              Tasdiqlash{" "}
              {selectedShop && (
                <span className="text-muted-foreground font-normal">
                  — «{selectedShop.name}» deb yozing
                </span>
              )}
            </Label>
            <Input
              placeholder={selectedShop?.name ?? "Avval do'konni tanlang"}
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              disabled={!selectedShop}
              className={
                confirmation && !isConfirmed ? "border-destructive" : ""
              }
            />
            {confirmation && !isConfirmed && (
              <p className="text-xs text-destructive">
                Do'kon nomi to'g'ri kelmayapti
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Import boshlash
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const YandexImportButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        title="Yandex Eats'dan import qilish"
      >
        <DownloadIcon className="w-4 h-4 mr-2" />
        Yandex import
      </Button>
      <YandexImportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
