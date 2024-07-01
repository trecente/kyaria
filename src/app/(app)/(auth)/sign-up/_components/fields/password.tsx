import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PasswordFieldProps {
  isSubmitting: boolean;
}

export function PasswordField({ isSubmitting }: PasswordFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Password</FormLabel>

          <FormControl>
            <Input
              {...field}
              placeholder="********"
              disabled={isSubmitting}
              type="password"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
