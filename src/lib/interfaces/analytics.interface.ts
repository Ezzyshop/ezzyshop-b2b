export interface ITotalAnalytics {
  total_revenue: {
    current_month: number;
    last_month: number;
  };
  total_customers: {
    current_month: number;
    last_month: number;
  };
  total_sales: {
    current_month: number;
    last_month: number;
  };
}

export interface ITotalTransactionAnalytics {
  monthly_data: {
    month: string;
    amount: number;
    transactions: number;
    daily_data: {
      date: string;
      amount: number;
      transactions: number;
    }[];
  }[];
}

export interface ITotalSalesAnalytics {
  monthly_data: {
    month: string;
    orders: number;
    revenue: number;
    daily_data: {
      date: string;
      orders: number;
      revenue: number;
    }[];
  }[];
}
