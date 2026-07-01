"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLogin } from "../hooks/useLogin";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: submitLogin, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const emailValue = watch("email");
  const forgotPasswordHref = emailValue
    ? `/forgot-password?email=${encodeURIComponent(emailValue)}`
    : "/forgot-password";

  const onSubmit = (data: LoginFormValues) => {
    submitLogin({ email: data.email, password: data.password });
  };

  return (
    <div className="w-full flex flex-col lg:items-center">
      {/* ── MOBILE HEADER ── */}
      <div className="relative lg:hidden h-[260px] w-full overflow-hidden bg-[#2575FF] px-6 pt-12 text-white shrink-0">
        <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/10" />
        <Link href="/" className="relative z-20 mb-6 inline-block p-1 -ml-1">
          <ArrowLeft size={24} />
        </Link>
        <div className="relative z-10">
          <h1 className="text-[26px] font-semibold leading-tight text-white">
            Welcome <br /> <span className="font-bold">Back!</span>
          </h1>
          <p className="text-[14px] opacity-90 mt-2">
            Sign in to continue managing your payments.
          </p>
        </div>
      </div>

      {/* ── FORM CARD ── */}
      <div
        className={cn(
          "w-full bg-white p-6 lg:p-10 lg:rounded-2xl lg:border lg:border-black/[0.05] lg:shadow-sm lg:max-w-[460px] lg:my-10",
          "-mt-10 lg:mt-0 rounded-t-[40px] relative z-20",
        )}
      >
        <div className="hidden lg:block mb-8">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Sign in
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Enter your credentials to access your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email Address"
            placeholder="name@company.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <div className="space-y-1">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="************"
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="text-right">
              <Link
                href={forgotPasswordHref}
                className="text-[13px] text-brand-primary font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 mt-4 font-semibold"
            isLoading={isPending}
            disabled={isPending}
          >
            Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-center text-sm text-slate-500 pt-4">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-brand-primary font-bold hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
