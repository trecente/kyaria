"use server";

import { del } from "@vercel/blob";
import { nanoid } from "nanoid";
import path from "path";

import { PostJobError, UnknownError, ValidationError } from "@/lib/exceptions";

import { prisma } from "./prisma";
import { createJobSchema, filterSchema } from "./schemas";
import { toSlug, uploadCompanyLogo } from "./utils";

/**
 * Filters jobs.
 */
export async function filterJobs(formData: FormData): Promise<string> {
  const validatedFields = filterSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  const { q, location, work, employment } = validatedFields;

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(location !== "All" && { location }),
    ...(work !== "Any" && { work }),
    ...(employment !== "Any" && { employment }),
  });

  return searchParams.toString();
}

/**
 * Creates a new job.
 */
export async function createJob(formData: FormData): Promise<void> {
  const validatedFields = createJobSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    throw new ValidationError();
  }

  const {
    title,
    description,
    companyName,
    companyLogo,
    employment: type,
    location,
    work: locationType,
    salary,
    education,
    experience,
    applicationEmail,
    applicationUrl,
  } = validatedFields.data;

  const slug = `${toSlug(title, companyName)}-${nanoid(10)}`;
  const formattedSalary = salary.replace(/[$,]/g, "");

  let companyLogoUrl: string | undefined;

  if (companyLogo) {
    const logoPath = `company_logos/${slug}${path.extname(companyLogo.name)}`;

    const url = await uploadCompanyLogo(logoPath, companyLogo);

    companyLogoUrl = url;
  }

  try {
    await prisma.job.create({
      data: {
        slug,
        title: title.trim(),
        type,
        location,
        locationType,
        education,
        experience,
        companyName: companyName.trim(),
        companyLogo: companyLogoUrl,
        applicationEmail: applicationEmail?.trim(),
        applicationUrl: applicationUrl?.trim(),
        description: description.trim(),
        salary: parseInt(formattedSalary),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (companyLogoUrl) {
        await del(companyLogoUrl);
      }

      throw new PostJobError();
    }

    throw new UnknownError();
  }
}
