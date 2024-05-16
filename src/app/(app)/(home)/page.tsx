import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { getDistinctLocations, getJobsCount } from "@/lib/fetchers";
import { cn } from "@/lib/utils";

import {
  HeroActions,
  HeroDescription,
  HeroHeading,
  HeroSection,
} from "@/components/hero";
import { buttonVariants } from "@/components/ui/button";

import { Filter } from "./_components/filter";
import { JobList } from "./_components/job-list";
import { Skeletons } from "./_components/skeletons";
import { siteConfig } from "@/config/site";

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
  const count = await getJobsCount(searchParams);
  const locations = await getDistinctLocations();

  return (
    <div className="container">
      <HeroSection>
        <HeroHeading>Discover your next exciting job opportunity</HeroHeading>
        <HeroDescription>
          Browse through a diverse range of job openings in the computer,
          engineering, and technology sectors.
        </HeroDescription>
        <HeroActions>
          <Link
            href="/jobs/new"
            className={cn(buttonVariants(), "rounded-full")}
          >
            Post a Job
          </Link>
          <Link
            target="_blank"
            href={siteConfig.links.github_repo}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full",
            )}
          >
            <GitHubLogoIcon className="mr-2 size-[1.2rem]" />
            GitHub
          </Link>
        </HeroActions>
      </HeroSection>

      <div className="grid gap-4 xl:grid-cols-[15rem_1fr_15rem]">
        <Filter locations={locations} />

        {count > 0 && (
          <Suspense fallback={<Skeletons />}>
            <JobList searchParams={searchParams} />
          </Suspense>
        )}

        {count === 0 && (
          <div className="grid place-content-center">
            <h1 className="text-xl font-semibold text-muted-foreground">
              No jobs found.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
