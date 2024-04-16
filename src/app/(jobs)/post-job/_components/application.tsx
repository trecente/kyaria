import { Control, UseFormTrigger } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ApplicationEmailField } from "./fields/application-email";
import { ApplicationUrlField } from "./fields/application-url";

interface JobApplicationProps {
  control: Control<CreateJobType>;
  trigger: UseFormTrigger<CreateJobType>;
  isSubmitting: boolean;
}

export function JobApplication({
  control,
  isSubmitting,
  trigger,
}: JobApplicationProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>How to Apply</CardTitle>
        <CardDescription>
          Add the application link or email to apply.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <ApplicationEmailField
            control={control}
            isSubmitting={isSubmitting}
          />
          <ApplicationUrlField
            control={control}
            trigger={trigger}
            isSubmitting={isSubmitting}
          />
        </div>
      </CardContent>
    </Card>
  );
}
