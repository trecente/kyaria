"use client";

import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";

import { cn } from "@/lib/utils";

import { EditorBubbleMenu } from "./editor-bubble-menu";

interface EditorProps {
  onChange: (content: string) => void;
  isSubmitting: boolean;
}

export function Editor({ onChange, isSubmitting }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        code: false,
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: "Write your job description here...",
      }),
      Markdown,
      Underline,
    ],
    editorProps: {
      attributes: {
        class:
          "border prose dark:prose-invert min-w-full min-h-[245px] max-h-[245px] rounded-md overflow-y-auto bg-background p-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.storage.markdown.getMarkdown());
    },
  });

  useEffect(() => {
    if (isSubmitting) {
      editor?.setEditable(false);
    } else {
      editor?.setEditable(true);
    }
  }, [isSubmitting, editor]);

  return (
    <>
      <EditorContent
        editor={editor}
        className={cn(isSubmitting && "cursor-not-allowed opacity-50")}
      />
      {editor && (
        <BubbleMenu
          className="overflow-hidden rounded-lg border border-input bg-background shadow-xl shadow-black/20"
          editor={editor}
        >
          <EditorBubbleMenu editor={editor} />
        </BubbleMenu>
      )}
    </>
  );
}
