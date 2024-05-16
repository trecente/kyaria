import { cn } from "@/lib/utils";

export function HeroSection({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-12 pb-8 md:py-24 md:pb-14",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function HeroHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]",
        className,
      )}
      {...props}
    />
  );
}

export function HeroDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "max-w-[750px] text-center text-lg text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function HeroActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full select-none items-center justify-center space-x-4 py-4 md:pb-10",
        className,
      )}
      {...props}
    />
  );
}
