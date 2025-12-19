"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Budget name must be at least 2 characters.",
  }),
  limit: z.coerce.number().positive({ message: "Limit amount must be positive." }),
  spent: z.coerce.number().min(0, "Spent amount cannot be negative."),
});

type BudgetFormValues = z.infer<typeof formSchema>;

type AddBudgetFormProps = {
  onSubmit: (data: BudgetFormValues) => void;
};

export function AddBudgetForm({ onSubmit }: AddBudgetFormProps) {
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      limit: 0,
      spent: 0,
    },
  });

  const handleSubmit = (data: BudgetFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Groceries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Limit (₹)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 10000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="spent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount Already Spent (₹)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 2500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add Budget
        </Button>
      </form>
    </Form>
  );
}
