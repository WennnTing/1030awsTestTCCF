"use client";
import { useRouter } from "../../../../navigation";
import styles from "@/(frontend)/notFound.module.scss";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={styles.notFoundPage__container_redirect}
    >
      返回前頁
    </button>
  );
}
