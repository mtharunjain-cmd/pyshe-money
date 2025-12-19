import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ArrowRightLeft,
  PiggyBank,
  Target,
  Settings,
  CircleHelp,
  Coins,
  BookOpen,
  Calculator,
  ArrowRight,
} from "lucide-react";
import Logo from "@/components/logo";
import Footer from "@/components/footer";

const calculators = [
  {
    title: "Budgeting Calculator",
    description: "Plan your monthly budget and track your spending.",
    href: "/dashboard/calculator/budgeting",
  },
  {
    title: "Debt Management Calculator",
    description: "Create a plan to pay off your debts effectively.",
    href: "/dashboard/calculator/debt-management",
  },
  {
    title: "Tax Calculator",
    description: "Estimate your income tax liability for the year.",
    href: "/dashboard/calculator/tax",
  },
  {
    title: "Inflation Calculator",
    description: "See how inflation affects your money's value over time.",
    href: "/dashboard/calculator/inflation",
  },
  {
    title: "SIP Calculator",
    description: "Calculate the returns on your Systematic Investment Plan.",
    href: "/dashboard/calculator/sip",
  },
];

export default function CalculatorPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-4 flex justify-center">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <ArrowRightLeft />
                  Transactions
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/budgets-goals">
                  <PiggyBank />
                  Budgets & Goals
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/modules">
                  <BookOpen />
                  Modules
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/psychecoins">
                  <Coins />
                  PsycheCoins
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link href="/dashboard/calculator">
                  <Calculator />
                  Calculator
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <CircleHelp />
                  Help & Support
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-col flex-1">
        <SidebarInset>
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">
                Financial Calculators
              </h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {calculators.map((calculator) => (
                <Card
                  key={calculator.title}
                  className="flex flex-col transition-all hover:shadow-md"
                >
                  <CardHeader>
                    <CardTitle>{calculator.title}</CardTitle>
                    <CardDescription>{calculator.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button asChild variant="secondary" className="w-full">
                      <Link href={calculator.href}>
                        Use Calculator{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </SidebarInset>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
