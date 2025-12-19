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
  principal: z.coerce.number().min(1, "Principal must be greater than 0."),
  interestRate: z.coerce.number().min(0, "Interest rate must be positive."),
  monthlyPayment: z.coerce
    .number()
    .min(1, "Monthly payment must be greater than 0."),
});

type DebtFormValues = z.infer<typeof formSchema>;

export default function DebtManagementCalculator() {
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<DebtFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: DebtFormValues) => {
    const { principal, interestRate, monthlyPayment } = data;
    const monthlyInterestRate = interestRate / 100 / 12;

    if (monthlyPayment <= principal * monthlyInterestRate) {
        setResult("Monthly payment is too low to cover interest. Debt will not be repaid.");
        return;
    }

    const months = -(Math.log(1 - (principal * monthlyInterestRate) / monthlyPayment) / Math.log(1 + monthlyInterestRate));
    const years = Math.floor(months / 12);
    const remainingMonths = Math.ceil(months % 12);
    setResult(`It will take you ${years} years and ${remainingMonths} months to pay off your debt.`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debt Management Calculator</CardTitle>
        <CardDescription>
          Calculate how long it will take to pay off your debt.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="principal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Debt Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 100000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="monthlyPayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Payment (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate</Button>
            {result && (
              <div className="text-xl font-bold">
                {result}
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
