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
import logo from "@/public/assets/logo.png";
import { COUNTRIES, Country } from "../utils/countries";
import Link from "next/link";
import { useSignup } from "../hooks/useSignup";

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
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { mutate: submitSignup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignupFormValues) => {
    const full_name = `${data.firstName.trim()} ${data.lastName.trim()}`;

    const rawPhone = data.phone.replace(/^0+/, "");
    const phone = `${selectedCountry.code}${rawPhone}`;

    submitSignup({
      email: data.email,
      password: data.password,
      full_name,
      phone,
    });
  };

  return (
    <div className="w-full flex flex-col lg:items-center">
      {/* ── MOBILE HEADER (Only visible on Mobile) ── */}
      <div className="relative lg:hidden h-[260px] w-full overflow-hidden bg-[#2575FF] px-6 pt-12 text-white shrink-0">
        {/* Circles */}
        <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/10" />
        <div className="absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full bg-white/10" />

        {/* Back Button */}
        <Link href="/" className="relative z-20 mb-6 inline-block p-1 -ml-1">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>

        <div className="relative z-10">
          <h1 className="text-[26px] font-semibold leading-tight">
            Create Your <br />
            <span className="text-[#001F63] font-bold">PayTract</span> Account
          </h1>
          <p className="text-[14px] opacity-90 mt-2">
            Start managing client payments the smarter way.
          </p>
        </div>
      </div>

      {/* ── FORM CARD ── */}
      <div
        className={cn(
          "w-full bg-white p-6 lg:p-10 lg:rounded-2xl lg:border lg:border-black/[0.05] lg:shadow-sm lg:max-w-[460px] lg:my-10",
          "-mt-10 lg:mt-0 rounded-t-[40px] relative z-20", // Deep overlap for mobile
        )}
      >
        {/* Desktop Header inside the Card */}
        <div className="hidden lg:block mb-8">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create account
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Get started — it takes less than 2 minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ... ALL YOUR INPUTS REMAIN THE SAME ... */}

          <div className="grid grid-cols-2 gap-3.5">
            <Input
              label="First name"
              placeholder="Bruce"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <Input
              label="Last name"
              placeholder="Wayne"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>

          <Input
            label="Email address"
            type="email"
            placeholder="batman@company.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Phone Number"
            placeholder="800 000 1939"
            {...register("phone")}
            error={errors.phone?.message}
            prefix={
              <div className="relative h-full flex items-center">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 h-full hover:bg-slate-100 transition-colors rounded-l-lg border-r border-slate-200"
                >
                  <span className="text-[16px] leading-none">
                    {selectedCountry.flag}
                  </span>
                  <span className="text-[13px] font-medium text-slate-700">
                    {selectedCountry.code}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 text-slate-400 transition-transform",
                      isDropdownOpen && "rotate-180",
                    )}
                  />
                </button>

                {/* Actual Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    {/* Overlay to close when clicking outside */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />

                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      {COUNTRIES.map((c) => (
                        <button
                          key={c.iso}
                          type="button"
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <span className="text-lg">{c.flag}</span>
                          <span className="font-medium">{c.code}</span>
                          <span className="text-slate-400 text-xs ml-auto">
                            {c.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600"
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-400 hover:text-slate-600"
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

          <Button
            type="submit"
            className="w-full h-12 mt-4 font-semibold text-base"
            isLoading={isPending}
            disabled={isPending}
          >
            Create account <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-center text-sm text-slate-500 pt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-primary font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
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
