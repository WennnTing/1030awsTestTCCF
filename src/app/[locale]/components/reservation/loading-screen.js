import styles from "./loading-screen.module.scss";
export default function LoadingScreen() {
  return (
    <div className={styles.reservationLoadingScreen}>
      <div className={styles.reservationLoadingScreen__container}>
        <span></span>
        <div className={styles.reservationLoadingScreen__container_text}>
          Loading
        </div>
      </div>
    </div>
  );
}
