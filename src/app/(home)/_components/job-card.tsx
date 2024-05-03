import { Job } from "@prisma/client";
import { Calendar, Clock, Earth, MapPin, Wallet } from "lucide-react";
import Image from "next/image";

import {
  formatCurrency,
  formatDateToRelativeString,
  verifyImageUrl,
} from "@/lib/utils";

import { Markdown } from "@/components/markdown";
import { Card, CardContent } from "@/components/ui/card";

import companyLogoDefault from "@/assets/logo.svg";

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
    salary,
    createdAt,
  },
}: JobCardProps) {
  let companyLogoUrl: string | undefined;
  if (companyLogo) {
    companyLogoUrl = await verifyImageUrl(companyLogo);
  }

  return (
    <Card className="cursor-pointer transition-all duration-100 hover:bg-primary-foreground">
      <CardContent className="p-6">
        <div className="relative">
          <div className="absolute right-0 md:right-auto">
            <Image
              src={companyLogoUrl || companyLogoDefault}
              alt={`${companyName} Logo`}
              className="aspect-square rounded-lg"
              width={50}
              height={50}
            />
          </div>

          <div className="absolute right-0 hidden rounded-md bg-blue-600/[0.1] p-1.5 md:block">
            <div className="flex items-center gap-1 font-medium text-blue-600">
              <Earth className="size-5 shrink-0" strokeWidth={1.5} />
              <p className="text-sm">{location || "Worldwide"}</p>
            </div>
          </div>

          <div className="pr-10 md:px-16">
            <h1 className="font-medium tracking-tight md:text-sm">
              {companyName}
            </h1>
            <h1 className="mb-1 text-xl font-semibold md:mb-0 md:text-lg">
              {title}
            </h1>

            <div className="flex flex-col gap-1 text-muted-foreground md:mt-1 md:max-w-[470px] md:flex-row md:justify-between md:gap-0">
              <div className="flex items-center gap-1">
                <MapPin
                  className="size-6 shrink-0 md:size-5"
                  strokeWidth={1.5}
                />
                <p className="md:text-sm">{locationType}</p>
              </div>

              <div className="flex items-center gap-1">
                <Clock
                  className="size-6 shrink-0 md:size-5"
                  strokeWidth={1.5}
                />
                <p className="md:text-sm">{type}</p>
              </div>

              <div className="flex items-center gap-1">
                <Wallet
                  className="size-6 shrink-0 md:size-5"
                  strokeWidth={1.5}
                />
                <p className="md:text-sm">{formatCurrency(salary)}</p>
              </div>

              <div className="flex items-center gap-1">
                <Calendar
                  className="size-6 shrink-0 md:size-5"
                  strokeWidth={1.5}
                />
                <p className="md:text-sm">
                  {formatDateToRelativeString(createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-1 md:hidden">
                <Earth className="size-6 shrink-0" strokeWidth={1.5} />
                <p>{location || "Worldwide"}</p>
              </div>
            </div>

            <div className="mt-2 hidden md:block">
              <Markdown className="line-clamp-2 text-muted-foreground">{`${description}...`}</Markdown>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
