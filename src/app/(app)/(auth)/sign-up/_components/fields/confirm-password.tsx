import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ConfirmPasswordFieldProps {
  isSubmitting: boolean;
}

export function ConfirmPasswordField({
  isSubmitting,
}: ConfirmPasswordFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Confirm Password</FormLabel>

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
