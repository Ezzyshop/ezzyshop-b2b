export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const productStatusOptions = {
  [ProductStatus.ACTIVE]: "common.active",
  [ProductStatus.INACTIVE]: "common.inactive",
};
