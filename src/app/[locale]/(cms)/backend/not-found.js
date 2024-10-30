import styles from "./not-found.module.scss";

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundPage__container}>
        <div className={styles.notFoundPage__container_errorMessage}>
          <h1>404 - Page Not Found</h1>
          <p>找不到頁面</p>
        </div>

        {/* <button
          onClick={() => router.back()}
          className={styles.notFoundPage__container_redirect}
        >
          返回前頁
        </button> */}
      </div>
    </div>
  );
}
