"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { filterJobs } from "@/lib/actions";
import { FilterType, filterSchema } from "@/lib/schemas";
import { validateFilterParams } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { EmploymentField } from "./fields/employment";
import { LocationField } from "./fields/location";
import { SearchField } from "./fields/search";
import { WorkLocationField } from "./fields/work";

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

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FilterType) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    await filterJobs(formData);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:block xl:space-y-4">
          <SearchField control={control} isSubmitting={isSubmitting} />
          <LocationField
            control={control}
            isSubmitting={isSubmitting}
            locations={locations}
          />
          <WorkLocationField control={control} isSubmitting={isSubmitting} />
          <EmploymentField control={control} isSubmitting={isSubmitting} />
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
