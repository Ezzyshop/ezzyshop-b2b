import { EditorView } from "@tiptap/pm/view";
import { uploadFile } from "@/lib/upload";
import { DOMParser as ProseMirrorDOMParser } from "prosemirror-model";

const removeParagraphTagFromVideo = (html: string) => {
  const regex = /<p[^>]*>(<video[^>]*>[\s\S]*?<\/video>)<\/p>/gi;

  const videoTagOnly = html.replace(regex, function (_, p1) {
    return p1;
  });

  return videoTagOnly;
};

const cleanHtml = (html: string) => {
  const iframesCleanedHtml = html
    .replace(/\\/g, "")
    .replace(/<iframe(.*?)<\/iframe>/g, '<div class="media-wrapper">$&</div>');

  const videoTagOnly = removeParagraphTagFromVideo(iframesCleanedHtml);

  return videoTagOnly;
};

const handlePaste = (view: EditorView, event: ClipboardEvent) => {
  const items = Array.from(event.clipboardData?.items || []);

  for (const item of items) {
    const file = item.getAsFile();

    if (file && item.type.includes("image")) {
      uploadFileForEditor(file, view);

      return true; // handled
    }
  }

  // Handle code content
  const codeText = event.clipboardData?.getData("text/plain");
  if (codeText && isCode(codeText)) {
    if (view.state.schema.nodes.code_block) {
      const codeBlock = view.state.schema.nodes.code_block.create(
        {},
        view.state.schema.text(codeText)
      );
      const transaction = view.state.tr.replaceSelectionWith(codeBlock);
      view.dispatch(transaction);
      return true;
    }
    return false;
  }

  // Handle HTML content
  const html = event.clipboardData?.getData("text/html");
  if (html) {
    const div = document.createElement("div");
    div.innerHTML = html;

    // Remove color-related styles
    (div.querySelectorAll("*") as NodeListOf<HTMLElement>).forEach((el) => {
      el.style.removeProperty("color");
      el.style.removeProperty("background-color");
      el.removeAttribute("color");
    });

    const fragment = ProseMirrorDOMParser.fromSchema(
      view.state.schema
    ).parseSlice(div);
    view.dispatch(view.state.tr.replaceSelection(fragment));
    return true;
  }

  // Handle plain text
  const plainText = event.clipboardData?.getData("text/plain");
  if (plainText) {
    view.dispatch(view.state.tr.insertText(plainText));
    return true;
  }

  return false; // not handled, use default behaviour
};

const uploadFileForEditor = async (
  file: File,
  view: EditorView,
  onComplete?: () => void
) => {
  const _URL = window.URL || window.webkitURL;
  const img = new Image(); /* global Image */
  img.src = _URL.createObjectURL(file);

  img.onload = function () {
    // uploadImage will be your function to upload the image to the server or s3 bucket somewhere
    uploadFile({
      file,
      url: "file-upload",
      onSuccess: () => {},
      setIsUploading: () => {},
    })
      .then(function (response) {
        const { schema } = view.state;
        // response is the image url for where it has been saved
        // place the now uploaded image in the editor where it was pasted
        const node = schema.nodes.image.create({
          src: (response as { data: { url: string } }).data.url,
        }); // creates the image element

        const transaction = view.state.tr.replaceSelectionWith(node); // places it in the correct position
        view.dispatch(transaction);
      })
      .catch(function (error) {
        if (error) {
          window.alert(
            "Rasm yuklashda xatolik yuz berdi, iltimos qayta urinib ko`ring."
          );
        }
      })
      .finally(onComplete);
  };
};

const isCode = (text: string): boolean => {
  const codePatterns = [
    /(function|def|func|sub|void|public|private|protected|class|static)\s+\w+\s*\([^)]*\)\s*(\{|:)/i,
    /(if|else|for|while|do|switch|case|return|import|from|using|require|include|package|namespace|try|catch|throw)\s+/i,
    /(var|let|const|int|float|double|string|char|boolean|bool|public|private)\s+\w+\s*(=|;)/i,
    /(class|interface|struct|enum)\s+\w+/i,
    /(\/\/|#|\/\*|\*\/|<!--).*$/m,
    /(\w+)\s*(=|\+=|-=|\*=|\/=)\s*[\w\d\s'"`;()[\]{}+\-*/%&|^]+(;|$)/m,
    /\{\s*[\w\W]*?\}/m,
    /["'`].*?["'`]/m,
    /^\s{2,}[\w\d]+/m,
  ];

  for (const pattern of codePatterns) {
    if (pattern.test(text)) {
      return true;
    }
  }

  const codeSymbols = /[{}[]\(\);=\+-\*\/%&\|\^]/g;
  const matches = text.match(codeSymbols);

  if (matches && matches.length > 5) {
    return true;
  }

  return false;
};

export { cleanHtml, handlePaste };
