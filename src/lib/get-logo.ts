import { Theme } from "@/contexts";

export const getLogo = (theme: Theme) => {
  return {
    dark: "/images/logo-dark.png",
    light: "/images/logo-light.png",
    system: "/images/logo-dark.png",
  }[theme];
};
