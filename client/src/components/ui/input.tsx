import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { error?: boolean }>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[40px] w-full rounded-md border border-border bg-input px-4 py-[10px] text-[15px] font-light transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:border-primary focus-visible:glow-gold-sm hover:border-foreground/30 disabled:cursor-not-allowed disabled:opacity-35",
          error && "border-error focus-visible:border-error focus-visible:ring-error shadow-[0_0_6px_rgba(239,68,68,0.2)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
