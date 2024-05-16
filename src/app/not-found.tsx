import { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="space-y-2 text-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">404</h1>
          <p className="text-lg text-muted-foreground">
            Oops! The page you requested is not found.
          </p>
        </div>

        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Go Back
        </Link>
      </div>
    </div>
  );
}
