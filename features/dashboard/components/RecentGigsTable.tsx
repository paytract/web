import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Gig, PaymentStatus, GigStatus } from "../types";

interface RecentGigsTableProps {
  gigs: Gig[];
}

export const RecentGigsTable = ({ gigs }: RecentGigsTableProps) => {
  // Helper to map Payment Status to Badge Variants
  const getPaymentBadgeVariant = (status: PaymentStatus) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Underpaid":
        return "danger";
      case "Overpaid":
        return "warning";
      default:
        return "default";
    }
  };

  // Helper to map Gig Status to Badge Variants
  const getGigBadgeVariant = (status: GigStatus) => {
    switch (status) {
      case "Active":
        return "brand";
      case "Completed":
        return "default";
      case "Paused":
        return "warning";
      case "Cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Card className="border-slate-200/60 shadow-sm overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-white px-6 py-5">
        <CardTitle className="text-lg">Recent Gigs & Accounts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Gig / Client</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Gig Status</TableHead>
              <TableHead className="pr-6 text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gigs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-slate-500"
                >
                  No gigs found. Create your first gig to get started!
                </TableCell>
              </TableRow>
            ) : (
              gigs.map((gig) => (
                <TableRow key={gig.id}>
                  <TableCell className="pl-6">
                    <div className="font-medium text-slate-900">
                      {gig.gigName}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {gig.clientName}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-slate-700">
                    {formatCurrency(gig.expectedAmount, gig.currency)}
                  </TableCell>
                  <TableCell className="font-medium text-slate-700">
                    {formatCurrency(gig.receivedAmount, gig.currency)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPaymentBadgeVariant(gig.paymentStatus)}>
                      {gig.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getGigBadgeVariant(gig.status)}>
                      {gig.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-6 text-right text-slate-500">
                    {formatDate(gig.dueDate)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
