import { Metadata } from "next";
import { Suspense } from "react";

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

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <HeroSection
        title="Find your new job today"
        subtitle="Thousands of jobs in the computer, engineering and technology sectors
        are waiting for you."
        highlight="new job"
      />

      <div className="grid-cols-[15rem_1fr_15rem] gap-4 xl:grid">
        <aside className="h-fit xl:sticky xl:top-0">
          <Filter />
        </aside>
        <Suspense fallback={<Skeletons />}>
          <JobList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
