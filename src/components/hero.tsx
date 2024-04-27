interface HeroProps {
  title: string;
  subtitle: string;
  highlight?: string;
}

export function HeroSection({ title, subtitle, highlight }: HeroProps) {
  const highlightRegex = highlight ? new RegExp(`(${highlight})`, "gi") : null;

  const highlightedText = highlightRegex
    ? title.split(highlightRegex).map((part, i) =>
        highlightRegex.test(part) ? (
          <span className="text-blue-600" key={i}>
            {part}
          </span>
        ) : (
          part
        ),
      )
    : title;

  return (
    <div className="mx-auto max-w-sm space-y-2 py-10 text-center sm:max-w-xl sm:space-y-2 sm:py-14 md:max-w-3xl md:space-y-4 md:py-20">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        {highlightedText}
      </h1>
      <p className="text-base text-muted-foreground md:text-xl">{subtitle}</p>
    </div>
  );
}
