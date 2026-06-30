import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/formatters";
import {
  Wallet,
  TrendingUp,
  AlertCircle,
  ArrowDownUp,
  Briefcase,
} from "lucide-react";
import { DashboardStats } from "../types";

interface StatsGridProps {
  stats: DashboardStats;
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: Wallet,
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
    },
    {
      title: "Expected This Month",
      value: formatCurrency(stats.expectedThisMonth),
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Outstanding Payments",
      value: formatCurrency(stats.outstandingPayments),
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Overpayments",
      value: formatCurrency(stats.overpayments),
      icon: ArrowDownUp,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Active Gigs",
      value: stats.activeGigs.toString(),
      icon: Briefcase,
      color: "text-slate-600",
      bgColor: "bg-slate-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="border-slate-200/60 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bgColor}`}
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h4 className="text-xl font-bold text-slate-900 mt-0.5">
                {stat.value}
              </h4>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
