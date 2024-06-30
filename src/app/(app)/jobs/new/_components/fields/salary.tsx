import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MaskInput } from "@/components/ui/mask-input";

interface SalaryFieldProps {
  isSubmitting: boolean;
}

export function SalaryField({ isSubmitting }: SalaryFieldProps) {
  const { control } = useFormContext();

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
