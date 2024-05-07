"use server";

import { del, put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import path from "path";

import { prisma } from "./prisma";
import { createJobSchema, filterSchema } from "./schemas";
import { toSlug } from "./utils";

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

export async function createJob(formData: FormData): Promise<void> {
  const validatedFields = createJobSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.error(`Invalid form data: ${JSON.stringify(validatedFields)}`);
    throw new Error(
      "Some fields are invalid or missing, please check and try again",
    );
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
    jobLevel,
    applicationEmail,
    applicationUrl,
  } = validatedFields.data;

  const slug = `${toSlug(title, companyName)}-${nanoid(10)}`;

  const formattedSalary = salary.replace(/[$,]/g, "");

  let companyLogoUrl: string | undefined;

  if (companyLogo) {
    try {
      const logoPath = `company_logos/${slug}${path.extname(companyLogo.name)}`;
      const { url } = await put(logoPath, companyLogo, {
        access: "public",
        addRandomSuffix: false,
      });

      companyLogoUrl = url;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Failed to upload company logo: ${error.message}`);
        throw new Error("Failed to upload company logo.");
      }

      throw new Error("Unknown error occurred while uploading company logo.");
    }
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
        jobLevel,
        companyName: companyName.trim(),
        companyLogo: companyLogoUrl,
        applicationEmail: applicationEmail?.trim(),
        applicationUrl: applicationUrl?.trim(),
        description: description.trim(),
        salary: parseInt(formattedSalary),
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (companyLogoUrl) {
        try {
          await del(companyLogoUrl);
        } catch (error: any) {
          console.error(`Failed to delete company logo: ${error.message}`);
        }
      }

      console.error(`Failed to create job: ${error.message}`);
      throw new Error("Failed to post job. Please try again later.");
    }

    throw new Error("Unknown error occurred while creating job.");
  }
}
