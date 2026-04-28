export interface IDateRange {
  startDate: string;
  endDate: string;
}

export interface IMetricsTrendPoint {
  date: string;
  [key: string]: string | number;
}

export interface ISearchAnalytics {
  period: { start: string; end: string };
  summary: { total_searches: number; unique_keywords: number };
  keywords: { keyword: string; count: number; last_searched: string }[];
  trend: { date: string; count: number }[];
  pagination: { page: number; limit: number };
}

export interface IProductViewsAnalytics {
  period: { start: string; end: string };
  summary: { total_views: number; total_unique_views: number };
  products: {
    product_id: string;
    name: { uz: string; ru?: string; en?: string };
    main_image: string;
    total_views: number;
    unique_views: number;
  }[];
  trend: { date: string; count: number }[];
  pagination: { page: number; limit: number };
}

export interface IProductSalesAnalytics {
  period: { start: string; end: string };
  summary: { total_revenue: number; total_quantity_sold: number };
  products: {
    product_id: string;
    name: { uz: string; ru?: string; en?: string };
    main_image: string;
    total_quantity: number;
    total_revenue: number;
    order_count: number;
  }[];
  trend: { date: string; revenue: number; orders: number }[];
  pagination: { page: number; limit: number };
}

export interface ITopCustomersAnalytics {
  period: { start: string; end: string };
  summary: { total_revenue: number; unique_customers: number };
  customers: {
    rank: number;
    user_id: string;
    name: string | null;
    phone: string | null;
    total_spent: number;
    order_count: number;
    last_order: string;
  }[];
  pagination: { page: number; limit: number };
}

export interface IOrdersDetailedAnalytics {
  period: { start: string; end: string };
  summary: {
    total_orders: number;
    total_revenue: number;
    avg_order_value: number;
    total_discount: number;
    delivery_total: number;
  };
  status_breakdown: Record<string, number>;
  payment_breakdown: { method: string; count: number; revenue: number }[];
  top_products: {
    product_id: string;
    name: { uz: string; ru?: string; en?: string };
    main_image: string;
    total_quantity: number;
    total_revenue: number;
    order_count: number;
  }[];
  trend: { date: string; orders: number; revenue: number; delivery: number }[];
}

export interface IConversionFunnelAnalytics {
  period: { start: string; end: string };
  funnel: {
    add_to_cart: number;
    view_cart: number;
    begin_checkout: number;
    purchase: number;
  };
  conversion_rates: {
    checkout_rate: number;
    purchase_rate: number;
  };
  daily_trend: { _id: { date: string; event: string }; count: number }[];
}
