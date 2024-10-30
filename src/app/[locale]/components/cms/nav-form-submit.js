"use client";
import styles from "./submit-button.module.scss";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

export default function NavFormSubmit() {
  const { pending } = useFormStatus();
  const searchParams = useSearchParams();
  const queryType = searchParams.get("type");

  return (
    <button className={styles.cmsSubmitButton} disabled={pending}>
      {pending ? "loading..." : queryType === "edit" ? "更新路由" : "創建路由"}
    </button>
  );
}
