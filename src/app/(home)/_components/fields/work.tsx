import { Control } from "react-hook-form";

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

import { WORK_LOCATIONS } from "@/lib/constants";

interface WorkLocationProps {
  control: Control;
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
