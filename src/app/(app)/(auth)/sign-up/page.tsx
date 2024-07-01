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

import { SignUpForm } from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUp() {
  const { user } = await validateRequest();

  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Enter your details to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="underline hover:text-primary"
              prefetch={false}
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
