"use client";
import styles from "./submit-button.module.scss";

import { useFormStatus } from "react-dom";

export default function ArticleUpdateFormSubmit({ mode }) {
  const { pending } = useFormStatus();

  return (
    <button className={styles.cmsSubmitButton} disabled={pending}>
      {pending ? "loading..." : mode === "content" ? "更新文章" : "更新資訊"}
    </button>
  );
}
