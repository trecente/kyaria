import { useFormContext } from "react-hook-form";

import { EMPLOYMENT_TYPES_OPTIONS } from "@/lib/constants";

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
  isSubmitting: boolean;
}

export function EmploymentField({ isSubmitting }: EmploymentFieldProps) {
  const { control } = useFormContext();

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
              {EMPLOYMENT_TYPES_OPTIONS.map((type) => (
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
