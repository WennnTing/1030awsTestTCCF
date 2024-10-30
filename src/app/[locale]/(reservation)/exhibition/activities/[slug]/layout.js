import { Suspense } from "react";
import LoadingScreen from "@/components/reservation/loading-screen";
import ActivitySearch from "@/components/reservation/activity-search";
import styles from "./activity.module.scss";
import { _getActivities } from "@/actions/_activities";
export default async function ActivityLayout({ children }) {
  const activites = await _getActivities();

  return (
    <div className={styles.reservationActivity}>
      <div className={styles.reservationActivity__searchOverList}>
        <ActivitySearch activites={activites} />
      </div>

      <div className={styles.reservationActivity__activity}>
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      </div>
    </div>
  );
}
