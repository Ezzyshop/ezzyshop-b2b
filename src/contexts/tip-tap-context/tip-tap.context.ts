import { createContext, useContext } from "react";
import { Editor } from "@tiptap/react";

export type Context = {
  editor: Editor | null;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
};

export const EditorContext = createContext<Context>({} as Context);

export const useEditorContext = () => useContext(EditorContext);
