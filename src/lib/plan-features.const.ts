export interface IFeatureDefinition {
  key: string;
  label: string;
  description: string;
  /** When true, shows a numeric limit input in the plan form. When false, checkbox only (limit always -1). */
  hasLimit: boolean;
}

export interface IFeatureCategoryGroup {
  key: string;
  label: string;
  features: IFeatureDefinition[];
}

// Mirrors ezzyshop-express/src/modules/plan/utils/plan-features.registry.ts
// To add a feature: append here AND in the backend registry, then wire up enforcement.
export const PLAN_FEATURE_CATEGORIES: IFeatureCategoryGroup[] = [
  {
    key: 'catalog',
    label: 'Katalog',
    features: [
      { key: 'products', label: 'Mahsulotlar', description: "Umumiy mahsulotlar soni", hasLimit: true },
      { key: 'categories', label: 'Kategoriyalar', description: "Umumiy kategoriyalar soni", hasLimit: true },
    ],
  },
  {
    key: 'orders',
    label: 'Buyurtmalar',
    features: [
      { key: 'orders', label: 'Oylik buyurtmalar', description: 'Oyiga qabul qilinadigan buyurtmalar limiti', hasLimit: true },
      { key: 'customers', label: 'Mijozlar', description: "Mijozlar ro'yxatiga kirish", hasLimit: false },
    ],
  },
  {
    key: 'commerce',
    label: "Do'kon",
    features: [
      { key: 'delivery_types', label: 'Yetkazib berish turlari', description: 'Yetkazib berish usullarini boshqarish', hasLimit: false },
      { key: 'delivery_zones', label: 'Yetkazib berish zonalari', description: 'Yetkazib berish hududlarini boshqarish', hasLimit: false },
      { key: 'payment_methods', label: "To'lov usullari", description: "To'lov usullarini boshqarish", hasLimit: false },
      { key: 'branches', label: 'Filiallar', description: 'Maksimal filiallar soni (-1 = cheksiz)', hasLimit: true },
      { key: 'coupons', label: 'Kuponlar', description: 'Maksimal kuponlar soni (-1 = cheksiz)', hasLimit: true },
    ],
  },
  {
    key: 'team',
    label: 'Jamoa',
    features: [
      { key: 'staffs', label: 'Xodimlar', description: 'Maksimal xodimlar soni (-1 = cheksiz)', hasLimit: true },
      { key: 'roles', label: 'Rollar', description: 'Maksimal rollar soni (-1 = cheksiz)', hasLimit: true },
    ],
  },
  {
    key: 'telegram',
    label: 'Telegram',
    features: [
      { key: 'telegram_setup', label: 'Telegram sozlash', description: 'Telegram bot sozlamalarini boshqarish', hasLimit: false },
      { key: 'telegram_templates', label: 'Telegram shablonlar', description: 'Bot xabar shablonlarini tahrirlash', hasLimit: false },
      { key: 'telegram_send_message', label: "Xabar jo'natish", description: "Abonentlarga ommaviy xabar jo'natish", hasLimit: false },
    ],
  },
  {
    key: 'marketing',
    label: 'Marketing',
    features: [
      { key: 'reviews', label: 'Sharhlar', description: "Mahsulot sharhlarini ko'rish va boshqarish", hasLimit: false },
      { key: 'chat', label: 'Chat', description: 'Mijozlar bilan chat', hasLimit: false },
    ],
  },
  {
    key: 'analytics',
    label: 'Analitika',
    features: [
      { key: 'analytics_orders', label: 'Buyurtmalar analitikasi', description: 'Buyurtmalar, savdo va tranzaksiya hisobotlari', hasLimit: false },
      { key: 'analytics_search', label: 'Qidiruv analitikasi', description: "Qidiruv so'rovlari tahlili", hasLimit: false },
      { key: 'analytics_product_views', label: "Mahsulot ko'rishlari", description: "Mahsulot ko'rishlar statistikasi", hasLimit: false },
      { key: 'analytics_conversion', label: 'Konversiya funnel', description: 'Savat va buyurtma konversiyasi', hasLimit: false },
    ],
  },
  {
    key: 'ai',
    label: "Sun'iy intellekt",
    features: [
      { key: 'ai_image_generator', label: 'AI rasm yaratuvchi', description: "AI yordamida rasm yaratish (-1 = cheksiz)", hasLimit: true },
    ],
  },
  {
    key: 'dashboard',
    label: 'Boshqaruv paneli',
    features: [
      { key: 'stat_overview', label: 'Umumiy statistika', description: 'Boshqaruv panelida buyurtma va savdo xulosasi', hasLimit: false },
      { key: 'stat_coupons', label: 'Kupon statistikasi', description: 'Faol kuponlar va foydalanish statistikasi', hasLimit: false },
      { key: 'stat_low_stock', label: 'Kam qolgan mahsulotlar', description: 'Qoldig\'i kam mahsulotlar ogohlantirishi', hasLimit: false },
      { key: 'stat_pending_reviews', label: 'Kutilayotgan sharhlar', description: 'Javob berilmagan sharhlar', hasLimit: false },
    ],
  },
  {
    key: 'settings',
    label: 'Sozlamalar',
    features: [
      { key: 'settings', label: "Do'kon sozlamalari", description: "Do'kon sozlamalarini boshqarish", hasLimit: false },
    ],
  },
];

export const PLAN_FEATURE_MAP: Record<string, IFeatureDefinition> = Object.fromEntries(
  PLAN_FEATURE_CATEGORIES.flatMap((c) => c.features).map((f) => [f.key, f]),
);
