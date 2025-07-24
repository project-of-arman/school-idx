"use client";

import Link from 'next/link';
import { GraduationCap, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  {
    title: 'Home',
    href: '/',
  },
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
    title: 'নোটিশ',
    href: '/notice',
  },
  {
    title: 'রুটিন',
    href: '/routine',
  },
  {
    title: 'সিলেবাস',
    href: '/syllabus',
  },
  {
    title: 'ব্লগ',
    href: '/blog',
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

const NavLink = ({ href, children, className, onClick }: { href: string; children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} onClick={onClick}>
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
            <Link href={link.href}>{link.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary">মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.subLinks ? (
              <NavDropdown key={link.title} title={link.title} subLinks={link.subLinks} />
            ) : (
              <NavLink key={link.href} href={link.href!}>
                {link.title}
              </NavLink>
            )
          )}
        </nav>
        <div className="lg:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm">
              <SheetHeader>
                 <SheetTitle>
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                      <GraduationCap className="h-7 w-7 text-primary" />
                      <span className="text-xl font-bold text-primary">মুরাদদর্প নারায়নপুর নিম্ন মাধ্যমিক বিদ্যালয়</span>
                    </Link>
                 </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) =>
                  link.subLinks ? (
                    <div key={link.title}>
                      <p className="font-medium text-foreground/80">{link.title}</p>
                      <div className="pl-4 mt-2 flex flex-col gap-4">
                         {link.subLinks.map((subLink) => (
                           <NavLink key={subLink.href} href={subLink.href} className="text-base" onClick={() => setMenuOpen(false)} >
                              {subLink.title}
                           </NavLink>
                         ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink key={link.href} href={link.href!} className="text-base" onClick={() => setMenuOpen(false)}>
                      {link.title}
                    </NavLink>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
