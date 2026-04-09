import React from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardMobileNav } from "@/components/layout/DashboardMobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="min-h-full">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <DashboardMobileNav />
    </div>
  );
}
