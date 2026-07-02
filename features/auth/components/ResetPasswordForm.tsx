"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCheckToken, useConfirmReset } from "../hooks/usePasswordReset";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);

  // 🚀 DECLARATIVE DATA FETCHING (No useEffect needed!)
  const { isLoading, isError, isSuccess } = useCheckToken(userId, token);
  const { mutate: confirmReset, isPending } = useConfirmReset();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: ResetFormValues) => {
    if (userId && token) {
      confirmReset({ user_id: userId, token, new_password: data.password });
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="p-10 text-center text-slate-500 animate-pulse">
        Validating secure link...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:items-center">
      <div className="relative lg:hidden h-[200px] w-full overflow-hidden bg-[#2575FF] shrink-0">
        <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/10" />
      </div>

      <div
        className={cn(
          "w-full bg-white p-6 lg:p-10 lg:rounded-2xl lg:border lg:border-black/[0.05] lg:shadow-sm lg:max-w-[460px] lg:my-10",
          "-mt-10 lg:mt-0 rounded-t-[40px] relative z-20",
        )}
      >
        {/* 2. Error State (Token is invalid, expired, or missing params) */}
        {!userId || !token || isError ? (
          <div className="text-center py-6">
            <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Link Expired</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Button
              onClick={() => router.push("/forgot-password")}
              className="w-full"
            >
              Request New Link
            </Button>
          </div>
        ) : (
          /* 3. Success State (Token is valid, show form) */
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900">
                Create New Password
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Enter your new secure password below.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="New Password"
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
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />
              <Button
                type="submit"
                isLoading={isPending}
                disabled={isPending}
                className="w-full h-12 font-semibold mt-2"
              >
                Save New Password
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
