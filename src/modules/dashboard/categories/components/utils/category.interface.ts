import { IShop } from "@/modules/moderator/shops/utils";
import { CategoryStatus } from "./category.enum";

export interface ICategory {
  _id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  image: string;
  shop: Pick<IShop, "_id" | "name">;
  status: CategoryStatus;
  is_popular: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryForm {
  name: {
    uz: string;
    ru?: string;
    en?: string;
  };
  image?: string;
  status?: CategoryStatus;
  is_popular?: boolean;
}
