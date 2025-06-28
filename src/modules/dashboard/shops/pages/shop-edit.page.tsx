import { getShopQueryFn } from "@/api/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ShopForm } from "../components/shop-form/shop-form";
import { IShopForm } from "../utils";
import { updateShopMutationFn } from "@/api/mutations";
import { toast } from "sonner";
import { LayoutLoader } from "@/components/loaders/global-loader";

export const ShopEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["shop", id],
    queryFn: () => getShopQueryFn(id!),
  });

  const updateShopMutation = useMutation({
    mutationFn: (data: IShopForm) => updateShopMutationFn(id!, data),
    onSuccess: () => {
      toast.success("Biznes yangilandi");
      navigate("/dashboard/shops");
    },
  });

  const shop = data?.data;

  if (isLoading) {
    return <LayoutLoader />;
  }

  if (!shop) {
    return <Navigate to="/dashboard/shops" />;
  }

  const shopForm: IShopForm = {
    name: shop.name,
    business_type: shop.business_type,
    platform: shop.platform,
    owner: shop.owner._id,
    status: shop.status,
    plan: shop.plan._id,
    logo: shop.logo,
    description: shop.description,
    telegram: {
      token: shop.telegram.token,
      menu_text: shop.telegram.menu_text,
      menu_url: shop.telegram.menu_url,
    },
    social_links: shop.social_links,
    currency: shop.currency._id,
    address: {
      address: shop.address.address,
      long: shop.address.long,
      lat: shop.address.lat,
    },
  };

  const handleSubmit = (data: IShopForm) => {
    updateShopMutation.mutate(data);
  };

  return (
    <ShopForm
      initialValue={shopForm}
      onSubmit={handleSubmit}
      isLoading={updateShopMutation.isPending}
    />
  );
};

export default ShopEditPage;
