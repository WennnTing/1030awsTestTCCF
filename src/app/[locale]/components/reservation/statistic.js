import styles from "./statistic.module.scss";
import { TbProgress } from "react-icons/tb";
import { TbChecks } from "react-icons/tb";
import { TbClockExclamation } from "react-icons/tb";
import { _getMemberMeetingStatus } from "@/actions/_meeting-reservation";
import { getTranslations } from "next-intl/server";

export default async function Statistic() {
  const status = await _getMemberMeetingStatus();
  const t = await getTranslations("Reservation");
  return (
    <div className={styles.reservationStatistic}>
      <div className={styles.reservationStatistic__container}>
        <div className={styles.reservationStatistic__container_box}>
          <div className={styles.reservationStatistic__container_box__title}>
            <div
              className={styles.reservationStatistic__container_box__title_icon}
            >
              <TbChecks />
            </div>

            <div
              className={styles.reservationStatistic__container_box__title_text}
            >
              {t("Appointments.AppointmentsPage.statistic.successfully")}
            </div>
          </div>
          <div className={styles.reservationStatistic__container_box__data}>
            {status?.confirmedReservations}
          </div>
          {/* <div
            className={styles.reservationStatistic__container_box__directions}
          >
            預約成功
          </div> */}
        </div>

        <div className={styles.reservationStatistic__container_box}>
          <div className={styles.reservationStatistic__container_box__title}>
            <div
              className={styles.reservationStatistic__container_box__title_icon}
            >
              <TbProgress />
            </div>

            <div
              className={styles.reservationStatistic__container_box__title_text}
            >
              {t("Appointments.AppointmentsPage.statistic.invited")}
            </div>
          </div>
          <div className={styles.reservationStatistic__container_box__data}>
            {status?.pendingSignatures}
          </div>
          {/* <div
            className={styles.reservationStatistic__container_box__directions}
          >
            預約成功
          </div> */}
        </div>

        <div className={styles.reservationStatistic__container_box}>
          <div className={styles.reservationStatistic__container_box__title}>
            <div
              className={styles.reservationStatistic__container_box__title_icon}
            >
              <TbClockExclamation />
            </div>

            <div
              className={styles.reservationStatistic__container_box__title_text}
            >
              {t("Appointments.AppointmentsPage.statistic.replay")}
            </div>
          </div>
          <div className={styles.reservationStatistic__container_box__data}>
            {status?.awaitingResponses}
          </div>
          {/* <div
            className={styles.reservationStatistic__container_box__directions}
          >
            您需要回覆的會議
          </div> */}
        </div>

        <div className={styles.reservationStatistic__container_box}>
          <div className={styles.reservationStatistic__container_box__title}>
            <div
              className={styles.reservationStatistic__container_box__title_icon}
            >
              <TbClockExclamation />
            </div>

            <div
              className={styles.reservationStatistic__container_box__title_text}
            >
              {t("Appointments.AppointmentsPage.statistic.invitee")}
            </div>
          </div>
          <div className={styles.reservationStatistic__container_box__data}>
            {status?.pendingResponses}
          </div>
          {/* <div
            className={styles.reservationStatistic__container_box__directions}
          >
            他人尚未回覆的會議
          </div> */}
        </div>
      </div>
    </div>
  );
}
