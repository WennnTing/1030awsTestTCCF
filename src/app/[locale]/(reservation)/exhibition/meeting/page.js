import styles from "./meeting.module.scss";
import { Link } from "../../../../../navigation";
import { Calendar } from "@/components/reservation/full-calendar";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Statistic from "@/components/reservation/statistic";
import { Suspense } from "react";
import LoadingScreen from "@/components/reservation/loading-screen";
import { _getMeetingCalendar } from "@/actions/_meeting-detail";
import { _getMeetingTimeLimit } from "@/actions/_meeting-reservation";
import { getTranslations } from "next-intl/server";
import { _getUserProfile } from "@/actions/auth";

import MeetingExportButton from "../components/ExportCsvButton/meetingExport";

export default async function MeetingPage() {
  const events = await _getMeetingCalendar();
  const roleData = await _getUserProfile();
  const t = await getTranslations("Reservation");
  const meetingTimeLimit = await _getMeetingTimeLimit();

  return (
    <div className={styles.reservationMeeting}>
      <Statistic />
      <div className={styles.reservationMeeting__calendar}>
        <div className={styles.reservationMeeting__calendar_header}>
          <h2 className={styles.reservationMeeting__calendar_header__title}>
            {t("Appointments.AppointmentsPage.title")}
          </h2>

          <div className={styles.reservationMeeting__calendar_header__buttons}>
            <MeetingExportButton events={events} />
            <div
              className={
                styles.reservationMeeting__calendar_header__buttons_button
              }
            >
              <Link href={"/exhibition/meeting/setting"}>
                <div
                  className={
                    styles.reservationMeeting__calendar_header__buttons_button__icon
                  }
                >
                  <IoSettingsOutline />
                </div>
                {t("Appointments.AppointmentsPage.button.setting")}
              </Link>
            </div>
            <div className={styles.reservationMeeting__btnContainer}>
              <div className={styles.reservationMeeting__btnBlock}>
                <div
                  className={
                    styles.reservationMeeting__calendar_header__buttons_button__icon
                  }
                >
                  <IoIosArrowForward />
                </div>
                {t("Appointments.AppointmentsPage.button.closed")}
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingScreen />}>
          <Calendar events={events} timeLimit={meetingTimeLimit} />
        </Suspense>
      </div>
    </div>
  );
}