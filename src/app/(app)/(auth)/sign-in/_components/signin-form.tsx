"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { signIn } from "@/lib/actions";
import { SignInFormType, signInFormSchema } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { EmailField } from "./fields/email";
import { PasswordField } from "./fields/password";

export function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  const [isSubmitting, startTransition] = useTransition();

  const onSubmit: SubmitHandler<SignInFormType> = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]: [string, unknown]) => {
      formData.append(key, value as string);
    });

    startTransition(async () => {
      try {
        await signIn(formData);

        toast.success("Signed in successfully.", {
          duration: 5000,
        });

        router.push("/dashboard");
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          <FormProvider {...form}>
            <EmailField isSubmitting={isSubmitting} />
            <PasswordField isSubmitting={isSubmitting} />
          </FormProvider>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle className="h-6 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
