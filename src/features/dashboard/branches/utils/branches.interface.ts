import { BranchStatus } from "./branches.enum";

export interface IBranchAddress {
  address: string;
  lat: number;
  lng: number;
}

export interface IBranch {
  _id: string;
  shop: {
    _id: string;
    name: string;
  };
  name: {
    uz: string;
    ru?: string;
    en?: string;
  };
  address: IBranchAddress;
  status: BranchStatus;
  pickup_enabled: boolean;
  delivery_enabled?: boolean;
  service_radius_km?: number;
  image?: string;
  working_hours?: Record<
    "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
    { open: string; close: string; closed?: boolean }
  >;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type IBranchForm = Omit<
  IBranch,
  "shop" | "createdAt" | "updatedAt" | "_id" | "status"
>;
