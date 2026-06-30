import { DashboardData } from "../types";

export const mockDashboardResponse: DashboardData = {
  user: {
    firstName: "Emeka",
    lastName: "Okafor",
    email: "emeka@example.com",
    kycStatus: "Approved",
  },
  stats: {
    totalRevenue: 2500000,
    activeGigs: 4,
    expectedThisMonth: 850000,
    outstandingPayments: 150000,
    overpayments: 50000,
  },
  recentGigs: [
    {
      id: "gig_1",
      gigName: "E-commerce Website Redesign",
      clientName: "TechCorp Ltd",
      currency: "NGN",
      expectedAmount: 500000,
      receivedAmount: 350000,
      status: "Active",
      paymentStatus: "Underpaid",
      virtualAccount: {
        accountNumber: "1029384756",
        bankName: "Nomba",
        accountName: "PayTract - TechCorp",
      },
      dueDate: "2026-10-15",
    },
    {
      id: "gig_2",
      gigName: "Mobile App API Integration",
      clientName: "FinStartup",
      currency: "NGN",
      expectedAmount: 300000,
      receivedAmount: 300000,
      status: "Active",
      paymentStatus: "Paid",
      virtualAccount: {
        accountNumber: "0987654321",
        bankName: "Nomba",
        accountName: "PayTract - FinStartup",
      },
      dueDate: "2026-10-20",
    },
  ],
};

// Simulate a network request
export const fetchDashboardData = async (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardResponse);
    }, 800); // 800ms artificial delay to test loading states
  });
};
