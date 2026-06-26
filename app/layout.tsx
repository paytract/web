import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";

// Configure Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "PayTract",
  description: "Manage client payments the smarter way.", //TBD
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-white text-text-main antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
