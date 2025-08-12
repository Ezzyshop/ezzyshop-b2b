import { type PropsWithChildren, useMemo } from "react";
import { Editor } from "@tiptap/react";
import { EditorContext, type Context } from "./tip-tap.context";

type Props = {
  editor: Editor | null;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
};

export const EditorContextProvider = ({
  children,
  editor,
  isLoading,
  setIsLoading,
}: PropsWithChildren<Props>) => {
  const contextValue = useMemo<Context>(
    () => ({
      editor,
      isLoading,
      setIsLoading,
    }),
    [editor]
  );

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};
