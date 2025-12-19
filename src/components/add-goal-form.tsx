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
    message: "Goal name must be at least 2 characters.",
  }),
  target: z.coerce.number().positive({ message: "Target amount must be positive." }),
  saved: z.coerce.number().min(0, "Saved amount cannot be negative."),
});

type GoalFormValues = z.infer<typeof formSchema>;

type AddGoalFormProps = {
  onSubmit: (data: GoalFormValues) => void;
};

export function AddGoalForm({ onSubmit }: AddGoalFormProps) {
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      target: 0,
      saved: 0,
    },
  });

  const handleSubmit = (data: GoalFormValues) => {
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
              <FormLabel>Goal Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Vacation to Goa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Amount (₹)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 50000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="saved"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount Already Saved (₹)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 10000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add Goal
        </Button>
      </form>
    </Form>
  );
}
