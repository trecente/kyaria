import { cn } from "@/lib/utils";

export function Wrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6", className)}
    >
      {children}
    </div>
  );
}
