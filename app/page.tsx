import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import logo from "@/public/assets/logo.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            className="h-8 w-auto"
            priority
            alt="Logo"
            width={120}
            height={32}
          />
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 max-w-3xl leading-tight">
          Payments for modern businesses,{" "}
          <span className="text-brand-primary">simplified.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-xl">
          Securely manage, track, and automate your client payments with
          PayTract.
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg" asChild>
            <Link href="/sign-up">Create Free Account</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
