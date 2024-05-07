import { NumericFormat, NumericFormatProps } from "react-number-format";

import { cn } from "@/lib/utils";

interface MaskInputProps extends NumericFormatProps {}

export function MaskInput({ className, type, ...props }: MaskInputProps) {
  return (
    <NumericFormat
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      type={type}
      prefix="$"
      allowNegative={false}
      thousandSeparator=","
      {...props}
    />
  );
}
