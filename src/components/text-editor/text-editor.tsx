import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import OrderedList from "@tiptap/extension-ordered-list";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import ImageResize from "tiptap-extension-resize-image";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { useMemo } from "react";
import { EditorContextProvider } from "@/contexts";
import TextStyle from "@tiptap/extension-text-style";
import { cleanHtml, handlePaste } from "@/lib/text-editor";

import "./text-editor.css";

interface IProps {
  value: string;
  onChange: (data: string) => void;
}

export const TextEditor = ({ value, onChange }: IProps) => {
  const defaultValue = useMemo(
    () => cleanHtml((value as string) || ""),
    [value]
  );
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      TextStyle.extend({
        addAttributes() {
          return {
            style: {
              default: this.options.HTMLAttributes.style,
            },
          };
        },
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      BulletList,
      OrderedList,
      Highlight,
      Image,
      ImageResize,
    ],
    content: defaultValue,

    editorProps: {
      attributes: {
        class:
          "prose cursor-auto !h-full rounded-b-lg border min-h-[150px] bg-[#f7f7f7] dark:bg-neutral-900 border1 outline-none p-2 focus:border-primary dark:border-black dark:focus:border-primary transition [&_ol]:list-decimal [&_ul]:list-disc [&_img]:!w-[120px] [&_img]:!h-[120px] [&_img]:object-cover",
      },
      handlePaste: (a, b) => handlePaste(a, b),
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContextProvider
      editor={editor}
      isLoading={true}
      setIsLoading={() => {}}
    >
      <Toolbar />
      <EditorContent editor={editor} className="tiptap" />
    </EditorContextProvider>
  );
};
