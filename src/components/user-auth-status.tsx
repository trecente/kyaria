import Link from "next/link";

import { validateRequest } from "@/lib/auth";

import { buttonVariants } from "@/components/ui/button";

export async function UserAuthStatus() {
  const { user } = await validateRequest();

  return user ? (
    <Link
      href="/dashboard"
      className={buttonVariants({
        variant: "outline",
        size: "sm",
      })}
    >
      Dashboard
    </Link>
  ) : (
    <Link
      href="/sign-in"
      className={buttonVariants({
        variant: "outline",
        size: "sm",
      })}
    >
      Sign In
    </Link>
  );
}
