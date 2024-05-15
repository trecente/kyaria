"use client";

import { AlignJustify } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Icons } from "./icons";
import { MobileLink } from "./mobile-link";
import { navConfig } from "@/config/nav";
import { siteConfig } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
        >
          <AlignJustify strokeWidth={1.5} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="select-none pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="text-sm font-semibold tracking-widest">
            {siteConfig.name.toUpperCase()}
          </span>
        </MobileLink>
        <div className="my-4 pl-6">
          <div className="flex flex-col space-y-3">
            {navConfig.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                onOpenChange={setOpen}
              >
                {item.title}
              </MobileLink>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
