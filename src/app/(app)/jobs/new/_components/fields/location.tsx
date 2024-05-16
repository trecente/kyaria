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

interface LocationFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function LocationField({ control, isSubmitting }: LocationFieldProps) {
  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>

          <FormControl>
            <Input
              {...field}
              placeholder="e.g. Cupertino, California, United States"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
