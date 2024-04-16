import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CompanyLogoFieldProps {
  control: Control<CreateJobType>;
  isSubmitting: boolean;
}

export function CompanyLogoField({
  control,
  isSubmitting,
}: CompanyLogoFieldProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <FormField
      control={control}
      name="companyLogo"
      render={({ field: { value: image, ...field } }) => (
        <FormItem>
          <FormLabel>Logo</FormLabel>

          <FormControl>
            <>
              <button
                onClick={() => inputFileRef.current?.click()}
                type="button"
                className="relative flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                disabled={isSubmitting}
              >
                {image && image.type.startsWith("image/") ? (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Company Logo"
                    fill
                  />
                ) : (
                  <Upload className="size-4 text-muted-foreground" />
                )}
              </button>
              <Input
                {...field}
                className="hidden"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={(e) => {
                  if (e.target.files) field.onChange(e.target.files[0]);
                }}
                ref={inputFileRef}
              />
              <Button
                onClick={() => {
                  field.onChange("");
                }}
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                disabled={isSubmitting}
              >
                Remove
              </Button>
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
