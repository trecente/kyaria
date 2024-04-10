import { Control } from "react-hook-form";

import { WORK_LOCATIONS } from "@/lib/constants";
import { FilterType } from "@/lib/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkLocationProps {
  control: Control<FilterType>;
  isSubmitting: boolean;
}

export function WorkLocationField({
  control,
  isSubmitting,
}: WorkLocationProps) {
  return (
    <FormField
      control={control}
      name="work"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="work">Work Location</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ?? undefined}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a work type" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {WORK_LOCATIONS.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
