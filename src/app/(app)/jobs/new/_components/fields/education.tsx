import { useFormContext } from "react-hook-form";

import { EDUCATION_DEGREES_OPTIONS } from "@/lib/constants";

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

interface EducationFieldProps {
  isSubmitting: boolean;
}

export function EducationField({ isSubmitting }: EducationFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="education"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Education</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an education" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {EDUCATION_DEGREES_OPTIONS.map((type) => (
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
