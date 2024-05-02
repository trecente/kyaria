import { Job, Prisma } from "@prisma/client";
import { list } from "@vercel/blob";
import { notFound } from "next/navigation";
import { cache } from "react";

import { prisma } from "./prisma";
import { FilterType } from "./schemas";

export async function getJobs(searchParams: FilterType): Promise<Job[]> {
  const { q, location, work: locationType, employment: type } = searchParams;

  const searchQuery = q?.trim().split(/\s+/).filter(Boolean).join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchQuery
    ? {
        OR: [
          { title: { search: searchQuery } },
          { companyName: { search: searchQuery } },
          { location: { search: searchQuery } },
        ],
      }
    : {};

  const filter: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      location && { location: { equals: location } },
      locationType && { locationType: { equals: locationType } },
      type && { type: { equals: type } },
      { approved: true },
    ].filter(Boolean) as Prisma.JobWhereInput["AND"],
  };

  try {
    const jobs = await prisma.job.findMany({
      where: filter,
      orderBy: {
        createdAt: "desc",
      },
    });

    return jobs;
  } catch (error) {
    console.error(`Failed to fetch jobs: ${error}`);
    return [];
  }
}

export async function getDistinctLocations(): Promise<string[]> {
  try {
    const distinctLocations = await prisma.job.findMany({
      where: {
        approved: true,
      },
      select: {
        location: true,
      },
      distinct: ["location"],
    });

    return distinctLocations
      .map(({ location }) => location)
      .filter(Boolean) as string[];
  } catch (error) {
    console.error(`Failed to fetch locations: ${error}`);
    return [];
  }
}

export async function getImages(): Promise<string[]> {
  try {
    const { blobs } = await list();

    return blobs.map(({ url }) => url).filter(Boolean) as string[];
  } catch (error) {
    console.error(`Failed to fetch images: ${error}`);
    return [];
  }
}

export async function getSlugs(): Promise<string[]> {
  try {
    const slugs = await prisma.job.findMany({
      where: { approved: true },
      select: { slug: true },
    });

    return slugs.map(({ slug }) => slug);
  } catch (error) {
    console.error(`Failed to fetch slugs: ${error}`);
    return [];
  }
}

export const getJobBySlug = cache(async (slug: string): Promise<Job> => {
  try {
    const job = await prisma.job.findUnique({
      where: {
        slug,
      },
    });

    if (!job) notFound();

    return job;
  } catch (error) {
    console.error(`Failed to fetch job: ${error}`);
    notFound();
  }
});
