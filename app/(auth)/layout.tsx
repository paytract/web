"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.png";
import { ShieldCheck, LineChart, Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Full screen container, no max-width at this level
    <div className="flex w-full min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ── DESKTOP SIDEBAR (40% Width, Full Height) ── */}
      <div className="hidden lg:flex w-[40%] bg-brand-primary p-16 flex-col justify-between text-white shrink-0 sticky top-0 h-screen">
        <div>
          {/* Brand/Logo - Same as Landing Page */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="PayTract Logo"
              width={70}
              height={40}
              priority
            />
          </Link>

          <div className="mt-5">
            <h2 className="text-[36px] font-semibold leading-tight">
              Manage client payments <br /> the smarter way
            </h2>
            <p className="text-[16px] opacity-70 mt-4 max-w-sm">
              Join thousands of businesses who trust PayTract to streamline
              their payment workflows.
            </p>
          </div>

          {/* Features */}
          <div className="mt-16 space-y-8">
            <Feature
              icon={<ShieldCheck />}
              title="Bank-grade security"
              desc="256-bit encryption on every transaction"
            />
            <Feature
              icon={<LineChart />}
              title="Real-time analytics"
              desc="Track revenue and client activity live"
            />
            <Feature
              icon={<Zap />}
              title="Instant payouts"
              desc="Settle to your account in under 24 hours"
            />
          </div>
        </div>

        <div className="text-[13px] opacity-40 pt-2">
          © {new Date().getFullYear()} PayTract Inc. · Privacy · Terms
        </div>
      </div>

      {/* ── CONTENT AREA (60% Width on Desktop, 100% on Mobile) ── */}
      <div className="flex-1 bg-white lg:bg-[#f8f7f5] flex flex-col min-h-screen">
        {/* Children will contain the Mobile Header + the Form Card */}
        <div className="w-full flex-1 flex flex-col items-center justify-start lg:justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

const Feature = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
      {icon}
    </div>
    <div className="text-[14px]">
      <strong className="block text-white font-semibold mb-0.5">{title}</strong>
      <span className="text-white/60 leading-relaxed">{desc}</span>
    </div>
  </div>
);
