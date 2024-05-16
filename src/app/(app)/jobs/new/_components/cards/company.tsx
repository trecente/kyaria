import { CompanyLogoField } from "../fields/company-logo";
import { CompanyNameField } from "../fields/company-name";
import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import { Card, CardContent } from "@/components/ui/card";

interface CompanyProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function Company({ control, isSubmitting }: CompanyProps) {
  return (
    <Card className="pt-6">
      <CardContent>
        <div className="space-y-4">
          <CompanyNameField control={control} isSubmitting={isSubmitting} />
          <CompanyLogoField control={control} isSubmitting={isSubmitting} />
        </div>
      </CardContent>
    </Card>
  );
}
