export interface ICourierDebtEntry {
  _id: string;
  courier: {
    _id: string;
    full_name: string;
    phone: string;
    photo: string | null;
  };
  balance: number;
  total_accrued: number;
  total_paid: number;
}
