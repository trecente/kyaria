import { useFormContext } from "react-hook-form";

import { Editor } from "@/components/editor/editor";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DescriptionFieldProps {
  isSubmitting: boolean;
}

export function DescriptionField({ isSubmitting }: DescriptionFieldProps) {
  const { control } = useFormContext();

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
