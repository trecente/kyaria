import { Job } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { Map } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatCurrency } from "@/lib/utils";

import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ApplyButton } from "./apply-button";
import { Overview } from "./overview";
import companyLogoDefault from "@/assets/logo.svg";

interface DetailsProps {
  job: Job;
}

export function Details({
  job: {
    title,
    description,
    salary,
    type,
    companyLogo,
    companyName,
    education,
    experience,
    location,
    locationType,
    applicationEmail,
    applicationUrl,
    createdAt,
    updatedAt,
  },
}: DetailsProps) {
  const isRecentlyPosted =
    createdAt.getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;

  return (
    <>
      <Card>
        <CardContent className="px-6 py-4">
          <div className="flex select-none items-center gap-4 px-1">
            <Image
              src={companyLogo || companyLogoDefault}
              alt={`${companyName} Logo`}
              width={75}
              height={75}
              className="aspect-square rounded-lg"
            />

            <div className="flex grow items-center justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-base font-semibold sm:text-xl md:text-lg">
                  {title}
                </h1>
                <div className="flex gap-2">
                  <Badge variant="secondary">{type}</Badge>
                  {isRecentlyPosted && <Badge variant="destructive">New</Badge>}
                </div>
              </div>

              {applicationEmail && applicationUrl ? (
                <ApplyButton
                  applicationUrl={applicationUrl}
                  applicationEmail={applicationEmail}
                />
              ) : (
                <Link
                  href={applicationUrl || `mailto:${applicationEmail}`}
                  className={buttonVariants({
                    variant: "secondary",
                    className: "hidden sm:flex",
                  })}
                  target={applicationUrl ? "_blank" : "_self"}
                  prefetch={false}
                >
                  Apply Now{" "}
                  <ArrowRight className="ml-1" strokeWidth={1.5} size={20} />
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_25rem]">
        <Card className="order-2 lg:order-first">
          <CardContent className="p-10">
            <Markdown className="prose prose-sm dark:prose-invert md:prose-base">
              {description}
            </Markdown>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="px-4 py-6">
              <div className="flex flex-col items-center gap-4 md:flex-row md:gap-0 md:divide-x">
                <div className="order-2 flex flex-1 flex-col items-center px-2 md:order-first">
                  <h1 className="font-medium">Salary (USD)</h1>
                  <p className="text-sm font-semibold text-green-700">
                    {formatCurrency(salary)}
                  </p>
                  <small className="text-muted-foreground">Yearly Salary</small>
                </div>

                <div className="flex flex-1 flex-col items-center overflow-hidden px-3">
                  <Map
                    strokeWidth={1.5}
                    className="text-blue-600 dark:text-blue-500"
                  />
                  <h1 className="font-medium">Location</h1>
                  <small className="break-all text-center text-muted-foreground">
                    {location || "Worldwide"}
                  </small>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="grid grid-cols-3 gap-y-4">
                <Overview
                  details={{
                    companyName,
                    education,
                    experience,
                    locationType,
                    createdAt,
                    updatedAt,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
