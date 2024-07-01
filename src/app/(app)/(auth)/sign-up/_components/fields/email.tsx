import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EmailFieldProps {
  isSubmitting: boolean;
}

export function EmailField({ isSubmitting }: EmailFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Email</FormLabel>

          <FormControl>
            <Input
              {...field}
              placeholder="e.g johndoe@example.com"
              disabled={isSubmitting}
              type="email"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
