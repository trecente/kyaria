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

interface ApplicationEmailFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function ApplicationEmailField({
  control,
  isSubmitting,
}: ApplicationEmailFieldProps) {
  return (
    <FormField
      control={control}
      name="applicationEmail"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>Email</FormLabel>

          <FormControl>
            <Input
              {...field}
              type="email"
              placeholder="e.g. apply@company.com"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
