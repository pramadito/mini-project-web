"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  MoreHorizontal,
  FileText,
  Check,
  X,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  profilePicture: string | null;
}

interface Ticket {
  id: number;
  name: string;
  price: number;
}

interface TransactionDetail {
  id: number;
  qty: number;
  ticket: Ticket;
}

interface Transaction {
  id: number;
  uuid: string;
  total: number;
  status: "WAITING_FOR_CONFIRMATION" | "PAID" | "REJECT";
  paymentProof: string | null;
  createdAt: string;
  user: User;
  TransactionDetail: TransactionDetail[];
}

export default function ManageTicketsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "WAITING_FOR_CONFIRMATION" | "PAID" | "REJECT" | "ALL"
  >("WAITING_FOR_CONFIRMATION");

  // Fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get("/api/transactions", {
          params: {
            status: statusFilter === "ALL" ? undefined : statusFilter,
            userId: searchQuery ? searchQuery : undefined,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTransactions(response.data);
      } catch (error) {
        toast.error("Failed to fetch transactions");
        console.error("Error fetching transactions:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTransactions();
  }, [statusFilter, searchQuery]);

  const handleStatusChange = async (uuid: string, type: "ACCEPT" | "REJECT") => {
    setIsLoading(prev => ({ ...prev, [uuid]: true }));
    
    try {
      await axios.patch(
        "/transactions",
        { uuid, type },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      // Update local state
      setTransactions(prev =>
        prev.map(transaction =>
          transaction.uuid === uuid
            ? {
                ...transaction,
                status: type === "ACCEPT" ? "PAID" : "REJECT",
              }
            : transaction
        )
      );

      toast.success(
        type === "ACCEPT"
          ? "Payment accepted successfully"
          : "Payment rejected successfully"
      );
    } catch (error) {
      toast.error("Failed to update transaction status");
      console.error("Error updating transaction status:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, [uuid]: false }));
    }
  };

  const viewProof = (imageUrl: string | null) => {
    if (!imageUrl) {
      toast.error("No payment proof available");
      return;
    }
    window.open(imageUrl, "_blank");
  };

  // Map backend status to frontend display status
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "WAITING_FOR_CONFIRMATION":
        return "Pending";
      case "PAID":
        return "Accepted";
      case "REJECT":
        return "Rejected";
      default:
        return status;
    }
  };

  // Calculate total tickets in a transaction
  const getTotalTickets = (details: TransactionDetail[]) => {
    return details.reduce((sum, detail) => sum + detail.qty, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transaction Management</h2>
          <p className="text-muted-foreground">
            Manage user payment submissions and ticket purchases.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by user ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {statusFilter === "ALL" ? "All Statuses" : getStatusDisplay(statusFilter)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("ALL")}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("WAITING_FOR_CONFIRMATION")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("PAID")}>
                  Accepted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("REJECT")}>
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tickets</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading transactions...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.uuid}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={transaction.user.profilePicture || "/avatar.png"}
                            alt={transaction.user.name}
                          />
                          <AvatarFallback>
                            {transaction.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{transaction.user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>${transaction.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {getTotalTickets(transaction.TransactionDetail)} tickets
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "PAID"
                            ? "default"
                            : transaction.status === "REJECT"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {getStatusDisplay(transaction.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={() => viewProof(transaction.paymentProof)}
                          >
                            <FileText className="h-4 w-4" />
                            View Proof
                          </DropdownMenuItem>
                          {transaction.status === "WAITING_FOR_CONFIRMATION" && (
                            <>
                              <DropdownMenuItem
                                className="flex items-center gap-2 text-green-600"
                                onClick={() => handleStatusChange(transaction.uuid, "ACCEPT")}
                                disabled={isLoading[transaction.uuid]}
                              >
                                <Check className="h-4 w-4" />
                                Accept
                                {isLoading[transaction.uuid] && "..."}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center gap-2 text-red-600"
                                onClick={() => handleStatusChange(transaction.uuid, "REJECT")}
                                disabled={isLoading[transaction.uuid]}
                              >
                                <X className="h-4 w-4" />
                                Reject
                                {isLoading[transaction.uuid] && "..."}
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}