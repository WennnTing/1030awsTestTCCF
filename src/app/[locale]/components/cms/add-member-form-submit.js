"use client";
import styles from "./submit-button.module.scss";

import { useFormStatus } from "react-dom";

export default function AddMemberFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.cmsSubmitButton} disabled={pending}>
      {pending ? "loading..." : "創建帳號"}
    </button>
  );
}
