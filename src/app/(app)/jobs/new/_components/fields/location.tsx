import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LocationFieldProps {
  isSubmitting: boolean;
}

export function LocationField({ isSubmitting }: LocationFieldProps) {
  const { control } = useFormContext();

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
