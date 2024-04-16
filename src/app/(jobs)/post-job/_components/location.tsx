import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { EmploymentField } from "./fields/employment";
import { LocationField } from "./fields/location";
import { WorkLocationField } from "./fields/work";

interface JobLocationProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function JobLocation({ control, isSubmitting }: JobLocationProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Location</CardTitle>
        <CardDescription>Add the location details.</CardDescription>
      </CardHeader>
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
