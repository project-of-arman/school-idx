
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

interface AdminHeaderProps {
    onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  const { isMobile } = useSidebar();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex-1">
            {/* Can add breadcrumbs or other elements here later */}
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <Avatar>
                    <AvatarImage src="https://placehold.co/32x32.png" alt="Admin" data-ai-hint="male portrait" />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
            </DropdownMenuItem>
            </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
