"use client";
import { Sidebar } from "@/components/navbar/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen flex-col bg-background">
      {/* Topbar - Fixed at the top */}


      <div className="flex flex-1 overflow-hidden pt-16"> {/* Add pt-16 to account for topbar height */}
        {/* Sidebar - Fixed left below topbar */}
        <div className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-72 border-r lg:block">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto lg:pl-72"> {/* Add lg:pl-72 to account for sidebar width */}
          <main className="mx-auto p-6 md:p-8 w-full max-w-[calc(100vw-1.5rem)] lg:max-w-[calc(100vw-20rem)]">
            <div className="min-h-[calc(100vh-8rem)]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}