"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface NavigationProps {
  title: string;
  children?: React.ReactNode;
}

export function Navigation({ title, children }: NavigationProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        onClick={() => router.back()}
        size="icon"
        className="size-6"
        variant="outline"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <h1 className="whitespace-nowrap text-lg font-semibold tracking-tight">
        {title}
      </h1>
      <div className="ml-auto hidden md:block">{children}</div>
    </div>
  );
}
