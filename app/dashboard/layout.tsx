import React from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardMobileNav } from "@/components/layout/DashboardMobileNav";
import { AuthProvider } from "@/lib/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AuthProvider is a Client Component but the layout itself stays a
  // Server Component — children render server-side and the provider only
  // hydrates the auth-aware islands (Sidebar, Settings form, etc.).
  return (
    <AuthProvider>
      <div className="flex h-screen bg-dark overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="min-h-full">{children}</div>
        </main>
        <DashboardMobileNav />
      </div>
    </AuthProvider>
  );
}
