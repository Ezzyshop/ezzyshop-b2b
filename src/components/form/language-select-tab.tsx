import { useShopContext } from "@/contexts";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { languageLabels, LanguageType } from "@/features/moderator/shops/utils";

interface IProps {
  activeLanguage: LanguageType;
  setActiveLanguage: (language: LanguageType) => void;
}

export const LanguageSelectTab = ({
  activeLanguage,
  setActiveLanguage,
}: IProps) => {
  const { shop } = useShopContext();
  const availableLanguages = shop.languages.map((lang) => lang.type);

  return (
    <Tabs
      value={activeLanguage}
      className="w-full"
      onValueChange={(value) => setActiveLanguage(value as LanguageType)}
    >
      <TabsList className="w-full">
        {availableLanguages.map((langType) => (
          <TabsTrigger key={langType} value={langType}>
            {languageLabels[langType]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
