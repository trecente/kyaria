"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createJob } from "@/lib/actions";
import { CreateJobType, createJobSchema } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { JobApplication } from "./application";
import { JobCompany } from "./company";
import { JobDetails } from "./details";
import { JobLocation } from "./location";

export function NewJob() {
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
      employment: undefined,
      work: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    trigger,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: CreateJobType) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]: [string, unknown]) => {
      formData.append(key, value as string);
    });

    try {
      await createJob(formData);
      toast.success("Job submitted successfully and will be reviewed.", {
        duration: 5000,
      });
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
            Post a Job
          </h1>
          <div className="ml-auto hidden md:block">
            <Button variant="outline" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoaderCircle className="h-6 animate-spin" />
              ) : (
                "Publish Job"
              )}
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_16rem]">
          <div className="flex flex-col gap-4">
            <JobDetails control={control} isSubmitting={isSubmitting} />
            <JobApplication
              control={control}
              trigger={trigger}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="flex flex-col gap-4">
            <JobCompany control={control} isSubmitting={isSubmitting} />
            <JobLocation control={control} isSubmitting={isSubmitting} />
          </div>
        </div>

        <Button
          className="w-full md:hidden"
          variant="secondary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircle className="h-6 animate-spin" />
          ) : (
            "Publish Job"
          )}
        </Button>
      </form>
    </Form>
  );
}
