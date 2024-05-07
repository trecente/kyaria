import { Control } from "react-hook-form";

import { LEVEL_OPTIONS } from "@/lib/constants";
import { CreateJobType } from "@/lib/schemas";

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

interface LevelFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function LevelField({ control, isSubmitting }: LevelFieldProps) {
  return (
    <FormField
      control={control}
      name="jobLevel"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Level</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSubmitting}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {LEVEL_OPTIONS.map((type) => (
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
