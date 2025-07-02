import React from "react";
import { useTranslation } from "react-i18next";

interface HtmlTranslationProps {
  translationKey: string;
  values?: Record<string, string | number>;
  className?: string;
}

const HtmlTranslation: React.FC<HtmlTranslationProps> = ({
  translationKey,
  values = {},
  className = "",
}) => {
  const { t } = useTranslation();

  // Get the translated text with interpolation
  const translatedText = t(translationKey, values);

  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{ __html: translatedText }}
    />
  );
};

export default HtmlTranslation;
