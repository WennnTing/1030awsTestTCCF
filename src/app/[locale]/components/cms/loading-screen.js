import styles from "./loading-screen.module.scss";
export default function LoadingScreen() {
  return (
    <div className={styles.cmsLoadingScreen}>
      <div className={styles.cmsLoadingScreen__container}>
        <span></span>
        <div className={styles.cmsLoadingScreen__container_text}>Loading</div>
      </div>
    </div>
  );
}
