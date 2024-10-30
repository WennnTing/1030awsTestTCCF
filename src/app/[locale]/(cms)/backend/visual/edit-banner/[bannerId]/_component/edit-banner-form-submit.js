"use client";
import styles from "@/components/cms/submit-button.module.scss";

import { useFormStatus } from "react-dom";

export default function EditBannerFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.cmsSubmitButton} disabled={pending}>
      {pending ? "loading..." : "更新橫幅"}
    </button>
  );
}
