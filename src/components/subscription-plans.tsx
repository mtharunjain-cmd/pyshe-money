import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Student",
    price: 99,
    features: ["Basic Budgeting", "Track 50 Transactions/mo", "Email Support"],
    popular: false,
  },
  {
    name: "Pro",
    price: 499,
    features: [
      "Advanced Budgeting",
      "Unlimited Transactions",
      "AI Financial Insights",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Investor",
    price: 999,
    features: [
      "All Pro Features",
      "Investment Tracking",
      "Portfolio Analysis",
      "Dedicated Advisor",
    ],
    popular: false,
  },
];

export default function SubscriptionPlans() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Go Premium</CardTitle>
        <CardDescription>
          Unlock powerful features to supercharge your financial journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex flex-col relative",
              plan.popular && "border-primary ring-1 ring-primary"
            )}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 right-4 bg-accent text-accent-foreground">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-4xl font-bold">
                  ₹{plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                Choose Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
