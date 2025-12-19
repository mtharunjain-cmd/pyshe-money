"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ArrowRightLeft,
  PiggyBank,
  Target,
  Settings,
  CircleHelp,
} from "lucide-react";
import Logo from "@/components/logo";
import Dashboard from "@/components/dashboard";
import Link from "next/link";
import Footer from "@/components/footer";
import React from "react";
import GetStartedModal from "@/components/get-started-modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    // Open the modal automatically on page load, e.g., for new users.
    // In a real app, you might check a cookie or user state.
    const hasSeenModal = localStorage.getItem("hasSeenGetStartedModal");
    if (!hasSeenModal) {
      setIsModalOpen(true);
      localStorage.setItem("hasSeenGetStartedModal", "true");
    }
  }, []);

  return (
    <SidebarProvider>
      <GetStartedModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link href="#">
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
                <Link href="#">
                  <PiggyBank />
                  Budgets
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Target />
                  Goals
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
          <Dashboard />
        </SidebarInset>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
