"use client";
import styles from "@/components/cms/submit-button.module.scss";

import { useFormStatus } from "react-dom";

export default function AddBannerFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.cmsSubmitButton} disabled={pending}>
      {pending ? "loading..." : "創建橫幅"}
    </button>
  );
}
