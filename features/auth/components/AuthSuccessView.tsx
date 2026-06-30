"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SuccessProps {
  title: string;
  message: string;
  ctaText: string;
  href: string;
}

export const AuthSuccessView = ({
  title,
  message,
  ctaText,
  href,
}: SuccessProps) => {
  return (
    <div className="w-full flex flex-col lg:items-center">
      {/* Decorative mobile header for consistency */}
      <div className="relative lg:hidden h-[200px] w-full overflow-hidden bg-[#2575FF] shrink-0">
        <div className="absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full bg-white/10" />
      </div>

      <div
        className={cn(
          "w-full bg-white p-8 lg:p-12 lg:rounded-3xl lg:border lg:border-black/[0.05] lg:shadow-sm lg:max-w-[480px] lg:my-10",
          "-mt-12 lg:mt-0 rounded-t-[40px] relative z-20 text-center space-y-8",
        )}
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
          <p className="text-[15px] text-slate-500 mt-3 leading-relaxed">
            {message}
          </p>
        </div>
        <Button asChild className="w-full h-12 font-semibold">
          <Link href={href}>{ctaText}</Link>
        </Button>
      </div>
    </div>
  );
};
