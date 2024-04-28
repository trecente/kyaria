import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <ReactMarkdown className={cn("min-w-full break-words", className)}>
      {children}
    </ReactMarkdown>
  );
}
