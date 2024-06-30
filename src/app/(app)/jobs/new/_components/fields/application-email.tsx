import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ApplicationEmailFieldProps {
  isSubmitting: boolean;
}

export function ApplicationEmailField({
  isSubmitting,
}: ApplicationEmailFieldProps) {
  const { control } = useFormContext();

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
