"use client";

import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

import { EditorBubbleMenu } from "./editor-bubble-menu";

interface EditorProps {
  onChange: (content: string) => void;
}

export function Editor({ onChange }: EditorProps) {
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
          "border prose dark:prose-invert min-w-full rounded-md min-h-[400px] bg-background p-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.storage.markdown.getMarkdown());
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
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
