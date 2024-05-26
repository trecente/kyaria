import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import { Editor } from "@/components/editor/editor";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DescriptionFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function DescriptionField({
  control,
  isSubmitting,
}: DescriptionFieldProps) {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Description</FormLabel>

          <FormControl>
            <Editor onChange={field.onChange} isSubmitting={isSubmitting} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
