import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { Icons } from "./icons";
import { MobileNav } from "./mobile-nav";
import { ToggleTheme } from "./toggle-theme";
import { Separator } from "./ui/separator";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full select-none border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <MobileNav />

        <div className="flex items-center gap-1">
          <ToggleTheme className="sm:hidden" />

          <Link
            className={buttonVariants({ size: "icon", variant: "ghost" })}
            href={siteConfig.links.github}
            target="_blank"
          >
            <GitHubLogoIcon className="size-[1.2rem]" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
              className: "hidden sm:flex",
            })}
            href={siteConfig.links.email}
          >
            <EnvelopeClosedIcon className="size-[1.2rem]" />
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="size-6" />
            <span className="font-semibold tracking-widest">
              {siteConfig.name.toUpperCase()}
            </span>
          </Link>
        </div>

        <div className="hidden h-5 items-center space-x-4 sm:flex">
          <ToggleTheme className="-mr-2" />

          <Separator orientation="vertical" />

          <Link
            href="/signin"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
            })}
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
