import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Control } from "react-hook-form";

import { CreateJobType } from "@/lib/schemas";
import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(selectedImage ? URL.createObjectURL(selectedImage) : "");
  }, [selectedImage]);

  return (
    <FormField
      control={control}
      name="companyLogo"
      render={({ field: { value: image, ...field } }) => (
        <FormItem>
          <FormLabel>Logo</FormLabel>

          <div
            className={cn(
              "aspect-square rounded-lg border border-neutral-300 dark:border-border",
              !image && "border-dashed",
            )}
          >
            {!image && (
              <button
                onClick={() => inputFileRef.current?.click()}
                type="button"
                disabled={isSubmitting}
                className="flex size-full items-center justify-center"
              >
                <Upload className="size-4 text-muted-foreground" />
              </button>
            )}

            {image && image.type.startsWith("image/") && (
              <Avatar className="relative size-full rounded-lg">
                <Button
                  size="icon"
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    field.onChange("");
                  }}
                  disabled={isSubmitting}
                  variant="outline"
                  className="absolute right-2 top-2 size-6 border-none bg-neutral-950/50 hover:bg-neutral-950/60"
                >
                  <X strokeWidth={2} className="size-[1.2rem] text-white" />
                </Button>

                <AvatarImage
                  onClick={() => inputFileRef.current?.click()}
                  src={previewUrl}
                  className="cursor-pointer"
                />

                <div className="absolute bottom-0 w-full bg-neutral-950/50 px-2 py-1.5">
                  <p className="truncate text-center text-sm text-white">
                    {image.name}
                  </p>
                </div>
              </Avatar>
            )}
          </div>

          <FormControl>
            <Input
              {...field}
              className="hidden"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedImage(e.target.files[0]);
                  field.onChange(e.target.files[0]);
                }
              }}
              ref={inputFileRef}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
