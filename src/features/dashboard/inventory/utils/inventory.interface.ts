import { IProduct } from "@/features/dashboard/products/utils/product.interface";

export type IInventoryVariant = NonNullable<IProduct["variants"]>[number];

export interface IInventoryRow {
  product: IProduct;
  variant: IInventoryVariant;
}
