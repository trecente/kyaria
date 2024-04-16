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
          <FormLabel>Salary</FormLabel>

          <FormControl>
            <Input
              {...field}
              placeholder="e.g. $120,000"
              type="number"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
