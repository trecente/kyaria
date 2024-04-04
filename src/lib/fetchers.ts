import { prisma } from "./prisma";

import { Job } from "@prisma/client";

export async function getJobs(): Promise<Job[]> {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return jobs;
  } catch (error) {
    console.log(`Failed to fetch jobs: ${error}`);
    return [];
  }
}
