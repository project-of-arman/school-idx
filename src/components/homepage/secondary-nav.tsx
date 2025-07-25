
"use client";

import Link from 'next/link';
import { ChevronDown, Home, Menu, GraduationCap } from 'lucide-react';
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
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { ScrollArea } from '../ui/scroll-area';


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


const NavLink = ({ href, children, className, icon: Icon, isActive }: { href: string; children: React.ReactNode, className?: string, icon?: React.ElementType, isActive: boolean }) => {
  return (
    <Link 
      href={href}
      className={cn(
          'flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary border px-3 py-1.5 rounded-md border-border',
          isActive ? 'text-primary border-primary bg-primary/10' : 'text-foreground/80',
          className
        )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
    </Link>
  );
};

const NavDropdown = ({ title, subLinks, className, isActive }: { title: string; subLinks: { title: string; href: string }[], className?: string, isActive: boolean }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary hover:bg-transparent border px-3 py-1.5 rounded-md border-border',
            isActive ? 'text-primary border-primary bg-primary/10' : 'text-foreground/80',
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
  const [isMounted, setIsMounted] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();
  
  React.useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const heroCarouselHeight = 600; 
      if (window.scrollY > heroCarouselHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const navClasses = cn(
    "h-16 flex items-center justify-start border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    isMounted && isSticky && "sticky top-0 z-40"
  );

  return (
    <nav className={navClasses}>
        <div className="container mx-auto flex items-center justify-between gap-6 px-4">
            <div className="hidden lg:flex items-center justify-start gap-2">
                {navLinks.map((link) =>
                    link.subLinks ? (
                    <NavDropdown 
                      key={link.title} 
                      title={link.title} 
                      subLinks={link.subLinks} 
                      isActive={isMounted && link.subLinks.some(subLink => pathname.startsWith(subLink.href))}
                    />
                    ) : (
                    <NavLink key={link.href} href={link.href!} icon={link.icon} isActive={isMounted && pathname === link.href!}>
                        {link.title}
                    </NavLink>
                    )
                )}
            </div>
             <div className="lg:hidden flex-grow">
                 <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
                    <SheetTrigger asChild>
                       <Button variant="outline" className="w-auto justify-start">
                         <Menu className="mr-2 h-6 w-6" />
                         <span>মেনু নির্বাচন করুন</span>
                       </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-sm flex flex-col">
                        <SheetHeader>
                            <SheetTitle>
                                <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                                <GraduationCap className="h-7 w-7 text-primary" />
                                <span className="text-xl font-bold text-primary">মেনু</span>
                                </Link>
                            </SheetTitle>
                        </SheetHeader>
                        <ScrollArea className="flex-grow">
                            <nav className="mt-8 flex flex-col gap-6 pr-6">
                                {navLinks.map((link) =>
                                link.subLinks ? (
                                    <div key={link.title}>
                                    <p className="font-medium text-foreground/80">{link.title}</p>
                                    <div className="pl-4 mt-2 flex flex-col gap-4">
                                        {link.subLinks.map((subLink) => (
                                        <Link key={subLink.href} href={subLink.href} className="text-base" onClick={() => setMenuOpen(false)} >
                                            {subLink.title}
                                        </Link>
                                        ))}
                                    </div>
                                    </div>
                                ) : (
                                    <Link key={link.href} href={link.href!} className="text-base flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                                    {link.icon && <link.icon className="h-4 w-4" />}
                                    {link.title}
                                    </Link>
                                )
                                )}
                            </nav>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </nav>
  );
}
