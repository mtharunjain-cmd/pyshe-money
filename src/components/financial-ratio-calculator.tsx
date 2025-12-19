
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  totalIncome: z.coerce.number().min(0, "Income must be a positive number."),
  totalExpenses: z.coerce.number().min(0, "Expenses must be a positive number."),
  totalDebt: z.coerce.number().min(0, "Debt must be a positive number."),
  emergencyFund: z.coerce.number().min(0, "Emergency fund must be a positive number."),
});

type RatioFormValues = z.infer<typeof formSchema>;

type Ratios = {
    savingsRate: number;
    expenseRate: number;
    dscr: number;
    emergencyRatio: number;
};

export default function FinancialRatioCalculator() {
  const [result, setResult] = useState<Ratios | null>(null);

  const form = useForm<RatioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalIncome: 0,
      totalExpenses: 0,
      totalDebt: 0,
      emergencyFund: 0,
    },
  });

  const onSubmit = (data: RatioFormValues) => {
    const savings = data.totalIncome - data.totalExpenses;
    const savingsRate = data.totalIncome > 0 ? (savings / data.totalIncome) * 100 : 0;
    const expenseRate = data.totalIncome > 0 ? (data.totalExpenses / data.totalIncome) * 100 : 0;
    const dscr = data.totalDebt > 0 ? savings / data.totalDebt : Infinity;
    const emergencyRatio = data.totalExpenses > 0 ? data.emergencyFund / (data.totalExpenses * 6) * 100 : 100;

    setResult({ savingsRate, expenseRate, dscr, emergencyRatio });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Ratio Calculator</CardTitle>
        <CardDescription>
          Enter your financial details to calculate key health ratios.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="totalIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Monthly Income (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 50000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Monthly Expenses (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 35000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalDebt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Monthly Debt Payments (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyFund"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Emergency Fund Saved (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 100000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate Ratios</Button>
            {result !== null && (
              <div className="grid gap-4 mt-4 text-lg w-full">
                <div className="p-4 border rounded-lg">
                    <h3 className="font-bold">Savings Rate: {result.savingsRate.toFixed(2)}%</h3>
                    <p className="text-sm text-muted-foreground">The percentage of income you are saving.</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h3 className="font-bold">Expense Rate: {result.expenseRate.toFixed(2)}%</h3>
                    <p className="text-sm text-muted-foreground">The percentage of income you are spending.</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h3 className="font-bold">Debt Service Coverage Ratio (DSCR): {isFinite(result.dscr) ? result.dscr.toFixed(2) : "N/A"}</h3>
                    <p className="text-sm text-muted-foreground">Your ability to cover debt payments. Higher is better.</p>
                </div>
                <div className="p-4 border rounded-lg">
                    <h3 className="font-bold">Emergency Fund Progress: {result.emergencyRatio.toFixed(2)}%</h3>
                    <p className="text-sm text-muted-foreground">Your progress towards a 6-month emergency fund.</p>
                </div>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
