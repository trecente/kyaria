import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface NameFieldProps {
  isSubmitting: boolean;
}

export function NameField({ isSubmitting }: NameFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Name</FormLabel>

          <FormControl>
            <Input {...field} placeholder="John Doe" disabled={isSubmitting} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
