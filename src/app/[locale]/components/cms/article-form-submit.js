"use client";
import styles from "./submit-button.module.scss";

import { useFormStatus } from "react-dom";

export default function ArticleFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.cmsSubmitButton} disabled={pending}>
      {pending ? "loading..." : "創建文章"}
    </button>
  );
}
