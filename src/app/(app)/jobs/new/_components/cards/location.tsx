import { EmploymentField } from "../fields/employment";
import { LocationField } from "../fields/location";
import { WorkLocationField } from "../fields/work";

import { Card, CardContent } from "@/components/ui/card";

interface LocationProps {
  isSubmitting: boolean;
}

export function Location({ isSubmitting }: LocationProps) {
  return (
    <Card className="h-full pt-6">
      <CardContent>
        <div className="space-y-4">
          <LocationField isSubmitting={isSubmitting} />
          <WorkLocationField isSubmitting={isSubmitting} />
          <EmploymentField isSubmitting={isSubmitting} />
        </div>
      </CardContent>
    </Card>
  );
}
