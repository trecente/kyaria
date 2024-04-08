"use client";

import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";

import { LoaderCircle } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { EmploymentField } from "./fields/employment";
import { LocationField } from "./fields/location";
import { SearchField } from "./fields/search";
import { WorkLocationField } from "./fields/work";

import { filterJobs } from "@/lib/actions";
import { FilterType, filterSchema } from "@/lib/schemas";
import { validateFilterParams } from "@/lib/utils";

interface FilterFormProps {
  locations: string[];
}

export function FilterForm({ locations }: FilterFormProps) {
  const searchParams = useSearchParams();

  const filterParams = Object.fromEntries(searchParams.entries());

  const validatedFilters = validateFilterParams(filterParams);

  const { q, location, work, employment } = validatedFilters ?? {};

  const selectedLocation = locations.find((prevLoc) => prevLoc === location);

  const form = useForm<FilterType>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      q: q ?? "",
      location: selectedLocation ?? "All",
      work: work ?? "Any",
      employment: employment ?? "Any",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FilterType) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    await filterJobs(formData);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:block xl:space-y-4">
          <SearchField control={form.control} isSubmitting={isSubmitting} />
          <LocationField
            control={form.control}
            isSubmitting={isSubmitting}
            locations={locations}
          />
          <WorkLocationField
            control={form.control}
            isSubmitting={isSubmitting}
          />
          <EmploymentField control={form.control} isSubmitting={isSubmitting} />
        </div>

        <Button className="w-full" variant="secondary" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle className="h-6 animate-spin" />
          ) : (
            "Filter"
          )}
        </Button>
      </form>
    </Form>
  );
}
