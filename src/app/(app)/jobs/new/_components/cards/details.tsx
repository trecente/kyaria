import { ApplicationEmailField } from "../fields/application-email";
import { ApplicationUrlField } from "../fields/application-url";
import { DescriptionField } from "../fields/description";
import { EducationField } from "../fields/education";
import { ExperienceField } from "../fields/experience";
import { SalaryField } from "../fields/salary";
import { TitleField } from "../fields/title";
import { Control, UseFormTrigger } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import { Card, CardContent } from "@/components/ui/card";

interface DetailsProps {
  control: Control<CreateJobType>;
  trigger: UseFormTrigger<CreateJobType>;
  isSubmitting: boolean;
}

export function Details({ control, trigger, isSubmitting }: DetailsProps) {
  return (
    <Card className="h-full pt-6">
      <CardContent>
        <div className="space-y-4">
          <TitleField control={control} isSubmitting={isSubmitting} />
          <SalaryField control={control} isSubmitting={isSubmitting} />
          <div className="grid gap-4 md:grid-cols-2 md:gap-x-2 md:gap-y-4">
            <EducationField control={control} isSubmitting={isSubmitting} />
            <ExperienceField control={control} isSubmitting={isSubmitting} />
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
          <DescriptionField control={control} isSubmitting={isSubmitting} />
        </div>
      </CardContent>
    </Card>
  );
}
