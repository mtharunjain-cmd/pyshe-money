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
  income: z.coerce.number().min(0, "Income must be a positive number."),
  expenses: z.coerce.number().min(0, "Expenses must be a positive number."),
});

type BudgetingFormValues = z.infer<typeof formSchema>;

export default function BudgetingCalculator() {
  const [result, setResult] = useState<number | null>(null);

  const form = useForm<BudgetingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 0,
      expenses: 0,
    },
  });

  const onSubmit = (data: BudgetingFormValues) => {
    setResult(data.income - data.expenses);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budgeting Calculator</CardTitle>
        <CardDescription>
          Enter your monthly income and expenses to calculate your balance.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 50000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Expenses (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 35000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate</Button>
            {result !== null && (
              <div className="text-xl font-bold">
                Your remaining balance is: ₹{result.toLocaleString("en-IN")}
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
