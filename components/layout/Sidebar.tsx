"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Receipt,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/public/assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSidebarOpen } from "@/store/slices/appSlice";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Gigs", href: "/gigs", icon: Briefcase },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.app.isSidebarOpen,
  );

  // Reusable content for both Desktop and Mobile views
  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Link
          href="/dashboard"
          className="flex items-center"
          onClick={() => dispatch(setSidebarOpen(false))}
        >
          <Image src={logo} alt="PayTract" width={30} height={28} priority />
          <h1 className=" text-[26px] font-semibold ml-2">
            <span className="font-bold text-[#001F63]">ay</span>
            <span className="text-sky-400">Tract</span>
          </h1>
        </Link>
        {/* Mobile Close Button */}
        <button
          className="md:hidden text-slate-400 hover:text-slate-600"
          onClick={() => dispatch(setSidebarOpen(false))}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => dispatch(setSidebarOpen(false))} // Close sidebar on mobile nav
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-brand-primary" : "text-slate-400",
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 shrink-0">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors">
          <LogOut className="h-5 w-5 text-red-500" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* ── MOBILE SIDEBAR ── */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Dark Overlay (Click to close) */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => dispatch(setSidebarOpen(false))}
          />

          {/* Sliding Panel */}
          <aside className="relative w-64 max-w-[80%] bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};
