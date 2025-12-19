
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  IndianRupee,
  User,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  LogOut,
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
import React, { useEffect, useState } from "react";
import type { Transaction } from "@/lib/types";
import { mockTransactions } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DollarSign } from "lucide-react";
import LinkBankAccount from "./link-bank-account";
import InvestmentPage from "@/app/dashboard/investment/page";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.24,44,30.668,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.81C10.44 7.31 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);


export default function Dashboard() {
  const userAvatar = placeholderImages.find((p) => p.id === "user-avatar");
  const [transactions, setTransactions] =
    React.useState<Transaction[]>(mockTransactions);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [emergencyFundAmount, setEmergencyFundAmount] = React.useState(3500);
  const [isInvestmentPage, setIsInvestmentPage] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      setIsInvestmentPage(currentPath === "/dashboard/investment");
    }
  }, []);


  const { totalIncome, totalExpenses, savings } = React.useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      savings: income - expenses,
    };
  }, [transactions]);


  const handleTransactionSubmit = (data: Omit<Transaction, "id" | "icon" | "date"> & {date: Date}) => {
    if(data.type === 'investment'){
        setEmergencyFundAmount(prev => prev + data.amount);
    }
    
    if (editingTransaction) {
      // Update existing transaction
      const updatedTransactions = transactions.map((t) =>
        t.id === editingTransaction.id ? { ...t, ...data, date: data.date.toISOString() } : t
      );
      setTransactions(updatedTransactions);
    } else {
      // Add new transaction
      const newTransaction: Transaction = {
        id: (transactions.length + 1).toString(),
        ...data,
        date: data.date.toISOString(),
        icon: DollarSign, // Placeholder icon
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }
    setIsFormOpen(false);
    setEditingTransaction(null);
  };
  
  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (transactionId: string) => {
    setTransactions(transactions.filter((t) => t.id !== transactionId));
  };


  const handleSignIn = () => {
    // In a real app, this would involve an auth flow.
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  if (isInvestmentPage) {
    return <InvestmentPage fund={emergencyFundAmount} />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-muted/40">
      <header className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome
        </h1>
        <div className="ml-auto flex items-center gap-4">
          <Dialog open={isFormOpen} onOpenChange={(isOpen) => {
            setIsFormOpen(isOpen);
            if (!isOpen) setEditingTransaction(null);
          }}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTransaction ? 'Edit Transaction' : 'Add a New Transaction'}</DialogTitle>
              </DialogHeader>
              <AddTransactionForm onSubmit={handleTransactionSubmit} defaultValues={editingTransaction ?? undefined} />
            </DialogContent>
          </Dialog>

          {!isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignIn}>
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Sign in with Google
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignIn}>
                  <FacebookIcon className="mr-2 h-4 w-4 fill-blue-600" />
                  Sign in with Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignIn}>
                  <XIcon className="mr-2 h-4 w-4" />
                  Sign in with X
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Avatar className="h-9 w-9 border-2 border-primary/50 cursor-pointer">
                  {userAvatar && (
                    <AvatarImage
                      src={userAvatar.imageUrl}
                      alt="User Avatar"
                      data-ai-hint={userAvatar.imageHint}
                    />
                  )}
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 xl:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Income
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalIncome.toLocaleString('en-IN')}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Expenses
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString('en-IN')}</div>
                <p className="text-xs text-muted-foreground">
                  +12.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all hover:shadow-md bg-primary text-primary-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <IndianRupee className="h-4 w-4 text-primary-foreground/80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{savings.toLocaleString('en-IN')}</div>
                <p className="text-xs text-primary-foreground/80">
                  Your current balance
                </p>
              </CardContent>
            </Card>
          </div>
          <TransactionList transactions={transactions.filter(t => t.type !== 'investment').slice(0, 5)} onEdit={handleEdit} onDelete={handleDelete}/>
          <LinkBankAccount />
          <SubscriptionPlans />
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1 xl:col-span-1">
          <FinancialRatios 
            totalIncome={totalIncome} 
            totalExpenses={totalExpenses} 
            emergencyFund={emergencyFundAmount}
          />
        </div>
      </main>
    </div>
  );
}
