import { cn } from "@/lib";

export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} className={cn("rounded-xs", props.className)} />;
};
