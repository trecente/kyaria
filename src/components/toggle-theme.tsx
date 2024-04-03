"use client";

import { ComponentProps } from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

type ToggleThemeProps = ComponentProps<typeof Button>;

export function ToggleTheme({ className, ...props }: ToggleThemeProps) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        className={cn(className)}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        variant="ghost"
        size="icon"
        {...props}
      >
        <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle Theme</span>
      </Button>
    </>
  );
}
