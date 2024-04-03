"use client";

import Link from "next/link";

import { ToggleTheme } from "./toggle-theme";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button, buttonVariants } from "@/components/ui/button";

import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="sm:hidden" size="icon" variant="outline">
          <HamburgerMenuIcon className="size-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-1/2 flex-col gap-0 pb-2">
        <div className="flex-1">
          <div className="grid gap-4 pt-2">
            <Link className="font-medium" href="/">
              Home
            </Link>
            <Link className="font-medium" href="/post-job">
              Post a Job
            </Link>
          </div>
        </div>

        <hr className="mb-2" />
        <div className="flex gap-1">
          <Link
            className={buttonVariants({
              className: "w-full",
              variant: "ghost",
              size: "icon",
            })}
            href="https://github.com/trecente"
            target="_blank"
          >
            <GitHubLogoIcon className="size-[1.2rem]" />
          </Link>
          <Link
            className={buttonVariants({
              className: "w-full",
              variant: "ghost",
              size: "icon",
            })}
            href="mailto:lucastrecente@hotmail.com"
          >
            <EnvelopeClosedIcon className="size-[1.2rem]" />
          </Link>

          <ToggleTheme className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
