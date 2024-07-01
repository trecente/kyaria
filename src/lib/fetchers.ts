import { Job, User } from "@prisma/client";
import { list } from "@vercel/blob";
import { notFound } from "next/navigation";
import { cache } from "react";

import { prisma } from "./prisma";
import { FilterType } from "./schemas";
import { createJobFilter } from "./utils";

export const getJobs = cache(
  async (searchParams: FilterType): Promise<Job[]> => {
    const filter = createJobFilter(searchParams);

    try {
      const jobs = await prisma.job.findMany({
        where: filter,
        orderBy: {
          createdAt: "desc",
        },
      });

      return jobs;
    } catch (error) {
      return [];
    }
  },
);

export const getJobsCount = cache(
  async (searchParams: FilterType = {}): Promise<number> => {
    const filter = createJobFilter(searchParams);

    try {
      const count = await prisma.job.count({
        where: filter,
      });

      return count;
    } catch (error) {
      return 0;
    }
  },
);

export const getDistinctLocations = cache(async (): Promise<string[]> => {
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
    return [];
  }
});

export const getImages = cache(async (): Promise<string[]> => {
  try {
    const { blobs } = await list();

    return blobs.map(({ url }) => url);
  } catch (error) {
    return [];
  }
});

export const getSlugs = cache(async (): Promise<string[]> => {
  try {
    const slugs = await prisma.job.findMany({
      where: { approved: true },
      select: { slug: true },
    });

    return slugs.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
});

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
    notFound();
  }
});

export const getUserByEmail = cache(
  async (email: string): Promise<User | null> => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) return null;

      return user;
    } catch (error) {
      return null;
    }
  },
);
