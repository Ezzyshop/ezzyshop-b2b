import { useState } from "react";
import { XIcon, ZoomInIcon } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
}

export function ImageLightbox({
  src,
  alt = "",
  className,
  imgClassName,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <div
          className={cn("relative inline-block cursor-zoom-in group", className)}
          role="button"
          aria-label="View full image"
        >
          <img
            src={src}
            alt={alt}
            className={cn(
              "rounded-lg border object-cover transition-opacity group-hover:opacity-90",
              imgClassName,
            )}
          />
          {/* hover hint */}
          <div className="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <ZoomInIcon className="h-6 w-6 text-white drop-shadow" />
          </div>
        </div>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">{alt || "Image preview"}</DialogPrimitive.Title>

          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          />

          <DialogPrimitive.Close className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
