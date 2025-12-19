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
});

type TaxFormValues = z.infer<typeof formSchema>;

export default function TaxCalculator() {
  const [tax, setTax] = useState<number | null>(null);

  const form = useForm<TaxFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 0,
    },
  });

  const onSubmit = (data: TaxFormValues) => {
    const income = data.income;
    let calculatedTax = 0;
    // Simplified tax calculation (example slabs)
    if (income > 1000000) {
      calculatedTax = (income - 1000000) * 0.3 + 90000;
    } else if (income > 500000) {
      calculatedTax = (income - 500000) * 0.2 + 15000;
    } else if (income > 250000) {
      calculatedTax = (income - 250000) * 0.05;
    }
    setTax(calculatedTax);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Calculator</CardTitle>
        <CardDescription>
          Estimate your annual income tax.
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
                  <FormLabel>Annual Income (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 800000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit">Calculate Tax</Button>
            {tax !== null && (
              <div className="text-xl font-bold">
                Estimated Annual Tax: ₹{tax.toLocaleString("en-IN")}
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
