"use client";
import styles from "./error.module.scss";
import { useRouter } from "../../../../navigation";
export default function Error({ error, reset }) {
  const router = useRouter();

  return (
    <div className={styles.cmsError}>
      <div className={styles.cmsError__container}>
        <h1>Error</h1>
        <h3>System service exception</h3>
        <p>{error.message}</p>
        {/* <p>{error.digest}</p> */}
        <div className={styles.cmsError__container_buttons}>
          <button
            className={styles.cmsError__container_buttons__goBack}
            onClick={() => router.back()}
          >
            返回前頁
          </button>
          <button
            className={styles.cmsError__container_buttons__button}
            onClick={reset}
          >
            重新整理
          </button>
        </div>
      </div>
    </div>
  );
}
