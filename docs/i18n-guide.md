# Internationalization (i18n) Guide

This project supports internationalization with three languages:

- **English (en)** - Default language
- **Russian (ru)** - Русский
- **Uzbek (uz)** - O'zbekcha

## Quick Start

### 1. Using translations in components

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("common.welcome")}</h1>
      <button>{t("common.save")}</button>
    </div>
  );
}
```

### 2. Using the language switcher

The `LanguageSwitcher` component is already created and can be imported:

```tsx
import LanguageSwitcher from "./components/language-switcher";

function Header() {
  return (
    <div className="header">
      <h1>My App</h1>
      <LanguageSwitcher />
    </div>
  );
}
```

### 3. Using the language hook

```tsx
import { useLanguage } from "./hooks/use-language";

function MyComponent() {
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  return (
    <div>
      <p>Current language: {currentLanguage}</p>
      <button onClick={() => changeLanguage("uz")}>Switch to Uzbek</button>
    </div>
  );
}
```

## File Structure

```
src/
├── locales/
│   ├── en/
│   │   └── translation.json
│   ├── ru/
│   │   └── translation.json
│   └── uz/
│       └── translation.json
├── lib/
│   └── i18n.ts
├── contexts/
│   ├── language-context.ts
│   └── language.context.tsx
├── hooks/
│   └── use-language.ts
├── types/
│   └── language.types.ts
└── components/
    └── language-switcher.tsx
```

## Translation Keys Structure

The translations are organized in the following structure:

```json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
    // ... more common translations
  },
  "navigation": {
    "home": "Home",
    "products": "Products"
    // ... navigation items
  },
  "auth": {
    "login": "Login",
    "register": "Register"
    // ... authentication related
  },
  "product": {
    "title": "Product Title",
    "description": "Description"
    // ... product related
  },
  "order": {
    "orderNumber": "Order Number",
    "status": "Status"
    // ... order related
  },
  "messages": {
    "loginSuccess": "Login successful",
    "dataUpdated": "Data updated successfully"
    // ... system messages
  }
}
```

## Adding New Translations

1. Add the new key to all language files:

   - `src/locales/en/translation.json`
   - `src/locales/ru/translation.json`
   - `src/locales/uz/translation.json`

2. Use the translation in your component:

```tsx
const { t } = useTranslation();
return <p>{t("your.new.key")}</p>;
```

## Advanced Usage

### Interpolation

You can pass variables to translations:

```json
{
  "greeting": "Hello {{name}}, welcome to {{appName}}!"
}
```

```tsx
const { t } = useTranslation();
return <p>{t("greeting", { name: "John", appName: "TgBazar" })}</p>;
```

### Pluralization

For handling plural forms:

```json
{
  "item": "{{count}} item",
  "item_plural": "{{count}} items"
}
```

```tsx
const { t } = useTranslation();
return <p>{t("item", { count: 5 })}</p>; // "5 items"
```

### HTML Content in Translations

For translations that contain HTML (like links), use the `HtmlTranslation` component:

```json
{
  "botfather_tip": "Write <a href=\"https://t.me/BotFather\" target=\"_blank\">@BotFather</a> in Telegram search"
}
```

```tsx
import HtmlTranslation from "./components/html-translation";

function MyComponent() {
  return (
    <div>
      <HtmlTranslation
        translationKey="botfather_tip"
        className="text-blue-600"
      />
    </div>
  );
}
```

### Namespaces

If you need to organize translations further, you can create namespace files:

```
src/locales/en/
├── translation.json    (default namespace)
├── products.json
└── orders.json
```

Then use them:

```tsx
const { t } = useTranslation("products");
return <p>{t("title")}</p>; // loads from products.json
```

## Language Detection

The language is automatically detected from:

1. `localStorage` (if user previously selected)
2. Browser language settings
3. HTML lang attribute
4. Falls back to English if none found

## Best Practices

1. **Always provide translations for all languages** when adding new keys
2. **Use meaningful key names** that describe the content
3. **Group related translations** under the same namespace
4. **Test all languages** to ensure proper display
5. **Keep translations consistent** across all supported languages
6. **Use the language switcher** in your main navigation or header

## Troubleshooting

### Common Issues

1. **Translation not showing**: Make sure the key exists in all language files
2. **Component not re-rendering**: Ensure you're using `useTranslation()` hook
3. **Language not persisting**: Check if localStorage is working properly
4. **Missing dependency errors**: Make sure all i18n packages are installed

### Debug Mode

Set `NODE_ENV=development` to enable debug mode which will log missing translations to the console.
