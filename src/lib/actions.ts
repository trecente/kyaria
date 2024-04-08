"use server";

import { redirect } from "next/navigation";

import { filterSchema } from "./schemas";

export async function filterJobs(formData: FormData): Promise<void | null> {
  const validatedFields = filterSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) return null;

  const { q, location, work, employment } = validatedFields.data;

  const parsedLocationName = location === "All" ? null : location;
  const parsedWork = work === "Any" ? null : work;
  const parsedEmployment = employment === "Any" ? null : employment;

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(parsedLocationName && { location: parsedLocationName }),
    ...(parsedWork && { work: parsedWork }),
    ...(parsedEmployment && { employment: parsedEmployment }),
  });

  redirect(`?${searchParams.toString()}`);
}
