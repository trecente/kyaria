import { Job } from "@prisma/client";
import { Earth } from "lucide-react";
import Link from "next/link";

import { verifyImageUrl } from "@/lib/utils";

import { Markdown } from "@/components/markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { JobDetails } from "./job-details";

interface JobCardProps {
  job: Job;
}

export async function JobCard({
  job: {
    title,
    description,
    companyLogo,
    companyName,
    location,
    locationType,
    type,
    slug,
    salary,
    createdAt,
  },
}: JobCardProps) {
  let companyLogoUrl: string | undefined;
  if (companyLogo) {
    companyLogoUrl = await verifyImageUrl(companyLogo);
  }

  return (
    <Link href={`/jobs/${slug}`} className="block">
      <Card className="cursor-pointer transition-all duration-150 hover:bg-primary-foreground">
        <CardContent className="p-6">
          <div className="relative">
            <div className="absolute right-0 md:right-auto">
              <Avatar className="size-12 rounded-lg">
                <AvatarImage src={companyLogoUrl} />
                <AvatarFallback className="rounded-lg">
                  {companyName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="absolute right-0 hidden md:block">
              <div className="flex items-center gap-1 font-medium text-muted-foreground">
                <Earth className="size-5 shrink-0" strokeWidth={1.5} />
                <p className="text-sm">{location || "Worldwide"}</p>
              </div>
            </div>

            <div className="md:px-16">
              <h1 className="text-base font-medium tracking-tight">
                {companyName}
              </h1>
              <h1 className="mb-2 break-all pr-16 text-lg font-semibold md:mb-0 md:pr-0">
                {title}
              </h1>

              <JobDetails
                details={{ location, locationType, type, salary, createdAt }}
              />

              <div className="hidden md:block">
                <Markdown className="line-clamp-2 break-all text-muted-foreground">{`${description}...`}</Markdown>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
