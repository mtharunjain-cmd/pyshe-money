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
  currentAmount: z.coerce.number().min(1, "Amount must be greater than 0."),
  inflationRate: z.coerce.number().min(0, "Inflation rate must be positive."),
  years: z.coerce.number().min(1, "Years must be at least 1."),
});

type InflationFormValues = z.infer<typeof formSchema>;

export default function InflationCalculator() {
  const [futureValue, setFutureValue] = useState<number | null>(null);

  const form = useForm<InflationFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: InflationFormValues) => {
    const { currentAmount, inflationRate, years } = data;
    const result = currentAmount * Math.pow(1 + inflationRate / 100, years);
    setFutureValue(result);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inflation Calculator</CardTitle>
        <CardDescription>
          Calculate the future value of your money.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="currentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 10000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inflationRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Inflation Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 6" {...field} />
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
                  <FormLabel>Number of Years</FormLabel>
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
            {futureValue !== null && (
              <div className="text-xl font-bold">
                Future Value: ₹{futureValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
