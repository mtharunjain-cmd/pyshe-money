"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DollarSign,
  User,
  TrendingUp,
  TrendingDown,
  PlusCircle,
} from "lucide-react";
import FinancialRatios from "./financial-ratios";
import SubscriptionPlans from "./subscription-plans";
import TransactionList from "./transaction-list";
import { placeholderImages } from "@/lib/placeholder-images";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddTransactionForm } from "./add-transaction-form";
import React from "react";
import type { Transaction } from "@/lib/types";
import { mockTransactions } from "@/lib/mock-data";

export default function Dashboard() {
  const userAvatar = placeholderImages.find((p) => p.id === "user-avatar");
  const [transactions, setTransactions] =
    React.useState<Transaction[]>(mockTransactions);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const addTransaction = (data: Omit<Transaction, "id" | "icon" | "date"> & {date: Date}) => {
    // In a real app, you'd get the icon based on the category
    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      ...data,
      date: data.date.toISOString(),
      icon: DollarSign, // Placeholder icon
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    setIsFormOpen(false); // Close the dialog
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <header className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">
          Dashboard
        </h1>
        <div className="ml-auto flex items-center gap-4">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a New Transaction</DialogTitle>
              </DialogHeader>
              <AddTransactionForm onSubmit={addTransaction} />
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Avatar className="h-9 w-9 border">
            {userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt="User Avatar"
                data-ai-hint={userAvatar.imageHint}
              />
            )}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 xl:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Income
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹1,50,000</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Expenses
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹89,450</div>
                <p className="text-xs text-muted-foreground">
                  +12.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹60,550</div>
                <p className="text-xs text-muted-foreground">
                  Your current balance
                </p>
              </CardContent>
            </Card>
          </div>
          <TransactionList transactions={transactions} />
          <SubscriptionPlans />
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1 xl:col-span-1">
          <FinancialRatios />
        </div>
      </main>
    </div>
  );
}
