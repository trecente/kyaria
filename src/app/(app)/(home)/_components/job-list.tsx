import { getJobs } from "@/lib/fetchers";
import { FilterType } from "@/lib/schemas";

import { JobCard } from "./job-card";

export async function JobList({ searchParams }: { searchParams: FilterType }) {
  const jobs = await getJobs(searchParams);

  return (
    <div className="select-none space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
