
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";


type FinancialRatiosProps = {
  totalIncome?: number;
  totalExpenses?: number;
  totalDebt?: number;
  emergencyFund?: number;
};

export default function FinancialRatios({ 
  totalIncome = 40000, 
  totalExpenses = 4550.5, 
  totalDebt = 0, 
  emergencyFund = 3500 
}: FinancialRatiosProps) {
  
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;
  const debtToIncomeRatio = totalIncome > 0 ? (totalDebt / totalIncome) * 100 : 0;
  const emergencyFundMonths = totalExpenses > 0 ? emergencyFund / totalExpenses : 0;

  // Simplified health score calculation
  const financialHealthScore = React.useMemo(() => {
    let score = 0;
    if (savingsRate > 20) score += 40;
    else if (savingsRate > 10) score += 20;

    if (debtToIncomeRatio < 20) score += 30;
    else if (debtToIncomeRatio < 40) score += 15;
    
    if (emergencyFundMonths >= 3) score += 30;
    else if (emergencyFundMonths >= 1) score += 15;
    
    return Math.min(score, 100);
  }, [savingsRate, debtToIncomeRatio, emergencyFundMonths]);


  const emergencyFundProgress = (emergencyFundMonths / 6) * 100;
  return (
    <TooltipProvider>
    <div className="space-y-4 md:space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Financial Ratios</CardTitle>
          <CardDescription>Your key financial health metrics.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Savings Rate</span>
              <span className="font-headline text-lg font-bold">
                {savingsRate.toFixed(0)}%
              </span>
            </div>
            <Progress
              value={savingsRate}
              aria-label={`${savingsRate.toFixed(0)}% savings rate`}
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Debt-to-Income</span>
              <span className="font-headline text-lg font-bold">
                {debtToIncomeRatio.toFixed(0)}%
              </span>
            </div>
            <Progress
              value={debtToIncomeRatio}
              aria-label={`${debtToIncomeRatio.toFixed(0)}% debt to income ratio`}
            />
          </div>
           <div>
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                   <span className="text-sm font-medium">Emergency Fund</span>
                    <Tooltip>
                        <TooltipTrigger>
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Months of expenses covered by your savings. Aim for 3-6 months.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
              <span className="font-headline text-lg font-bold">
                {emergencyFundMonths.toFixed(1)} mo
              </span>
            </div>
            <Progress
              value={emergencyFundProgress}
              aria-label={`${emergencyFundProgress.toFixed(0)}% of 6-month emergency fund goal`}
            />
          </div>
        </CardContent>
        <CardFooter>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            These are estimates based on your data.
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Financial Health Score</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="relative h-28 w-28">
            <svg
              className="h-full w-full -rotate-90"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-muted/50"
                strokeWidth="3"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-primary"
                strokeWidth="3"
                strokeDasharray={`${financialHealthScore}, 100`}
                strokeLinecap="round"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-headline text-4xl font-bold text-primary">
                {financialHealthScore}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1 pt-4">
          <p className="text-sm font-medium">Good</p>
          <p className="text-xs text-muted-foreground">
            Your score is looking great. Keep it up!
          </p>
        </CardFooter>
      </Card>
    </div>
    </TooltipProvider>
  );
}
