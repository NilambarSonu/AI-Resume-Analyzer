import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-[12px] py-[4px] text-[11px] font-medium uppercase tracking-[0.5px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/12 text-primary",
        secondary:
          "border-transparent bg-foreground/5 text-foreground/60",
        destructive:
          "border-transparent bg-error/10 text-error",
        outline:
          "text-foreground/60 border-border bg-transparent",
        success:
          "border-transparent bg-success/10 text-success",
        warning:
          "border-transparent bg-warning/10 text-warning",
        premium:
          "border-transparent bg-primary/12 text-primary",
        filter:
          "border-border text-foreground/60 bg-transparent hover:border-primary/50 hover:text-primary active:bg-primary/10 active:border-primary active:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }
