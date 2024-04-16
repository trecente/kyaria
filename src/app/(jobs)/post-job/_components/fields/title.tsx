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

interface TitleFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function TitleField({ control, isSubmitting }: TitleFieldProps) {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>

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
