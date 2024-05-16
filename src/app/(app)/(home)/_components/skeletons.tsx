import { getJobsCount } from "@/lib/fetchers";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <Card>
      <CardContent className="h-[242px] p-6 md:h-[182px]">
        <div className="relative">
          <Skeleton className="absolute right-0 size-12 md:right-auto" />

          <Skeleton className="absolute right-0 hidden h-5 w-52 md:block" />

          <div className="md:px-16">
            <Skeleton className="h-3 w-20" />

            <Skeleton className="my-3 h-5 w-48" />

            <Skeleton className="my-3 h-4 w-28 md:hidden" />
            <Skeleton className="my-3 h-4 w-28 md:hidden" />
            <Skeleton className="my-3 h-4 w-28 md:hidden" />
            <Skeleton className="my-3 h-4 w-28 md:hidden" />
            <Skeleton className="my-3 h-4 w-28 md:hidden" />

            <Skeleton className="hidden h-4 w-[470px] md:block" />

            <Skeleton className="mt-2.5 hidden h-10 md:block" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export async function Skeletons() {
  const count = await getJobsCount();

  return (
    <div className="space-y-4">
      {new Array(Math.min(count, 10)).fill(0).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
