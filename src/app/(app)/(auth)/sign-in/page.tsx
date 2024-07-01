import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SignInForm } from "./_components/signin-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignIn() {
  const { user } = await validateRequest();

  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="underline hover:text-primary"
              prefetch={false}
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
