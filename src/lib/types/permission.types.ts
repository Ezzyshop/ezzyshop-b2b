export type PermissionResource =
  | 'products'
  | 'categories'
  | 'orders'
  | 'transactions'
  | 'customers'
  | 'delivery_methods'
  | 'delivery_zones'
  | 'payment_methods'
  | 'branches'
  | 'staffs'
  | 'roles'
  | 'coupons'
  | 'reviews'
  | 'review_replies'
  | 'chat'
  | 'shop_settings'
  | 'telegram_setup'
  | 'telegram_templates'
  | 'telegram_messages'
  | 'analytics';

export type PermissionAction = 'read' | 'create' | 'update' | 'delete' | 'full';

export interface IPermission {
  resource: PermissionResource;
  actions: PermissionAction[];
}

export interface IRole {
  _id: string;
  name: string;
  shop: string;
  permissions: IPermission[];
  createdAt: string;
  updatedAt: string;
}

export interface IMyRole {
  isAdmin: boolean;
  role: IRole | null;
}

export interface IRoleForm {
  name: string;
  permissions: IPermission[];
}

export type RouteAccess =
  | { accessType: 'admin-only' }
  | { accessType: 'permission'; resource: PermissionResource; action: PermissionAction }
  | { accessType: 'any' };

export const PERMISSION_MATRIX: {
  resource: PermissionResource;
  label: string;
  actions: PermissionAction[];
}[] = [
  { resource: 'products', label: 'Products', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'categories', label: 'Categories', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'orders', label: 'Orders', actions: ['read', 'update'] },
  { resource: 'transactions', label: 'Transactions', actions: ['read', 'update'] },
  { resource: 'customers', label: 'Customers', actions: ['read'] },
  { resource: 'delivery_methods', label: 'Delivery Methods', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'delivery_zones', label: 'Delivery Zones', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'payment_methods', label: 'Payment Methods', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'branches', label: 'Branches', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'staffs', label: 'Staffs', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'roles', label: 'Roles', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'coupons', label: 'Coupons', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'reviews', label: 'Reviews', actions: ['read', 'delete'] },
  { resource: 'review_replies', label: 'Review Replies', actions: ['create'] },
  { resource: 'chat', label: 'Chat with Customers', actions: ['full'] },
  { resource: 'shop_settings', label: 'Shop Settings', actions: ['read', 'update'] },
  { resource: 'telegram_setup', label: 'Telegram Setup', actions: ['read', 'create', 'update', 'delete'] },
  { resource: 'telegram_templates', label: 'Telegram Templates', actions: ['read', 'create', 'update'] },
  { resource: 'telegram_messages', label: 'Telegram Messages', actions: ['read', 'create'] },
  { resource: 'analytics', label: 'Analytics & Metrics', actions: ['read'] },
];
