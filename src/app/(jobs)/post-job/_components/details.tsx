import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DescriptionField } from "./fields/description";
import { EducationField } from "./fields/education";
import { ExperienceField } from "./fields/experience";
import { SalaryField } from "./fields/salary";
import { TitleField } from "./fields/title";

interface JobDetailsProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function JobDetails({ control, isSubmitting }: JobDetailsProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Details</CardTitle>
        <CardDescription>Add the job details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TitleField control={control} isSubmitting={isSubmitting} />
          <SalaryField control={control} isSubmitting={isSubmitting} />
          <div className="grid grid-cols-2 gap-2">
            <EducationField control={control} isSubmitting={isSubmitting} />
            <ExperienceField control={control} isSubmitting={isSubmitting} />
          </div>
          <DescriptionField control={control} />
        </div>
      </CardContent>
    </Card>
  );
}
