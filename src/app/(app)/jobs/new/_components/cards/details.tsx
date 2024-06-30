import { ApplicationEmailField } from "../fields/application-email";
import { ApplicationUrlField } from "../fields/application-url";
import { DescriptionField } from "../fields/description";
import { EducationField } from "../fields/education";
import { ExperienceField } from "../fields/experience";
import { SalaryField } from "../fields/salary";
import { TitleField } from "../fields/title";

import { Card, CardContent } from "@/components/ui/card";

interface DetailsProps {
  isSubmitting: boolean;
}

export function Details({ isSubmitting }: DetailsProps) {
  return (
    <Card className="h-full overflow-x-hidden pt-6">
      <CardContent>
        <div className="space-y-4">
          <TitleField isSubmitting={isSubmitting} />
          <SalaryField isSubmitting={isSubmitting} />
          <div className="grid gap-4 md:grid-cols-2 md:gap-x-2 md:gap-y-4">
            <EducationField isSubmitting={isSubmitting} />
            <ExperienceField isSubmitting={isSubmitting} />
            <ApplicationEmailField isSubmitting={isSubmitting} />
            <ApplicationUrlField isSubmitting={isSubmitting} />
          </div>
          <DescriptionField isSubmitting={isSubmitting} />
        </div>
      </CardContent>
    </Card>
  );
}
