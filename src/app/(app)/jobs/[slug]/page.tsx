import { Metadata } from "next";

import { getJobBySlug, getSlugs } from "@/lib/fetchers";

import { HeroDescription, HeroHeading, HeroSection } from "@/components/hero";

import { Details } from "./_components/details";

interface JobProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getSlugs();

  return slugs;
}

export async function generateMetadata({
  params: { slug },
}: JobProps): Promise<Metadata> {
  const job = await getJobBySlug(slug);

  return {
    title: `${job.title} at ${job.companyName}`,
  };
}

export default async function Job({ params: { slug } }: JobProps) {
  const job = await getJobBySlug(slug);

  return (
    <div className="container">
      <HeroSection className="mb-5 md:mb-7">
        <HeroHeading>{job.title}</HeroHeading>
        <HeroDescription>{`${job.companyName} is looking for a ${job.title} to join their team.`}</HeroDescription>
      </HeroSection>

      <div className="grid gap-4">
        <Details job={job} />
      </div>
    </div>
  );
}
