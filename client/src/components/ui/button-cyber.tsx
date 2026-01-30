import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  isLoading?: boolean;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] border-transparent",
      secondary: "bg-secondary text-secondary-foreground hover:shadow-[0_0_20px_rgba(191,0,255,0.5)] border-transparent",
      outline: "bg-transparent border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
      danger: "bg-destructive text-destructive-foreground hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] border-transparent",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative px-8 py-3 font-display font-bold uppercase tracking-widest text-sm transition-all duration-300",
          "clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px]", // Attempt at corner cut, simpler to just use border radius in CSS for standard buttons, but let's try a simpler approach
          "rounded-sm border-2", // Reset clip path complex for now, stick to CSS borders
          variants[variant],
          disabled && "opacity-50 cursor-not-allowed hover:shadow-none",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {children}
        </span>
      </button>
    );
  }
);
CyberButton.displayName = "CyberButton";
