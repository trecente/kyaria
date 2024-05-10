import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { MobileMenu } from "./mobile-menu";
import { ToggleTheme } from "./toggle-theme";
import { Separator } from "./ui/separator";
import Logo from "@/assets/logo.svg";

export function Header() {
  return (
    <header className="relative select-none">
      <div className="flex h-20 items-center">
        <div className="hidden items-center gap-1 sm:flex">
          <Link
            className={buttonVariants({ size: "icon", variant: "ghost" })}
            href="https://github.com/trecente"
            target="_blank"
          >
            <GitHubLogoIcon className="size-[1.2rem]" />
          </Link>
          <Link
            className={buttonVariants({ size: "icon", variant: "ghost" })}
            href="mailto:lucastrecente@hotmail.com"
          >
            <EnvelopeClosedIcon className="size-[1.2rem]" />
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Kyaria Logo" width={27} height={27} />
            <span className="text-lg font-semibold tracking-widest">
              KYARIA
            </span>
          </Link>
        </div>

        <div className="ml-auto">
          <MobileMenu />

          <div className="hidden h-5 items-center space-x-4 sm:flex">
            <ToggleTheme className="-mr-2" />

            <Separator orientation="vertical" />

            <Link
              href="/post-job"
              className={buttonVariants({
                variant: "secondary",
              })}
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
