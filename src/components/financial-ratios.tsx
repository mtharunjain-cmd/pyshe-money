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
import { Info } from "lucide-react";

const savingsRate = 40; // in percent
const debtToIncomeRatio = 20; // in percent
const financialHealthScore = 78;

export default function FinancialRatios() {
  return (
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
                {savingsRate}%
              </span>
            </div>
            <Progress
              value={savingsRate}
              aria-label={`${savingsRate}% savings rate`}
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Debt-to-Income</span>
              <span className="font-headline text-lg font-bold">
                {debtToIncomeRatio}%
              </span>
            </div>
            <Progress
              value={debtToIncomeRatio}
              aria-label={`${debtToIncomeRatio}% debt to income ratio`}
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
  );
}
