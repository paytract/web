import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-slate-100 text-slate-800 hover:bg-slate-200",
        brand:
          "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20",
        success: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
        warning: "bg-amber-100 text-amber-700 hover:bg-amber-200",
        danger: "bg-red-100 text-red-700 hover:bg-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
