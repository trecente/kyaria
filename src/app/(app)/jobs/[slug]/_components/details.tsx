import { Job } from "@prisma/client";
import Link from "next/link";

import { formatCurrency } from "@/lib/utils";

import { Markdown } from "@/components/markdown";
import { NavActions, NavContainer, NavHeading } from "@/components/nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ApplyButton } from "./apply-button";
import { Overview } from "./overview";

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
  return (
    <>
      <NavContainer>
        <NavHeading>Details</NavHeading>
        <NavActions>
          {applicationEmail && applicationUrl ? (
            <ApplyButton
              applicationUrl={applicationUrl}
              applicationEmail={applicationEmail}
            />
          ) : (
            <Link
              href={applicationUrl || `mailto:${applicationEmail}`}
              className={buttonVariants({
                variant: "outline",
              })}
              target={applicationUrl ? "_blank" : "_self"}
              prefetch={false}
            >
              Apply Now
            </Link>
          )}
        </NavActions>
      </NavContainer>

      <div className="grid gap-4 lg:grid-cols-[1fr_25rem]">
        <Card className="order-last lg:order-first">
          <CardContent className="p-10">
            <Markdown className="prose prose-sm dark:prose-invert md:prose-base">
              {description}
            </Markdown>
          </CardContent>
        </Card>

        <div className="flex select-none flex-col gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="size-12 rounded-lg">
                  <AvatarImage src={companyLogo || ""} />
                  <AvatarFallback className="rounded-lg">
                    {companyName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-center space-y-2">
                  <h1 className="text-base font-semibold sm:text-lg">
                    {title}
                  </h1>

                  <Badge>{type}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="grid items-center gap-4 sm:grid-cols-2 sm:gap-0 sm:divide-x">
                <div className="flex flex-col items-center">
                  <h1 className="font-medium">Salary (USD)</h1>
                  <p className="text-sm font-semibold text-green-700">
                    {formatCurrency(salary)}
                  </p>
                  <small className="text-muted-foreground">Yearly Salary</small>
                </div>

                <div className="flex flex-col items-center">
                  <h1 className="font-medium">Location</h1>
                  <p className="break-all text-center text-sm text-muted-foreground">
                    {location ? (
                      <>
                        {location.split(",")[0]}, {location.split(",")[1]}
                        <br />
                        {location.split(",")[2]}
                      </>
                    ) : (
                      "Worldwide"
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
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
