
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ArrowRightLeft,
  PiggyBank,
  Settings,
  CircleHelp,
  Coins,
  BookOpen,
  Calculator,
  Download,
  Calendar as CalendarIcon,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';
import Logo from '@/components/logo';
import Footer from '@/components/footer';
import Link from 'next/link';
import TransactionList from '@/components/transaction-list';
import { mockTransactions } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import type { Transaction } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddTransactionForm } from '@/components/add-transaction-form';
import { DollarSign } from 'lucide-react';

export default function TransactionsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleTransactionSubmit = (data: Omit<Transaction, "id" | "icon" | "date"> & {date: Date}) => {
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


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-4 flex justify-center">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link href="/dashboard/transactions">
                  <ArrowRightLeft />
                  Transactions
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/budgets-goals">
                  <PiggyBank />
                  Budgets & Goals
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/investment">
                  <TrendingUp />
                  Investment
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/modules">
                  <BookOpen />
                  Modules
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/psychecoins">
                  <Coins />
                  PsycheCoins
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/calculator">
                  <Calculator />
                  Calculator
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/settings">
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/contact">
                  <CircleHelp />
                  Help & Support
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-col flex-1">
        <SidebarInset>
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
             <div className="flex items-center justify-between space-y-2">
              <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">
                Transactions
              </h1>
              <div className="flex flex-col sm:flex-row gap-2">
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
                      <AddTransactionForm onSubmit={handleTransactionSubmit} defaultValues={editingTransaction ?? undefined}/>
                    </DialogContent>
                  </Dialog>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={'outline'}
                      className={cn(
                        'w-full sm:w-[300px] justify-start text-left font-normal',
                        !dateRange && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, 'LLL dd, y')} -{' '}
                            {format(dateRange.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(dateRange.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Download as PDF</DropdownMenuItem>
                    <DropdownMenuItem>Download as Excel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TransactionList 
              transactions={transactions} 
              title="All Transactions" 
              description="A complete log of your income and expenses."
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </SidebarInset>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
