"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  LineChart,
  Zap,
  Wallet,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => console.log(data);

  return (
    <div className="flex w-full min-h-screen bg-white md:bg-bg-app items-center justify-center">
      <div className="flex w-full md:max-w-[900px] md:min-h-[620px] md:rounded-2xl overflow-hidden md:shadow-2xl bg-white flex-col md:flex-row">
        {/* ── MOBILE HEADER (Hidden on Desktop) ── */}
        <div className="relative md:hidden h-[240px] w-full overflow-hidden bg-[#2575FF] px-6 pt-16 text-white shrink-0">
          {/* Circles */}
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/10" />
          <div className="absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full bg-white/10" />
          <button
            type="button"
            className="bg-slate-40 mb-6 -mt-2 p-1 hover:bg-slate-50 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 hover:text-slate-800 text-slate-50" />
          </button>
          <div className="relative z-10">
            <h1 className="text-[24px] font-semibold leading-tight">
              Create Your <br />{" "}
              <span className="text-[#001F63] font-semibold">PayTract</span>{" "}
              Account
            </h1>
            <p className="text-[13px] opacity-90 mt-2">
              Start managing client payments the smarter way.
            </p>
          </div>
        </div>

        {/* ── DESKTOP SIDEBAR (Hidden on Mobile) ── */}
        <div className="hidden md:flex w-[42%] bg-brand-primary p-12 flex-col justify-between text-white shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src={logo}
                className="h-8 w-auto"
                priority
                alt="Logo"
                width={120}
                height={32}
              />
              <span className="text-[18px] font-semibold">
                Pay<span className="opacity-60 font-normal">Tract</span>
              </span>
            </div>
            <div className="mt-11">
              <h2 className="text-[30px] font-semibold leading-tight">
                Manage client payments the smarter way
              </h2>
              <p className="text-[14.5px] opacity-70 mt-3">
                Join thousands of businesses who trust PayTract.
              </p>
            </div>
            <div className="mt-11 space-y-5">
              <Feature
                icon={<ShieldCheck />}
                title="Bank-grade security"
                desc="256-bit encryption"
              />
              <Feature
                icon={<LineChart />}
                title="Real-time analytics"
                desc="Track revenue live"
              />
              <Feature
                icon={<Zap />}
                title="Instant payouts"
                desc="Settle in under 24 hours"
              />
            </div>
          </div>
          <div className="text-[11.5px] opacity-30">© 2026 PayTract Inc.</div>
        </div>

        {/* ── FORM CONTAINER (Scrollable on Mobile) ── */}
        <div className="flex-1 bg-white md:bg-bg-panel-light flex items-start md:items-center justify-center">
          <div
            className={cn(
              "w-full bg-white p-6 md:p-9 md:border md:border-black/[0.08] md:rounded-2xl md:max-w-[420px]",
              "-mt-6 md:mt-0 rounded-t-3xl relative z-20", // Overlap curve on mobile
            )}
          >
            <div className="hidden md:block mb-6">
              <h3 className="text-xl font-semibold">Create your account</h3>
              <p className="text-[13.5px] text-text-muted mt-1">
                Get started in less than 2 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <Input
                  label="First name"
                  placeholder="Emeka"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Last name"
                  placeholder="Okafor"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
              </div>

              <Input
                label="Email address"
                type="email"
                placeholder="emeka@company.com"
                {...register("email")}
                error={errors.email?.message}
              />

              <Input
                label="Phone number"
                placeholder="800 000 0000"
                prefix={
                  <span className="flex items-center gap-1">
                    +234 <ChevronDown className="h-3 w-3" />
                  </span>
                }
                {...register("phone")}
                error={errors.phone?.message}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                  {...register("password")}
                  error={errors.password?.message}
                />
                <Input
                  label="Confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  icon={
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  }
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 accent-brand-primary"
                  required
                />
                <label htmlFor="terms" className="text-[12.5px] text-slate-500">
                  I agree to the{" "}
                  <span className="text-brand-primary cursor-pointer">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              <Button type="submit" className="w-full mt-2">
                Create account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-center text-[13px] text-text-muted">
                Already have an account?{" "}
                <span className="text-brand-primary font-semibold cursor-pointer">
                  Sign in
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for Sidebar Features
const Feature = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex items-start gap-3.5">
    <div className="w-[34px] h-[34px] bg-white/12 rounded-lg flex items-center justify-center text-white">
      {icon}
    </div>
    <div className="text-[13.5px] leading-normal">
      <strong className="block text-white font-medium">{title}</strong>
      <span className="text-white/70">{desc}</span>
    </div>
  </div>
);
