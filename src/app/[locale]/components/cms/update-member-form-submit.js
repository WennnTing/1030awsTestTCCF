"use client";
import styles from "./submit-button.module.scss";

import { useFormStatus } from "react-dom";

export default function UpdateMemberFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.cmsSubmitButton} disabled={pending}>
      {pending ? "loading..." : "更新帳號"}
    </button>
  );
}
