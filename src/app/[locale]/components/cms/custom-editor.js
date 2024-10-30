"use client"; // only in App Router
import styles from "./custom-editor.module.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
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
  FontColor,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

import { FiInfo } from "react-icons/fi";

export default function CustomEditor({
  content,
  setContent,
  elementId,
  id,
  state,
  onChangeFun,
}) {
  return (
    <div className={styles.cmsCustomEditor}>
      <label>
        上架內容
        <span className={styles.cmsCustomEditor__required}>&#42;</span>
      </label>
      <CKEditor
        editor={ClassicEditor}
        id={elementId}
        data={state}
        config={{
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "bold",
              "italic",
              "fontColor",
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
            FontColor,
          ],
        }}
        onChange={(event, editor) =>
          onChangeFun
            ? onChangeFun(id, elementId, editor.getData())
            : setContent(editor.getData())
        }
      />
      <input
        name={elementId ?? "content"}
        value={state ?? content}
        id={elementId ?? "content"}
        hidden
      />
      <div className={styles.cmsCustomEditor__notice}>
        <div className={styles.cmsCustomEditor__notice_icon}>
          <FiInfo />
        </div>
        <span>
          圖片格式：png或jpg圖檔，建議尺寸：1920*910、2560*1214px、3840*1820px
        </span>
      </div>
    </div>
  );
}
