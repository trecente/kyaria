import { JobCard } from "./job-card";

import { getJobs } from "@/lib/fetchers";

export async function JobList() {
  const jobs = await getJobs();

  return (
    <div className="xl:space-y-4">
      <div className="flex justify-center md:block">
        <h1 className="py-4 text-lg font-semibold tracking-tight xl:py-0 xl:text-base">
          Showing <span className="text-blue-600">{jobs.length}</span> available
          jobs
        </h1>
      </div>

      <div className="space-y-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
