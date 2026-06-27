import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix"
> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, prefix, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-[12.5px] font-medium text-slate-600">
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full group">
          {/* Prefix (e.g., +234) */}
          {prefix && (
            <div className="absolute left-0 top-0 bottom-0 flex items-center px-3 border-r border-slate-200 bg-slate-50 text-slate-500 rounded-l-lg text-[13px] select-none z-10">
              {prefix}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            className={cn(
              // Layout & Sizing (38px height from Figma)
              "w-full h-[38px] px-3 text-[13.5px] rounded-lg border bg-slate-50/50 transition-all",
              // Theming
              "border-slate-200 text-slate-900 placeholder:text-slate-400",
              // Interactive States
              "focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 focus:bg-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              // Conditional Padding for Prefix/Icon
              prefix && "pl-16",
              icon && "pr-10",
              // Error States
              error &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/10 bg-red-50/5",
              className,
            )}
            {...props}
          />

          {/* Suffix Icon (e.g., Eye icon) */}
          {icon && (
            <div className="absolute right-3 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
              {icon}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <span className="text-[11px] text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
