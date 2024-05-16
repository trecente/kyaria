import { Control, UseFormTrigger } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ApplicationUrlFieldProps {
  control: Control<CreateJobType>;
  trigger: UseFormTrigger<CreateJobType>;
  isSubmitting: boolean;
}

export function ApplicationUrlField({
  control,
  trigger,
  isSubmitting,
}: ApplicationUrlFieldProps) {
  return (
    <FormField
      control={control}
      name="applicationUrl"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>Website</FormLabel>

          <FormControl>
            <Input
              {...field}
              type="url"
              placeholder="e.g. https://www.company.com/apply"
              disabled={isSubmitting}
              onChange={(e) => {
                field.onChange(e);
                trigger("applicationEmail");
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
