"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const schema = z.object({ email: z.string().email("Valid email is required") });

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="w-full flex flex-col lg:items-center">
      {/* ── MOBILE HEADER ── */}
      <div className="relative lg:hidden h-[260px] w-full overflow-hidden bg-[#2575FF] px-6 pt-12 text-white shrink-0">
        <Link
          href="/login"
          className="relative z-20 mb-6 inline-block p-1 -ml-1"
        >
          <ArrowLeft size={24} />
        </Link>
        <div className="relative z-10">
          <h1 className="text-[26px] font-semibold leading-tight">
            Reset <br /> <span className="font-bold">Password</span>
          </h1>
          <p className="text-[14px] opacity-90 mt-2">
            Recover access to your account.
          </p>
        </div>
      </div>

      <div
        className={cn(
          "w-full bg-white p-6 lg:p-10 lg:rounded-2xl lg:border lg:border-black/[0.05] lg:shadow-sm lg:max-w-[460px] lg:my-10",
          "-mt-10 lg:mt-0 rounded-t-[40px] relative z-20",
        )}
      >
        <div className="hidden lg:block mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Forgot Password</h3>
          <p className="text-sm text-slate-500 mt-1">
            We'll send a reset link to your email.
          </p>
        </div>

        <form
          onSubmit={handleSubmit((d) => console.log(d))}
          className="space-y-6"
        >
          <Input
            label="Email Address"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message as string}
          />
          <Button className="w-full h-12 font-semibold">
            Send Reset Link <Send size={16} className="ml-2" />
          </Button>
          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-slate-500 hover:text-brand-primary"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
