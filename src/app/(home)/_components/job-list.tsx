import Link from "next/link";

import { getJobs } from "@/lib/fetchers";
import { FilterType } from "@/lib/schemas";

import { JobCard } from "./job-card";

export async function JobList({ searchParams }: { searchParams: FilterType }) {
  const jobs = await getJobs(searchParams);

  return (
    <div className="space-y-2">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={job.slug}
          className="block transition-all duration-100 hover:scale-[1.01]"
        >
          <JobCard job={job} />
        </Link>
      ))}
    </div>
  );
}
