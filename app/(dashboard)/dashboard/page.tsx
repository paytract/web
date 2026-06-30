"use client";

import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "@/features/dashboard/api/mockData";
import { DashboardData } from "@/features/dashboard/types";
import { TopNav } from "@/components/layout/TopNav";
import { Loader2, Plus } from "lucide-react";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { RecentGigsTable } from "@/features/dashboard/components/RecentGigsTable";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchDashboardData();
      setData(response);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      <TopNav user={data?.user || null} />

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
              <p className="text-sm text-slate-500 mt-1">
                Track your gig revenues and active accounts.
              </p>
            </div>
            {/* Action Button */}
            <Button className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Create Gig
            </Button>
          </div>

          {/* Main Content Area */}
          {isLoading || !data ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p className="text-sm font-medium">
                Loading your financial data...
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <StatsGrid stats={data.stats} />
              <RecentGigsTable gigs={data.recentGigs} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
