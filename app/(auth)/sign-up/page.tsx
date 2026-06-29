import { SignupForm } from "@/features/auth/components/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | PayTract",
  description:
    "Join PayTract and start managing client payments the smarter way.",
};

export default function SignUpPage() {
  return <SignupForm />;
}
