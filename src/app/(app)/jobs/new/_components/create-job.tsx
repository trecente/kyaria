"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
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

  const {
    handleSubmit,
    control,
    trigger,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<CreateJobType> = async (data) => {
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
          <Details
            control={control}
            trigger={trigger}
            isSubmitting={isSubmitting}
          />

          <div className="flex flex-col gap-4">
            <Company control={control} isSubmitting={isSubmitting} />
            <Location control={control} isSubmitting={isSubmitting} />
          </div>
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