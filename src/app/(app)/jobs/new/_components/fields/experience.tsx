import { Control } from "react-hook-form";

import { WORK_EXPERIENCE_OPTIONS } from "@/lib/constants";
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

interface ExperienceFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function ExperienceField({
  control,
  isSubmitting,
}: ExperienceFieldProps) {
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
