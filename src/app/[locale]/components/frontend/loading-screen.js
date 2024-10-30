import styles from "./loading-screen.module.scss";

export const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingScreen__container}>
        <div className={styles.loadingScreen__container_text}>Loading</div>
        <div className={styles.loadingScreen__container__dots}>
          <div className={styles.loadingScreen__container_dot}></div>
          <div className={styles.loadingScreen__container_dot}></div>
          <div className={styles.loadingScreen__container_dot}></div>
          <div className={styles.loadingScreen__container_dot}></div>
        </div>
      </div>
    </div>
  );
};
