import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CompanyNameFieldProps {
  isSubmitting: boolean;
}

export function CompanyNameField({ isSubmitting }: CompanyNameFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="companyName"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Name</FormLabel>

          <FormControl>
            <Input
              {...field}
              placeholder="e.g. Vercel"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
