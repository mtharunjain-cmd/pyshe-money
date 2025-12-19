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
    priceDisplay: "₹99",
    priceSubtext: "/ month",
    features: ["Basic Budgeting", "Track 50 Transactions/mo", "Email Support"],
    popular: false,
  },
  {
    name: "Pro",
    price: 0,
    priceDisplay: "Free",
    originalPrice: "₹499",
    priceSubtext: "for students for one year",
    features: [
      "1 to 1 session",
      "Personalized budget review",
      "Investment guidence for beginners",
    ],
    popular: true,
  },
  {
    name: "Graduate",
    price: 999,
    priceDisplay: "₹999",
    priceSubtext: "/ month",
    features: [
      "All Pro Features",
      "Investment Tracking",
      "Dedicated Advisor",
    ],
    popular: false,
  },
];

export default function SubscriptionPlans() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-background">
      <CardHeader>
        <CardTitle>Go Premium</CardTitle>
        <CardDescription>
          Unlock powerful features to supercharge your financial journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col relative bg-card/80 backdrop-blur-sm transition-all hover:scale-105",
                plan.popular && "border-primary ring-2 ring-primary shadow-lg"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 right-4 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline gap-2">
                  {plan.originalPrice && (
                    <span className="font-headline text-2xl font-bold text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="font-headline text-4xl font-bold">
                    {plan.priceDisplay}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.priceSubtext}</span>
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
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Unlock one to one session and advanced planning with special offer</p>
        </div>
      </CardContent>
    </Card>
  );
}
