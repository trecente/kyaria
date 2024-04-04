import Image from "next/image";

import companyLogoDefault from "@/assets/logo.svg";

import { Job } from "@prisma/client";

import { Card, CardContent } from "@/components/ui/card";

import { Calendar, Clock, Earth, MapPin, Wallet } from "lucide-react";

import { formatCurrency, formatDateToRelativeString } from "@/lib/utils";

interface JobCardProps {
  job: Job;
}

export function JobCard({
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
  return (
    <Card className="cursor-pointer">
      <CardContent className="p-6">
        <div className="relative">
          <div className="absolute right-0 md:right-auto">
            <Image
              src={companyLogo ?? companyLogoDefault}
              alt={`${companyName} Logo`}
              width={50}
              height={50}
            />
          </div>

          <div className="absolute right-0 hidden rounded-md bg-blue-600/[0.1] p-1.5 md:block">
            <div className="flex items-center gap-1 font-medium text-blue-600">
              <Earth className="size-5 shrink-0" strokeWidth={1.5} />
              <p className="text-sm">{location ?? "Worldwide"}</p>
            </div>
          </div>

          <div className="pr-10 md:px-16">
            <h1 className="text-sm font-medium tracking-tight">
              {companyName}
            </h1>
            <h1 className="mb-1 text-xl font-semibold md:mb-0 md:text-lg">
              {title}
            </h1>

            <div className="flex flex-col gap-1 font-medium tracking-tighter text-muted-foreground md:mt-1 md:max-w-[470px] md:flex-row md:justify-between md:gap-0">
              <div className="flex items-center gap-1 md:gap-0">
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
                <p>{location ?? "Worldwide"}</p>
              </div>
            </div>

            <div className="mt-2 hidden md:block">
              <p className="text-muted-foreground">
                {description.length > 180
                  ? `${description.slice(0, 180)}...`
                  : description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
