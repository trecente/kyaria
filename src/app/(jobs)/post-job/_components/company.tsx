import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CompanyLogoField } from "./fields/company-logo";
import { CompanyNameField } from "./fields/company-name";

interface JobCompanyProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function JobCompany({ control, isSubmitting }: JobCompanyProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Company</CardTitle>
        <CardDescription>Add the company details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CompanyNameField control={control} isSubmitting={isSubmitting} />
          <CompanyLogoField control={control} isSubmitting={isSubmitting} />
        </div>
      </CardContent>
    </Card>
  );
}
