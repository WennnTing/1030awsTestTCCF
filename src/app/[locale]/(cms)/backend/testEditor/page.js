"use client"; // only in App Router
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  List,
  Undo,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Base64UploadAdapter,
  Link,
  Table,
  TableColumnResize,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { test } from "@/actions/page";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { createPage } from "@/actions/pages";
export default function TestEditorPage() {
  const [content, setContent] = useState("");
  const { pending } = useFormStatus();
  const data = [
    {
      elementId: "element1",
      fieldTextZh: content,
      fieldTextEn: "",
      fieldValue: "",
      ImageBase64: "",
    },
  ];
  const [state, formAction] = useFormState(test.bind(null, content), {});

  // const handleAction = () => {
  //   batchCreatePageFieldValues(data, "62369013-78e5-4146-879d-cb816bc24504");
  // };

  return (
    <form action={formAction}>
      <textarea name="content" value={content} />
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "bold",
              "italic",
              "|",
              "heading",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "uploadImage",
              "insertTable",
              "|",
              "link",
            ],
          },

          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Heading,
            List,
            Undo,
            Image,
            ImageCaption,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            Base64UploadAdapter,
            Link,
            Table,
            TableColumnResize,
          ],
        }}
        onChange={(event, editor) => setContent(editor.getData())}
      />
      <button>{pending ? "loading.." : "go"}</button>
    </form>
  );
}
