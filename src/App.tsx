import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/language-switcher";
import TelegramBotGuide from "./components/telegram-bot-guide";

export function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {t("common.welcome")} - TgBazar B2B
          </h1>
          <LanguageSwitcher />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {t("navigation.products")}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t("product.description")}: Lorem ipsum dolor sit amet
              consectetur.
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              {t("common.view")} {t("navigation.products")}
            </button>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {t("navigation.orders")}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t("order.status")}: {t("order.pending")}
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              {t("order.trackOrder")}
            </button>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {t("navigation.profile")}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t("auth.email")}: admin@example.com
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              {t("common.edit")} {t("navigation.profile")}
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-medium mb-2 text-foreground">
            {t("messages.fillRequiredFields")}
          </h3>
          <p className="text-sm text-muted-foreground">
            This is a demo showing internationalization support for Uzbek,
            Russian, and English languages. Use the language switcher in the
            top-right corner to change languages.
          </p>
        </div>

        <div className="mt-8">
          <TelegramBotGuide />
        </div>
      </div>
    </div>
  );
}
