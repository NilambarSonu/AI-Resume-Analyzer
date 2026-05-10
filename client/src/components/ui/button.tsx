import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-35 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 tracking-[0.5px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-none hover:brightness-110 hover:glow-gold-sm active:brightness-95",
        destructive:
          "bg-destructive text-white border-none hover:brightness-110 active:brightness-95",
        secondary:
          "bg-transparent text-primary border border-primary hover:bg-primary/8 active:bg-primary/12",
        ghost:
          "bg-transparent text-foreground/60 border-none hover:bg-foreground/5 active:bg-foreground/8",
      },
      size: {
        default: "h-[40px] px-[24px] py-[8px] text-[14px]",
        sm: "h-[32px] px-[16px] py-[6px] text-[12px]",
        md: "h-[40px] px-[24px] py-[8px] text-[14px]",
        lg: "h-[48px] px-[32px] py-[12px] text-[15px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
