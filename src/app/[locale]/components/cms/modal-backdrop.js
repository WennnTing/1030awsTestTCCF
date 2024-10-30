"use client";

import { useRouter } from "next/navigation";
import styles from "./modal-backdrop.module.scss";

export default function ModalBackdrop() {
  const router = useRouter();

  return <div className={styles.cmsModalBackdrop} onClick={router.back} />;
}
