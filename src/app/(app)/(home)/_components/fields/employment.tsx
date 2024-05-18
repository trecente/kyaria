import { Control } from "react-hook-form";

import { EMPLOYMENT_TYPES_OPTIONS } from "@/lib/constants";
import { FilterType } from "@/lib/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmploymentFieldProps {
  control: Control<FilterType>;
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
          <FormLabel>Employment Type</FormLabel>

          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an employment type" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              {EMPLOYMENT_TYPES_OPTIONS.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
