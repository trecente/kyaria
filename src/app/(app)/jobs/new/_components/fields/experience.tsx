import { useFormContext } from "react-hook-form";

import { WORK_EXPERIENCE_OPTIONS } from "@/lib/constants";

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

interface ExperienceFieldProps {
  isSubmitting: boolean;
}

export function ExperienceField({ isSubmitting }: ExperienceFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="experience"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Experience</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an experience" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {WORK_EXPERIENCE_OPTIONS.map((type) => (
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
