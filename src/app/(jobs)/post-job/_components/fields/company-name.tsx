import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CompanyNameFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function CompanyNameField({
  control,
  isSubmitting,
}: CompanyNameFieldProps) {
  return (
    <FormField
      control={control}
      name="companyName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>

          <FormControl>
            <Input
              {...field}
              placeholder="e.g. Vercel"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
