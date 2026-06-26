import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";

export const metadata: Metadata = {
  title: "PayTract",
  description: "Enterprise Fintech Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
