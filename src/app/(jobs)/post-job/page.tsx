import { Metadata } from "next";

import { NewJob } from "./_components/new-job";

export const metadata: Metadata = {
  title: "Post a Job",
};

export default function PostJob() {
  return (
    <>
      <div className="mx-auto max-w-sm space-y-2 py-10 text-center sm:max-w-xl sm:space-y-2 sm:py-14 md:max-w-3xl md:space-y-4 md:py-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Post a <span className="text-blue-600">new job</span>.
        </h1>
        <p className="text-base text-muted-foreground md:text-xl">
          Get your job posting seen by thousands of developers.
        </p>
      </div>

      <NewJob />
    </>
  );
}
