import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.svg";

import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";

import { ToggleTheme } from "./toggle-theme";

export function Header() {
  return (
    <header className="relative select-none">
      <div className="flex h-20 items-center justify-between">
        <div className="flex items-center gap-2.5">
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

        <ToggleTheme />
      </div>
    </header>
  );
}
