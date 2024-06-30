"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createJob } from "@/lib/actions";
import { CreateJobType, createJobSchema } from "@/lib/schemas";

import { NavActions, NavContainer, NavHeading } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Company } from "./cards/company";
import { Details } from "./cards/details";
import { Location } from "./cards/location";

export function CreateJob() {
  const router = useRouter();

  const form = useForm<CreateJobType>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      description: "",
      salary: "",
      companyName: "",
      companyLogo: "",
      location: "",
      applicationUrl: "",
      applicationEmail: "",
      education: undefined,
      experience: undefined,
      employment: undefined,
      work: undefined,
    },
  });

  const { handleSubmit } = form;

  const [isSubmitting, startTransition] = useTransition();

  const onSubmit: SubmitHandler<CreateJobType> = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]: [string, unknown]) => {
      formData.append(key, value as string);
    });

    startTransition(async () => {
      try {
        await createJob(formData);

        toast.success("Job submitted successfully and will be reviewed.", {
          duration: 5000,
        });

        router.push("/");
      } catch (error) {
        toast.error((error as Error).message, {
          duration: 5000,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <NavContainer>
          <NavHeading>Post a Job</NavHeading>
          <NavActions>
            <Button
              variant="outline"
              className="hidden md:flex"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="h-6 animate-spin" />
              ) : (
                "Publish"
              )}
            </Button>
          </NavActions>
        </NavContainer>

        <div className="grid gap-4 md:grid-cols-[1fr_16rem]">
          <FormProvider {...form}>
            <Details isSubmitting={isSubmitting} />

            <div className="flex flex-col gap-4">
              <Company isSubmitting={isSubmitting} />
              <Location isSubmitting={isSubmitting} />
            </div>
          </FormProvider>
        </div>

        <Button
          variant="outline"
          className="w-full md:hidden"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircle className="h-6 animate-spin" />
          ) : (
            "Publish"
          )}
        </Button>
      </form>
    </Form>
  );
}
