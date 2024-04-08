import { JobCard } from "./job-card";

import { getJobs } from "@/lib/fetchers";
import { FilterType } from "@/lib/schemas";

export async function JobList({ searchParams }: { searchParams: FilterType }) {
  const jobs = await getJobs(searchParams);

  return (
    <div className="xl:space-y-4">
      <div className="flex justify-center md:block">
        <h1 className="py-4 text-lg font-semibold tracking-tight xl:py-0 xl:text-base">
          Showing <span className="text-blue-600">{jobs.length}</span> available
          jobs
        </h1>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <h1 className="text-xl font-semibold">Jobs not found.</h1>
        </div>
      )}
    </div>
  );
}
