"use client";
import styles from "./submit-button.module.scss";

import { useFormStatus } from "react-dom";

export default function ArticleValidationFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.cmsSubmitButton} disabled={pending}>
      {pending ? "loading..." : "檢查欄位"}
    </button>
  );
}
