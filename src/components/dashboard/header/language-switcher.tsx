import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Language } from "@/lib/types/language.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button/button";

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  const handleLanguageChange = (language: Language) => {
    changeLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className=" cursor-pointer">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${
              currentLanguage === language.code
                ? "bg-accent text-accent-foreground"
                : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">
                {language.name}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
