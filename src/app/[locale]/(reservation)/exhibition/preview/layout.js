import { Suspense } from "react";
import LoadingScreen from "@/components/reservation/loading-screen";
import PortfolioSearch from "@/components/reservation/portfolio-search";
import styles from "./preview.module.scss";
import {
  _getEntityOverviewList,
  _getMeetingExhibitPassMemberList,
} from "@/actions/_meeting-detail";
export default async function portfolioLayout({ children }) {
  const overviewList = await _getEntityOverviewList();
  const meetingMemberList = await _getMeetingExhibitPassMemberList();

  return (
    <div className={styles.reservationPreview}>
      <div className={styles.reservationPreview__searchOverList}>
        <PortfolioSearch
          overviewList={overviewList}
          meetingMemberList={meetingMemberList}
        />
      </div>

      <div className={styles.reservationPreview__container}>
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      </div>
    </div>

    // <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
  );
}
