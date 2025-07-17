import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ILanguage, LanguageType } from "@/features/moderator/shops/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useTranslation } from "react-i18next";

interface IProps {
  values: ILanguage[];
  onChange: (values: ILanguage[]) => void;
}

export const SelectLanguage = ({ values, onChange }: IProps) => {
  const { t } = useTranslation();

  const handleChangeLanguage = (
    checked: CheckedState,
    language: LanguageType
  ) => {
    if (checked) {
      handleAddLanguage(language);
    } else {
      handleRemoveLanguage(language);
    }
  };

  const handleAddLanguage = (language: LanguageType) => {
    onChange([...values, { type: language, is_main: false }]);
  };

  const handleRemoveLanguage = (language: LanguageType) => {
    if (values.length === 1) return;

    const isCurrentLanguageMain = values.find((v) => v.is_main);

    if (isCurrentLanguageMain?.type === language) {
      handleChangeIsMain(undefined);
    }

    onChange(values.filter((v) => v.type !== language));
  };

  const handleChangeIsMain = (value: LanguageType | undefined) => {
    onChange(values.map((v) => ({ ...v, is_main: v.type === value })));
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col  gap-3">
        {Object.values(LanguageType).map((language) => (
          <div key={language} className="flex items-center gap-2">
            <Checkbox
              checked={values.some((v) => v.type === language)}
              onCheckedChange={(checked) =>
                handleChangeLanguage(checked, language)
              }
            />
            <Label>{language}</Label>
          </div>
        ))}
      </div>
      <div>
        <RadioGroup
          value={values.find((v) => v.is_main)?.type.toString() || null}
          onValueChange={(value) => handleChangeIsMain(value as LanguageType)}
          className="gap-3"
        >
          {Object.values(LanguageType).map((type) => (
            <div
              key={type}
              className="flex items-center gap-3 disabled:opacity-50"
            >
              <RadioGroupItem
                disabled={values.every((v) => v.type !== type)}
                value={type}
                id={type}
              />
              <Label htmlFor={type}>
                {t(`register.create_shop.main_language`)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
