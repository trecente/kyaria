import { cn } from "@/lib/utils";

export function Wrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-2 xl:px-0", className)}>
      {children}
    </div>
  );
}
