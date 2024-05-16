import { Metadata } from "next";

import { HeroDescription, HeroHeading, HeroSection } from "@/components/hero";

import { CreateJob } from "./_components/create-job";

export const metadata: Metadata = {
  title: "Post a Job",
};

export default function PostJob() {
  return (
    <div className="container">
      <HeroSection className="mb-5 md:mb-0">
        <HeroHeading>Share your job opportunity</HeroHeading>
        <HeroDescription>
          Find the perfect candidate! Share exciting opportunities and connect
          with talented individuals.
        </HeroDescription>
      </HeroSection>

      <CreateJob />
    </div>
  );
}
