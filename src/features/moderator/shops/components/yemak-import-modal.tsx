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
import { useYemakImport } from "@/contexts/yemak-import-context/yemak.context";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const YemakImportModal = ({ open, onClose }: IProps) => {
  const { startImport } = useYemakImport();

  const [shopId, setShopId] = useState("");
  const [yemakId, setYemakId] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const { data } = useQuery({
    queryKey: ["shops", { limit: 200 }],
    queryFn: () => getAllShopsQueryFn({ limit: 200 }),
    enabled: open,
  });

  const shops = data?.data ?? [];
  const selectedShop = shops.find((s) => s._id === shopId);
  const isConfirmed = !!selectedShop && confirmation === selectedShop.name;
  const canSubmit = isConfirmed && yemakId.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit || !selectedShop) return;
    startImport(shopId, selectedShop.name, yemakId.trim());
    onClose();
    setShopId("");
    setYemakId("");
    setConfirmation("");
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      onClose();
      setShopId("");
      setYemakId("");
      setConfirmation("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Yemak'dan import qilish</DialogTitle>
          <DialogDescription>
            Do'konni tanlang, Yemak restaurant ID'sini kiriting va tasdiqlash
            uchun do'kon nomini yozing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Shop select */}
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

          {/* Yemak ID */}
          <div className="space-y-1.5">
            <Label>Yemak Restaurant ID</Label>
            <Input
              placeholder="Masalan: 1234"
              value={yemakId}
              onChange={(e) => setYemakId(e.target.value)}
            />
          </div>

          {/* Confirmation */}
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

export const YemakImportButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        title="Yemak'dan import qilish"
      >
        <DownloadIcon className="w-4 h-4 mr-2" />
        Yemak import
      </Button>
      <YemakImportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
