import { Metadata } from "next";
import { Suspense } from "react";

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

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <div className="mx-auto max-w-sm space-y-2 py-10 text-center sm:max-w-xl sm:space-y-2 sm:py-14 md:max-w-3xl md:space-y-4 md:py-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Find your <span className="text-blue-600">new job</span> today.
        </h1>
        <p className="text-base text-muted-foreground md:text-xl">
          Thousands of jobs in the computer, engineering and technology sectors
          are waiting for you.
        </p>
      </div>

      <div className="gap-4 xl:grid xl:grid-cols-12">
        <aside className="col-span-2 h-fit xl:sticky xl:top-0">
          <Filter />
        </aside>

        <div className="col-span-8">
          <Suspense fallback={<Skeletons />}>
            <JobList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
