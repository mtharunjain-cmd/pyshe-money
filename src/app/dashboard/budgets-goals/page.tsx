
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
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
  TrendingUp,
} from 'lucide-react';
import Logo from '@/components/logo';
import Footer from '@/components/footer';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddGoalForm } from '@/components/add-goal-form';
import { AddBudgetForm } from '@/components/add-budget-form';

const initialBudgets = [
  {
    name: 'Monthly Food',
    limit: 15000,
    spent: 9500,
  },
  {
    name: 'Entertainment',
    limit: 5000,
    spent: 2500,
  },
];

const initialGoals = [
  {
    name: 'New Laptop',
    target: 80000,
    saved: 45000,
  },
  {
    name: 'Emergency Fund',
    target: 100000,
    saved: 75000,
  },
];

type Budget = {
  name: string;
  limit: number;
  spent: number;
};

type Goal = {
  name: string;
  target: number;
  saved: number;
};

export default function BudgetsAndGoalsPage() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);

  const addBudget = (data: Omit<Budget, 'id'>) => {
    setBudgets((prev) => [...prev, data]);
    setIsBudgetFormOpen(false);
  };

  const addGoal = (data: Omit<Goal, 'id'>) => {
    setGoals((prev) => [...prev, data]);
    setIsGoalFormOpen(false);
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
              <SidebarMenuButton asChild>
                <Link href="/dashboard/transactions">
                  <ArrowRightLeft />
                  Transactions
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
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
          <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">
                Budgets & Goals
              </h1>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Budgets</CardTitle>
                    <CardDescription>
                      Track your monthly spending limits.
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isBudgetFormOpen}
                    onOpenChange={setIsBudgetFormOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Budget
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a New Budget</DialogTitle>
                      </DialogHeader>
                      <AddBudgetForm onSubmit={addBudget} />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="space-y-6">
                  {budgets.map((budget) => (
                    <div key={budget.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{budget.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ₹{budget.spent.toLocaleString('en-IN')} / ₹
                          {budget.limit.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <Progress value={(budget.spent / budget.limit) * 100} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Financial Goals</CardTitle>
                    <CardDescription>
                      See how close you are to reaching your goals.
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isGoalFormOpen}
                    onOpenChange={setIsGoalFormOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Target className="mr-2 h-4 w-4" />
                        New Goal
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a New Financial Goal</DialogTitle>
                      </DialogHeader>
                      <AddGoalForm onSubmit={addGoal} />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="space-y-6">
                  {goals.map((goal) => (
                    <div key={goal.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ₹{goal.saved.toLocaleString('en-IN')} / ₹
                          {goal.target.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <Progress value={(goal.saved / goal.target) * 100} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
