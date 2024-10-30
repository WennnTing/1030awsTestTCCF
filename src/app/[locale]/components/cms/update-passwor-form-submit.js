"use client";
import styles from "./submit-button.module.scss";

import { useFormStatus } from "react-dom";

export default function UpdatePasswordFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.cmsSubmitButton} disabled={pending}>
      {pending ? "loading..." : "修改密碼"}
    </button>
  );
}
