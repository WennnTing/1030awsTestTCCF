import styles from "./notFound.module.scss";
import GoBackButton from "@/components/frontend/go-back-button";
import MainHeader from "@/components/frontend/main-header";
import MainFooter from "@/components/frontend/main-footer";
export default function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <MainHeader />
      <div className={styles.notFoundPage__container}>
        <div className={styles.notFoundPage__container_errorMessage}>
          <h1>404 - Page not found</h1>
          <p>找不到頁面，請返回前頁</p>
        </div>

        <GoBackButton />
      </div>
      <MainFooter />
    </div>
  );
}
