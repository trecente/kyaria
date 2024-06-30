import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ApplicationUrlFieldProps {
  isSubmitting: boolean;
}

export function ApplicationUrlField({
  isSubmitting,
}: ApplicationUrlFieldProps) {
  const { control, trigger } = useFormContext();

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
