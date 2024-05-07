import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MaskInput } from "@/components/ui/mask-input";

interface SalaryFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function SalaryField({ control, isSubmitting }: SalaryFieldProps) {
  return (
    <FormField
      control={control}
      name="salary"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Salary</FormLabel>

          <FormControl>
            <MaskInput
              {...field}
              placeholder="e.g. $120,000"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
