import { LoginForm } from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | PayTract",
  description: "Sign in to your PayTract account to manage your payments.",
};

export default function LoginPage() {
  return <LoginForm />;
}
