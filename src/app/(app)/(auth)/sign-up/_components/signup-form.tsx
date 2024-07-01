"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { signUp } from "@/lib/actions";
import { SignUpFormType, signUpFormSchema } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { ConfirmPasswordField } from "./fields/confirm-password";
import { EmailField } from "./fields/email";
import { NameField } from "./fields/name";
import { PasswordField } from "./fields/password";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;

  const [isSubmitting, startTransition] = useTransition();

  const onSubmit: SubmitHandler<SignUpFormType> = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]: [string, unknown]) => {
      formData.append(key, value as string);
    });

    startTransition(async () => {
      try {
        await signUp(formData);

        toast.success("Signed up successfully.", {
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
            <NameField isSubmitting={isSubmitting} />
            <EmailField isSubmitting={isSubmitting} />
            <PasswordField isSubmitting={isSubmitting} />
            <ConfirmPasswordField isSubmitting={isSubmitting} />
          </FormProvider>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle className="h-6 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
}
