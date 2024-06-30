import { CompanyLogoField } from "../fields/company-logo";
import { CompanyNameField } from "../fields/company-name";

import { Card, CardContent } from "@/components/ui/card";

interface CompanyProps {
  isSubmitting: boolean;
}

export function Company({ isSubmitting }: CompanyProps) {
  return (
    <Card className="pt-6">
      <CardContent>
        <div className="space-y-4">
          <CompanyNameField isSubmitting={isSubmitting} />
          <CompanyLogoField isSubmitting={isSubmitting} />
        </div>
      </CardContent>
    </Card>
  );
}
