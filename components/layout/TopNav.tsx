"use client";

import React from "react";
import { Bell, Menu, Search } from "lucide-react";
import { DashboardData } from "@/features/dashboard/types";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/slices/appSlice";

interface TopNavProps {
  user: DashboardData["user"] | null;
}

export const TopNav = ({ user }: TopNavProps) => {
  const dispatch = useDispatch();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Mobile Menu Toggle & Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Dispatches the Redux Action */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-lg"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center relative w-full max-w-md">
          <Search className="h-4 w-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search gigs, clients, or transactions..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border-transparent focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 rounded-lg text-sm transition-all outline-none"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 hover:bg-slate-50 rounded-full transition-colors">
          <div className="h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-sm">
            {user ? `${user.firstName[0]}${user.lastName[0]}` : "U"}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-700 leading-none">
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
            </p>
            {user?.kycStatus === "Approved" && (
              <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
