import { useFormContext } from "react-hook-form";

import { WORK_LOCATIONS } from "@/lib/constants";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkLocationFieldProps {
  isSubmitting: boolean;
}

export function WorkLocationField({ isSubmitting }: WorkLocationFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="work"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Work Location</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a work location" />
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
