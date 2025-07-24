"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const navLinks = [
  {
    title: 'স্কুল সম্পর্কিত',
    href: '/school-details',
  },
  {
    title: 'কমিটি',
    href: '/committee',
  },
  {
    title: 'ভর্তি নির্দেশিকা',
    href: '/admission-guidelines',
  },
  {
    title: 'ফলাফল',
    href: '/results',
  },
  {
    title: 'সকল ফরমস',
    href: '/forms',
  },
  {
    title: 'যোগাযোগ ও ফিডব্যাক',
    href: '/contact',
  },
  {
    title: 'গ্যালারি',
    subLinks: [
      { title: 'ছবি গ্যালারি', href: '/gallery' },
      { title: 'ভিডিও গ্যালারি', href: '/#video-gallery' },
    ],
  },
];

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode, className?: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <span
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-foreground/80',
          className
        )}
      >
        {children}
      </span>
    </Link>
  );
};

const NavDropdown = ({ title, subLinks, className }: { title: string; subLinks: { title: string; href: string }[], className?: string }) => {
  const pathname = usePathname();
  const isActive = subLinks.some(link => pathname.startsWith(link.href));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary hover:bg-transparent px-0',
            isActive ? 'text-primary' : 'text-foreground/80',
            className
          )}
        >
          {title}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {subLinks.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href}>{link.href === '/#video-gallery' ? 'ভিডিও গ্যালারি' : link.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default function SecondaryNav() {
  return (
    <nav className="h-12 items-center justify-center border-t border-border/40 bg-background/95 hidden lg:flex">
        <div className="container mx-auto flex items-center justify-center gap-6 px-4">
            {navLinks.map((link) =>
                link.subLinks ? (
                <NavDropdown key={link.title} title={link.title} subLinks={link.subLinks} />
                ) : (
                <NavLink key={link.href} href={link.href!}>
                    {link.title}
                </NavLink>
                )
            )}
        </div>
    </nav>
  );
}
