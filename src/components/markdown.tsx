import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={cn("min-w-full break-words", className)}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
}
