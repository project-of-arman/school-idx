
"use client";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Users,
  FileText,
  Bell,
  Calendar,
  Book,
  Newspaper,
  Award,
  File,
  MessageSquare,
  Image as ImageIcon,
  Home
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", icon: Home, label: "Dashboard" },
  { href: "/admin/school-details", icon: BookOpen, label: "স্কুল সম্পর্কিত" },
  { href: "/admin/committee", icon: Users, label: "কমিটি" },
  { href: "/admin/admission-guidelines", icon: FileText, label: "ভর্তি নির্দেশিকা" },
  { href: "/admin/notices", icon: Bell, label: "নোটিশ" },
  { href: "/admin/routine", icon: Calendar, label: "রুটিন" },
  { href: "/admin/syllabus", icon: Book, label: "সিলেবাস" },
  { href: "/admin/blog", icon: Newspaper, label: "ব্লগ" },
  { href: "/admin/results", icon: Award, label: "ফলাফল" },
  { href: "/admin/forms", icon: File, label: "সকল ফরমস" },
  { href: "/admin/contact", icon: MessageSquare, label: "যোগাযোগ ও ফিডব্যাক" },
  { href: "/admin/gallery", icon: ImageIcon, label: "গ্যালারি" },
];

export default function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
