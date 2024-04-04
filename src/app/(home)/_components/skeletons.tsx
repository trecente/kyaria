import { Card, CardContent } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <Card className="h-[180px]">
      <CardContent className="p-6">
        <div className="relative">
          <Skeleton className="absolute size-14" />

          <Skeleton className="absolute right-0 h-5 w-72" />

          <div className="px-16">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="my-3 h-5 w-48" />

            <Skeleton className="h-4 w-[470px]" />

            <Skeleton className="mt-2.5 h-10 w-[600px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Skeletons() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-48" />

      <div className="space-y-2">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
