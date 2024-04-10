import { Control } from "react-hook-form";

import { FilterType } from "@/lib/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SearchFieldProps {
  control: Control<FilterType>;
  isSubmitting: boolean;
}

export function SearchField({ control, isSubmitting }: SearchFieldProps) {
  return (
    <FormField
      control={control}
      name="q"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="q">Search</FormLabel>

          <FormControl>
            <Input
              {...field}
              placeholder="Title, company, etc."
              disabled={isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
