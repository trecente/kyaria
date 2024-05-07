import { Control } from "react-hook-form";

import { EMPLOYMENT_TYPES } from "@/lib/constants";
import { CreateJobType } from "@/lib/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmploymentFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function EmploymentField({
  control,
  isSubmitting,
}: EmploymentFieldProps) {
  return (
    <FormField
      control={control}
      name="employment"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Employment Type</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an employment type" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {EMPLOYMENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
