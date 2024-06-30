import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TitleFieldProps {
  isSubmitting: boolean;
}

export function TitleField({ isSubmitting }: TitleFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Title</FormLabel>

          <FormControl>
            <Input
              {...field}
              placeholder="e.g. Software Engineer"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
