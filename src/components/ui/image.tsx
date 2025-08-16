import { ImgHTMLAttributes } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { cn } from "@/lib";
import { SearchIcon } from "lucide-react";

export const Image = ({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <Dialog>
      <DialogTrigger className="relative group cursor-pointer">
        <img {...props} className={cn("cursor-pointer", className)} />
        <div className="absolute top-0  w-full h-full right-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <SearchIcon className="size-4" />
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        closeButtonClassName="bg-red-500 rounded-sm"
        className="bg-transparent border-none p-0"
      >
        <img {...props} className="w-full h-full object-contain rounded-md" />
      </DialogContent>
    </Dialog>
  );
};
