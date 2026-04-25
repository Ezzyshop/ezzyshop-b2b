export interface ICustomerResponse {
  _id: string;
  full_name: string;
  phone: string | null;
  registered_at: string;
  first_order_date: string;
  last_order_date: string;
  total_orders: number;
  total_amount: number;
}
