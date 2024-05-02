import { Metadata } from "next";

import { getJobBySlug, getSlugs } from "@/lib/fetchers";
import { formatDateToRelativeString } from "@/lib/utils";

import { HeroSection } from "@/components/hero";
import { Navigation } from "@/components/navigation";

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
    <>
      <HeroSection
        title={job.title}
        subtitle={`${job.companyName} is looking for a ${job.title} to join their team.`}
      />

      <div className="grid gap-4">
        <Navigation title="Details" />
        <Details job={job} />
      </div>
    </>
  );
}
