
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
import { LogOut, User, Bell } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { useEffect, useState } from "react";
import { getNotices, Notice } from "@/lib/notice-data";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface AdminHeaderProps {
    onLogout: () => void;
}

function Notifications() {
    const [noticeCount, setNoticeCount] = useState(0);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const marqueeNotices = await getNotices({ is_marquee: true });
                setNoticeCount(marqueeNotices.length);
            } catch (error) {
                console.error("Failed to fetch notices:", error);
            }
        };
        fetchNotices();
    }, []);

    return (
        <Button asChild variant="outline" size="icon" className="relative h-8 w-8 rounded-full">
            <Link href="/admin/notifications">
                <Bell className="h-4 w-4" />
                 {noticeCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
                <span className="sr-only">View Notifications</span>
            </Link>
        </Button>
    );
}


export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-2">
           <SidebarTrigger />
        </div>
        <div className="flex-1">
            {/* Can add breadcrumbs or other elements here later */}
        </div>
        <div className="flex items-center gap-4">
            <Notifications />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full h-8 w-8">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/32x32.png" alt="Admin" data-ai-hint="male portrait" />
                        <AvatarFallback>
                            <User className="h-4 w-4" />
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
        </div>
    </header>
  );
}
