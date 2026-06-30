export type GigStatus = "Active" | "Paused" | "Completed" | "Cancelled";
export type PaymentStatus = "Paid" | "Underpaid" | "Overpaid" | "Pending";

export interface VirtualAccount {
  accountNumber: string;
  bankName: string;
  accountName: string;
}

export interface Gig {
  id: string;
  gigName: string;
  clientName: string;
  currency: string;
  expectedAmount: number;
  receivedAmount: number;
  status: GigStatus;
  paymentStatus: PaymentStatus;
  virtualAccount: VirtualAccount;
  dueDate: string;
}

export interface DashboardStats {
  totalRevenue: number;
  activeGigs: number;
  expectedThisMonth: number;
  outstandingPayments: number;
  overpayments: number;
}

export interface DashboardData {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    kycStatus: "Approved" | "Pending" | "Rejected";
  };
  stats: DashboardStats;
  recentGigs: Gig[];
}
