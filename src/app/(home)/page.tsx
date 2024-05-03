import { Metadata } from "next";
import { Suspense } from "react";

import { getJobs } from "@/lib/fetchers";

import { HeroSection } from "@/components/hero";

import { Filter } from "./_components/filter";
import { JobList } from "./_components/job-list";
import { Skeletons } from "./_components/skeletons";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function generateMetadata({ searchParams: { q } }: HomeProps): Metadata {
  const title = q ? `Search results for "${q}"` : "Home";

  return {
    title,
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const jobs = await getJobs(searchParams);

  return (
    <>
      <HeroSection
        title="Find your new job today"
        subtitle="Thousands of jobs in the computer, engineering and technology sectors
        are waiting for you."
        highlight="new job"
      />

      <div className="mt-5 grid-cols-[15rem_1fr_15rem] gap-4 xl:grid">
        <aside className="h-fit xl:sticky xl:top-0">
          <Filter />
        </aside>

        {jobs.length > 0 ? (
          <Suspense fallback={<Skeletons />}>
            <JobList searchParams={searchParams} />
          </Suspense>
        ) : (
          <div className="flex items-center justify-center py-32 xl:py-0">
            <h1 className="text-xl font-semibold">Jobs not found.</h1>
          </div>
        )}
      </div>
    </>
  );
}
