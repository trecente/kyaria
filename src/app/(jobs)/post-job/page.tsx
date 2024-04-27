import { Metadata } from "next";

import { HeroSection } from "@/components/hero";

import { NewJob } from "./_components/new-job";

export const metadata: Metadata = {
  title: "Post a Job",
};

export default function PostJob() {
  return (
    <>
      <HeroSection
        title="Post a new job"
        subtitle="Get your job posting seen by thousands of developers."
        highlight="new job"
      />

      <NewJob />
    </>
  );
}
