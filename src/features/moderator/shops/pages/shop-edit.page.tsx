import { getShopQueryFn } from "@/api/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ShopForm } from "../components/shop-form/shop-form";
import { IShopForm } from "../utils";
import { deleteShopMutationFn, updateShopMutationFn } from "@/api/mutations";
import { toast } from "sonner";
import { LayoutLoader } from "@/components/loaders/global-loader";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash2Icon } from "lucide-react";

export const ShopEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [confirmPhrase, setConfirmPhrase] = useState("");
  const DELETE_PHRASE = "Delete this bot";

  const { data, isLoading } = useQuery({
    queryKey: ["shop", id],
    queryFn: () => getShopQueryFn(id!),
  });

  const updateShopMutation = useMutation({
    mutationFn: (data: IShopForm) => updateShopMutationFn(id!, data),
    onSuccess: () => {
      toast.success("Do'kon yangilandi");
      navigate("/moderator/shops");
      queryClient.invalidateQueries({ queryKey: ["shop", id] });
    },
  });

  const deleteShopMutation = useMutation({
    mutationFn: () => deleteShopMutationFn(id!),
    onSuccess: () => {
      toast.success("Do'kon va unga tegishli barcha ma'lumotlar o'chirildi");
      setShowDeleteDialog(false);
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      navigate("/moderator/shops");
    },
    onError: () => toast.error("Do'konni o'chirishda xatolik yuz berdi"),
  });

  const shop = data?.data;

  if (isLoading) {
    return <LayoutLoader />;
  }

  if (!shop) {
    return <Navigate to="/moderator/shops" />;
  }

  const shopForm: IShopForm = {
    name: shop.name,
    business_type: shop.business_type,
    platform: shop.platform,
    owner: shop.owner._id,
    status: shop.status,
    logo: shop.logo,
    description: shop.description,
    social_links: shop.social_links,
    currency: shop.currency._id,
    address: {
      address: shop.address.address,
      long: shop.address.long,
      lat: shop.address.lat,
    },
    languages: shop.languages,
  };

  const handleSubmit = (data: IShopForm) => {
    updateShopMutation.mutate(data);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setConfirmName("");
    setConfirmPhrase("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2Icon className="w-4 h-4 mr-2" />
          Do'konni o'chirish
        </Button>
      </div>

      <ShopForm
        initialValue={shopForm}
        onSubmit={handleSubmit}
        isLoading={updateShopMutation.isPending}
      />

      <Dialog
        open={showDeleteDialog}
        onOpenChange={(open) => (open ? setShowDeleteDialog(true) : closeDeleteDialog())}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do'konni o'chirish</DialogTitle>
            <DialogDescription>
              Bu amal qaytarib bo'lmaydi. Do'kon va unga tegishli barcha
              ma'lumotlar (mahsulotlar, buyurtmalar, kategoriyalar, xodimlar,
              telegram bot va boshqalar) butunlay o'chiriladi.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                1. Tasdiqlash uchun do'kon nomini yozing:{" "}
                <span className="font-semibold text-foreground">{shop.name}</span>
              </p>
              <Input
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                placeholder={shop.name}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                2. Quyidagi matnni yozing:{" "}
                <span className="font-semibold text-foreground">
                  {DELETE_PHRASE}
                </span>
              </p>
              <Input
                value={confirmPhrase}
                onChange={(e) => setConfirmPhrase(e.target.value)}
                placeholder={DELETE_PHRASE}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog}>
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              disabled={
                confirmName !== shop.name ||
                confirmPhrase !== DELETE_PHRASE ||
                deleteShopMutation.isPending
              }
              onClick={() => deleteShopMutation.mutate()}
            >
              {deleteShopMutation.isPending
                ? "O'chirilmoqda..."
                : "O'chirish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopEditPage;
