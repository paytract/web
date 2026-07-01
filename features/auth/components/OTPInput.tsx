"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmail, useResendVerification } from "../hooks/useVerify";

export const OTPInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60); // 60 second buff time
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: submitVerify, isPending } = useVerifyEmail();
  const { mutate: resendCode, isPending: isResending } =
    useResendVerification();

  // Route Guard
  useEffect(() => {
    if (!email) router.replace("/sign-up");
  }, [email, router]);

  // Timer Logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();

    // Auto submit on 6th digit
    if (value && index === 5 && email) {
      const fullCode = newOtp.join("");
      if (fullCode.length === 6) submitVerify({ email, code: fullCode });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const handleResend = () => {
    if (email && countdown === 0) {
      resendCode(email);
      setCountdown(60); // Reset timer
    }
  };

  if (!email) return null; // Don't render until guard passes

  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");
    const [provider, extension] = domain.split(".");

    const maskedUsername =
      username.length > 5
        ? `${username.slice(0, 5)}**`
        : `${username.slice(0, 2)}**`;

    const maskedProvider =
      provider.length > 2 ? `**${provider.slice(-2)}` : "**";

    return `${maskedUsername}@${maskedProvider}.${extension}`;
  };

  return (
    <div className="w-full flex flex-col lg:items-center">
      {/* ── MOBILE HEADER ── */}
      <div className="relative lg:hidden h-[260px] w-full overflow-hidden bg-[#2575FF] px-6 pt-12 text-white shrink-0">
        <Link
          href="/sign-up"
          className="relative z-20 mb-6 inline-block p-1 -ml-1"
        >
          <ArrowLeft size={24} />
        </Link>
        <div className="relative z-10">
          <h1 className="text-[26px] font-semibold leading-tight text-white">
            Verify <span className="font-bold">Email</span>
          </h1>
          <p className="mt-2 text-sm text-white/90">
            We've sent a verification code to{" "}
            <span className="font-bold text-white">{maskEmail(email)}</span>
          </p>
        </div>
      </div>

      <div
        className={cn(
          "w-full bg-white p-6 lg:p-10 lg:rounded-2xl lg:border lg:border-black/[0.05] lg:shadow-sm lg:max-w-[460px] lg:my-10",
          "-mt-10 lg:mt-0 rounded-t-[40px] relative z-20",
        )}
      >
        <div className="hidden lg:block text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="text-brand-primary" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Verify your mail
          </h3>
          <p className="text-sm text-slate-500 mt-2 px-6">
            We've sent a verification code to your email address.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between gap-2 max-w-sm mx-auto">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                disabled={isPending}
                className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold border border-slate-200 rounded-xl focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all bg-slate-50 focus:bg-white"
              />
            ))}
          </div>

          <Button
            className="w-full h-12 font-semibold"
            isLoading={isPending}
            disabled={otp.join("").length !== 6 || isPending}
            onClick={() => submitVerify({ email, code: otp.join("") })}
          >
            Verify Account
          </Button>

          <div className="text-center">
            <p className="text-sm text-slate-500">
              Didn't get the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || isResending}
                className="text-brand-primary font-bold hover:underline disabled:opacity-50 disabled:no-underline transition-all"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
