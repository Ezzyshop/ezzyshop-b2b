import { getShopQueryFn } from "@/api/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ShopForm } from "../components/shop-form/shop-form";
import { IShopForm } from "../utils";
import { updateShopMutationFn } from "@/api/mutations";
import { toast } from "sonner";
import { LayoutLoader } from "@/components/loaders/global-loader";

export const ShopEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["shop", id],
    queryFn: () => getShopQueryFn(id!),
  });

  const updateShopMutation = useMutation({
    mutationFn: (data: IShopForm) => updateShopMutationFn(id!, data),
    onSuccess: () => {
      toast.success("Biznes yangilandi");
      navigate("/moderator/shops");
      queryClient.invalidateQueries({ queryKey: ["shop", id] });
    },
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

  return (
    <ShopForm
      initialValue={shopForm}
      onSubmit={handleSubmit}
      isLoading={updateShopMutation.isPending}
    />
  );
};

export default ShopEditPage;
