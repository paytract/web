import { OTPInput } from "@/features/auth/components/OTPInput";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | PayTract",
  description: "Enter the verification code sent to your email.",
};

export default function VerifyPage() {
  return <OTPInput />;
}
