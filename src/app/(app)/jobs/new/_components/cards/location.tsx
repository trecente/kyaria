import { EmploymentField } from "../fields/employment";
import { LocationField } from "../fields/location";
import { WorkLocationField } from "../fields/work";
import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import { Card, CardContent } from "@/components/ui/card";

interface LocationProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function Location({ control, isSubmitting }: LocationProps) {
  return (
    <Card className="h-full pt-6">
      <CardContent>
        <div className="space-y-4">
          <LocationField control={control} isSubmitting={isSubmitting} />
          <WorkLocationField control={control} isSubmitting={isSubmitting} />
          <EmploymentField control={control} isSubmitting={isSubmitting} />
        </div>
      </CardContent>
    </Card>
  );
}
