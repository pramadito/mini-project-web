"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  Database,
  MessageSquare,
  Shield,
  HelpCircle,
  LogIn,
  AlertCircle,
  Menu,
  Ticket,
  Calendar1,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { IconListDetails } from "@tabler/icons-react";

const sidebarGroups = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        badge: null,
      },
      {
        title: "Tickets",
        href: "/dashboard/tickets",
        icon: Ticket,
        badge: "12",
      },
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: Settings,
        badge: null,
      },
    ],
  },
  {
    title: "Organizer",
    items: [
      {
        title: "Manage Events ",
        href: "/dashboard/manage-events",
        icon: Calendar1,
        badge: null,
        children: [
          {
            title: "Create Event",
            href: "/dashboard/events/create",
          },
        ],
      },
      {
        title: "Manage Ticket",
        href: "/dashboard/manage-tickets",
        icon: IconListDetails,
        badge: null,
        children: [
          {
            title: "Create Ticket",
            href: "/dashboard/ticket/create",
          },
        ],
      },
      {
        title: "Statistic",
        href: "/dashboard/statistic",
        icon: BarChart3,
        badge: "New",
      },
      {
        title: "Documents",
        href: "/dashboard/documents",
        icon: FileText,
        badge: null,
      },
      {
        title: "Calendar",
        href: "/dashboard/calendar",
        icon: Calendar,
        badge: "3",
      },
      {
        title: "Auth Pages",
        href: "/dashboard/auth",
        icon: LogIn,
        badge: null,
      },
      {
        title: "Error Pages",
        href: "/dashboard/errors",
        icon: AlertCircle,
        badge: null,
      },
    ],
  },
  // {
  //   title: "Others",
  //   items: [
  //     {
  //       title: "Messages",
  //       href: "/dashboard/messages",
  //       icon: MessageSquare,
  //       badge: "5",
  //     },
  //     {
  //       title: "Database",
  //       href: "/dashboard/database",
  //       icon: Database,
  //       badge: null,
  //     },
  //     {
  //       title: "Security",
  //       href: "/dashboard/security",
  //       icon: Shield,
  //       badge: "!",
  //     },
  //     {
  //       title: "Help",
  //       href: "/dashboard/help",
  //       icon: HelpCircle,
  //       badge: null,
  //     },
  //   ],
  // },
];

interface SidebarProps {
  onMobileClose?: () => void;
}

export function Sidebar({ onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLinkClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Always visible on left */}
      <aside className="hidden lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="bg-background flex grow flex-col gap-y-5 overflow-y-auto border-r px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 items-center border-b">
            <Link href="/dashboard" className="group flex items-center gap-3">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <LayoutDashboard className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="group-hover:text-primary text-xl font-bold transition-colors">
                Dashboard
              </span>
            </Link>
          </div>

          {/* Navigation Groups */}
          <nav className="flex-1 space-y-8">
            {sidebarGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                {/* Group Title */}
                <h3 className="text-muted-foreground mb-4 px-3 text-xs font-semibold tracking-wider uppercase">
                  {group.title}
                </h3>

                {/* Group Items */}
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <div key={item.href} className="space-y-1">
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className={cn(
                            "group hover:bg-muted flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 transition-all duration-200",
                              isActive && "text-primary-foreground",
                            )}
                          />
                          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                            {item.title}
                          </span>
                        </Link>

                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleLinkClick}
                              className={cn(
                                "ml-8 block rounded-md px-3 py-2 text-sm transition-colors",
                                isChildActive
                                  ? "text-primary font-semibold"
                                  : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              {child.title}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar - Sheet component */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-5">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b px-6">
              <Link href="/dashboard" className="group flex items-center gap-3">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                  <LayoutDashboard className="text-primary-foreground h-4 w-4" />
                </div>
                <span className="group-hover:text-primary text-xl font-bold transition-colors">
                  Dashboard
                </span>
              </Link>
            </div>

            {/* Navigation Groups */}
            <nav className="flex-1 space-y-8 p-6">
              {sidebarGroups.map((group) => (
                <div key={group.title} className="space-y-3">
                  {/* Group Title */}
                  <h3 className="text-muted-foreground mb-4 px-3 text-xs font-semibold tracking-wider uppercase">
                    {group.title}
                  </h3>

                  {/* Group Items */}
                  <div className="space-y-2">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleLinkClick}
                          className={cn(
                            "group hover:bg-muted flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 transition-all duration-200",
                              isActive && "text-primary-foreground",
                            )}
                          />
                          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                            {item.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
