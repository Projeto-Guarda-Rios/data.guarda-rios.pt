"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FlaskConical,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "home", href: "/", icon: Home },
  { label: "I-Fest²", href: "/dashboard/ifest", icon: FlaskConical },
];

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center gap-3 border-b border-border px-4 py-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/PGR_Logo.png" alt="Guarda Rios" className="h-8 w-8 object-contain" />
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
            guarda-rios
          </span>
          <span className="text-[10px] text-muted-foreground">data.portal</span>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4">
        <div className="mb-2 px-3">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            navigation
          </span>
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="ml-auto h-3 w-3 text-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-muted-foreground">
            sensors online
          </span>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-56 flex-col border-r border-border bg-card">
      <NavContent />
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <NavContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
