"use client";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../ModeToggle";
import Link from "next/link";
import { Sidebar } from "./sidebar";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const logout = () => {
    signOut();
  };
  return (
    <>
      {/* Fixed Top Navbar - Above everything */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between gap-4 border-b border-gray-700 bg-black/95 px-6 py-4 text-sm backdrop-blur supports-[backdrop-filter]:bg-black/60">
        {/* Left side - Logo and Desktop Sidebar Trigger */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/">
            <p className="text-xl font-bold text-white md:text-2xl">
              OTO{" "}
              <span className="bg-[linear-gradient(to_left,_#df8908_10%,_#ff1d15_100%)] bg-clip-text font-bold text-transparent">
                EVENT
              </span>
            </p>
          </Link>
        </div>


        {/* Right side - Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ModeToggle />
            
           {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 hover:bg-muted transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
                3
              </span>
            </Button>
          {/* Desktop Controls (Hidden on mobile) */}
          <div className=" md:flex items-center gap-3">
           
            
          
          <div className="flex items-center gap-4">

        {session.data?.user ? (
          <>
            <Link href="/write">Write</Link>
             {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full hover:bg-muted transition-colors"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-background">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      UN
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/avatar.png" alt="User" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        UN
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="p-3 cursor-pointer hover:bg-muted rounded-md transition-colors">
                  <span className="flex items-center gap-2">👤 Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer hover:bg-muted rounded-md transition-colors">
                  <span className="flex items-center gap-2">⚙️ Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer hover:bg-muted rounded-md transition-colors">
                  <span className="flex items-center gap-2">💳 Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="p-3 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors">
                  <span className="flex items-center gap-2" onClick={logout}>🚪 Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
           {/* Mobile Sidebar Trigger (Right side on mobile) */}
          </>
        ) : (
          <>
            <Link href="/login">Sign in</Link>
            <Link href="/register" >Sign up</Link>
          </>
        )}
      </div>
          </div>
          <div className="md:hidden">
            <Sidebar />
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar - Fixed left side below navbar */}
     

      {/* Mobile Sidebar - Handled within the Sidebar component */}
    </>
  );
};

export default Navbar;