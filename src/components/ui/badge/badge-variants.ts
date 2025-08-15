import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      status: {
        PENDING: "bg-yellow-400/90 text-black",
        SUCCESS: "bg-green-400/90 text-black",
        REFUNDED: "bg-red-400/90 text-black",
        CANCELLED: "bg-red-400/90 text-black",
        VERIFIED: "bg-green-400/90 text-black",
        REJECTED: "bg-red-400/90 text-black",
        NEW: "bg-blue-400/90 text-black",
        PROCESSING: "bg-yellow-400/90 text-black",
        DELIVERING: "bg-green-400/90 text-black",
        COMPLETED: "bg-green-400/90 text-black",
      },
    },
    defaultVariants: {
      variant: "default",
      status: "PENDING",
    },
  }
);
