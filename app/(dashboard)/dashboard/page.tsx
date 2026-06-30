"use client";

import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "@/features/dashboard/api/mockData";
import { DashboardData } from "@/features/dashboard/types";
import { TopNav } from "@/components/layout/TopNav";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Note: We use useEffect here for the mock.
  // In Phase 2, this will be replaced with: const { data, isLoading } = useQuery(...)
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
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
              <p className="text-sm text-slate-500 mt-1">
                Track your gig revenues and active accounts.
              </p>
            </div>
            {/* We will put a "Create Gig" Button here in the next step */}
          </div>

          {/* Loading State or Content */}
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p className="text-sm font-medium">
                Loading your financial data...
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <p className="text-slate-600">
                Mock data loaded successfully for{" "}
                <strong>{data?.user.firstName}</strong>. Ready to build the
                Stats Cards and Data Tables!
              </p>
              <pre className="mt-4 p-4 bg-slate-50 rounded-lg text-xs overflow-auto">
                {JSON.stringify(data?.stats, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
