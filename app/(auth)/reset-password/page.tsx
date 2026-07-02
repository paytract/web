import React, { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | PayTract",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Just a sec...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
