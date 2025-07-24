"use client";

import Link from 'next/link';
import { ChevronDown, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';


const navLinks = [
  {
    title: 'হোম',
    href: '/',
    icon: Home,
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


const NavLink = ({ href, children, className, icon: Icon }: { href: string; children: React.ReactNode, className?: string, icon?: React.ElementType }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={cn(
          'flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-foreground/80',
          className
        )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
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
            'flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary hover:bg-transparent px-0',
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

export default function SecondaryNav() {
  const [isSticky, setIsSticky] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      // The secondary nav is after the carousel which is 600px tall
      if (window.scrollY > 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={cn(
        "h-14 items-center justify-center border-b border-border/40 bg-background/95 hidden lg:flex backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isSticky && "sticky top-0 z-40"
    )}>
        <div className="container mx-auto flex items-center justify-center gap-6 px-4">
            {navLinks.map((link) =>
                link.subLinks ? (
                  <NavDropdown key={link.title} title={link.title} subLinks={link.subLinks} />
                ) : (
                  <NavLink key={link.href} href={link.href!} icon={link.icon}>
                      {link.title}
                  </NavLink>
                )
            )}
        </div>
    </nav>
  );
}