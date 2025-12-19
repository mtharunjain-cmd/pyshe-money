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
  monthlyInvestment: z.coerce.number().min(1, "Investment must be greater than 0."),
  interestRate: z.coerce.number().min(0, "Interest rate must be positive."),
  years: z.coerce.number().min(1, "Years must be at least 1."),
});

type SIPFormValues = z.infer<typeof formSchema>;

export default function SipCalculator() {
  const [result, setResult] = useState<{ invested: number; futureValue: number } | null>(null);

  const form = useForm<SIPFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyInvestment: 0,
      interestRate: 0,
      years: 0,
    },
  });

  const onSubmit = (data: SIPFormValues) => {
    const { monthlyInvestment, interestRate, years } = data;
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const invested = monthlyInvestment * months;
    setResult({ invested, futureValue });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SIP Calculator</CardTitle>
        <CardDescription>
          Calculate the future value of your Systematic Investment Plan.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="monthlyInvestment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Investment (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 5000" {...field} />
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
                  <FormLabel>Expected Annual Return (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="years"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Period (Years)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate</Button>
            {result && (
              <div className="space-y-2">
                <div className="text-lg">
                  Invested Amount:{" "}
                  <span className="font-bold">₹{result.invested.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-xl">
                  Estimated Future Value:{" "}
                  <span className="font-bold">₹{result.futureValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
