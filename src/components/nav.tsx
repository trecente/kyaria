"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export function NavContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Button
        type="button"
        onClick={() => router.back()}
        size="icon"
        className="size-6"
        variant="outline"
      >
        <ChevronLeft className="size-5" />
      </Button>

      {children}
    </div>
  );
}

export function NavHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "whitespace-nowrap font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function NavActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("ml-auto", className)} {...props}>
      {children}
    </div>
  );
}
