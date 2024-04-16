import { type Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface EditorBubbleMenuProps {
  editor: Editor;
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem
        onClick={() => editor.chain().focus().toggleBold().run()}
        data-state={editor.isActive("bold") ? "on" : ""}
        value="bold"
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => editor.chain().focus().toggleItalic().run()}
        data-state={editor.isActive("italic") ? "on" : ""}
        value="italic"
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        data-state={editor.isActive("underline") ? "on" : ""}
        value="underline"
        aria-label="Toggle underline"
      >
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => editor.chain().focus().toggleStrike().run()}
        data-state={editor.isActive("strike") ? "on" : ""}
        value="strike"
        aria-label="Toggle strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
