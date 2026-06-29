import { AuthSuccessView } from "@/features/auth/components/AuthSuccessView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success | PayTract",
};

export default function SuccessPage() {
  return (
    <AuthSuccessView
      title="Account Created!"
      message="Your PayTract account has been successfully created. You can now proceed to set up your business profile."
      ctaText="Continue to Dashboard"
      href="/dashboard"
    />
  );
}
