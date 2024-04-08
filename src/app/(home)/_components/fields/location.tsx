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

interface LocationFieldProps {
  control: Control;
  isSubmitting: boolean;
  locations: string[];
}

export function LocationField({
  control,
  isSubmitting,
  locations,
}: LocationFieldProps) {
  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="location">Location</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
