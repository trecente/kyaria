"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ListFilter, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { filterJobs } from "@/lib/actions";
import { FilterType, filterSchema } from "@/lib/schemas";
import { validateFilterParams } from "@/lib/utils";

import { useDebounce } from "@/hooks/use-debounce";
import { useWindowSize } from "@/hooks/use-window-size";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { EmploymentField } from "./fields/employment";
import { LocationField } from "./fields/location";
import { SearchField } from "./fields/search";
import { WorkLocationField } from "./fields/work";

interface FilterProps {
  locations: string[];
}

export function Filter({ locations }: FilterProps) {
  const { width } = useWindowSize();
  const debouncedWidth = useDebounce(width, 300);

  const [showFilter, setShowFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    const shouldShowFilter = debouncedWidth && debouncedWidth > 1280;

    setShowFilter(shouldShowFilter ? "filter" : undefined);
  }, [debouncedWidth]);

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

    try {
      await filterJobs(formData);
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full select-none"
      value={showFilter}
    >
      <AccordionItem value="filter">
        <AccordionTrigger className="md:-mt-10 md:pt-0 xl:cursor-default">
          <div className="flex items-center">
            <ListFilter strokeWidth={1.5} className="mr-2" />
            Filters
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 md:grid-cols-4 xl:block xl:space-y-4">
                    <SearchField
                      control={control}
                      isSubmitting={isSubmitting}
                    />
                    <LocationField
                      control={control}
                      isSubmitting={isSubmitting}
                      locations={locations}
                    />
                    <WorkLocationField
                      control={control}
                      isSubmitting={isSubmitting}
                    />
                    <EmploymentField
                      control={control}
                      isSubmitting={isSubmitting}
                    />
                  </div>

                  <Button className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <LoaderCircle className="h-6 animate-spin" />
                    ) : (
                      "Filter"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
