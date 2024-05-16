"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  const handleReset = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="space-y-2 text-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Error</h1>
          <p className="text-lg text-muted-foreground">
            Something went wrong while trying to load this page.
          </p>
        </div>
        <Button onClick={handleReset} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  );
}
