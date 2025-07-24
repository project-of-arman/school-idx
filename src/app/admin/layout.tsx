
"use client";

import { useState, ReactNode } from 'react';
import LoginPage from './login/page';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader } from '@/components/ui/sidebar';
import AdminSidebarNav from '@/components/admin/sidebar-nav';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import AdminHeader from '@/components/admin/header';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <SidebarProvider>
        <Sidebar collapsible="offcanvas">
          <SidebarHeader>
              <div className="flex items-center gap-2 p-2">
                <Link href="/" className="flex items-center gap-2" target="_blank">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold text-primary">Shikkha Angan</span>
                </Link>
                <SidebarTrigger className="ml-auto" />
              </div>
          </SidebarHeader>
          <AdminSidebarNav />
        </Sidebar>
        <div className="flex flex-col flex-1">
            <AdminHeader onLogout={handleLogout} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/40">
                {children}
            </main>
        </div>
    </SidebarProvider>
  );
}
