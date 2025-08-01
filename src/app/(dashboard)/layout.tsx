"use client";
import { Sidebar } from "@/components/shared/sidebar";
import { Topbar } from "@/components/shared/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background relative flex h-screen overflow-hidden">
      {/* Sidebar */}
	  <div className="hidden md:block">
		<Sidebar />
	  </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Topbar />
        <main className="mx-auto p-8 md:max-w-[calc(100vw-18rem)]">
          <div className="min-h-[calc(100vh-8rem)]">{children}</div>
        </main>
      </div>
    </div>
  );
}
