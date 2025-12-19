import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Trophy, Star } from "lucide-react";
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
} from "lucide-react";
import Logo from "@/components/logo";
import Footer from "@/components/footer";

const rewards = [
  {
    title: "Amazon Gift Card",
    points: 500,
    icon: Gift,
  },
  {
    title: "Startup Swag",
    points: 1000,
    icon: Star,
  },
  {
    title: "1-on-1 Mentorship",
    points: 2500,
    icon: Trophy,
  },
];

export default function PsycheCoinsPage() {
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
                <Link href="/dashboard/transactions">
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
              <SidebarMenuButton asChild isActive>
                <Link href="/dashboard/psychecoins">
                  <Coins />
                  PsycheCoins
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
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
          <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                  PsycheCoins Rewards
                </h1>
                <p className="text-muted-foreground">
                  Earn coins for your financial achievements and redeem them for awesome rewards.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Coins className="h-8 w-8 text-yellow-500" />
                <span className="text-2xl font-bold">1,250</span>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-primary/10 to-background">
                <CardHeader>
                  <CardTitle>How to Earn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/20 p-3 flex items-center justify-center">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Complete a Module</p>
                      <p className="text-sm text-muted-foreground">+50 coins</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/20 p-3 flex items-center justify-center">
                       <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Reach a Savings Goal</p>
                      <p className="text-sm text-muted-foreground">+100 coins</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {rewards.map((reward) => (
                <Card key={reward.title} className="flex flex-col transition-all hover:shadow-md">
                  <CardHeader className="items-center text-center">
                    <div className="rounded-full bg-accent p-4 mb-4">
                      <reward.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{reward.title}</CardTitle>
                    <CardDescription>{reward.points} coins</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button className="w-full">Redeem</Button>
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