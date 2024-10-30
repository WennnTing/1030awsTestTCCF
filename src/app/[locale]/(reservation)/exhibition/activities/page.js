import styles from "./activities.module.scss";
import { HiOutlineInbox } from "react-icons/hi2";
import { getTranslations } from "next-intl/server";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { ActivityCalendar } from "@/components/reservation/full-calendar-activities";
import { Link } from "../../../../../navigation";
import { _getActivityRegistrationList } from "@/actions/_activity-registrations";
import { _getActivities } from "@/actions/_activities";
import ActivitiesExportButton from "../components/ExportCsvButton/activitiesExport";
export default async function ActivitiesPage() {
  const t = await getTranslations("Reservation.Activity.ActivitiesPage");
  const events = await _getActivityRegistrationList();
  const activites = await _getActivities();

  console.log("events", events);

  return (
    <div className={styles.reservationActivities}>
      {/* <TestButton /> */}
      {/* <h2>{t("Appointments.ActivitiesPage.title")}</h2> */}
      <div className={styles.reservationActivities__calendar}>
        <div className={styles.reservationActivities__calendar_header}>
          <h2 className={styles.reservationActivities__calendar_header__title}>
            {t("title")}
          </h2>
          <div
            className={styles.reservationActivities__calendar_header__buttons}
          >
            <ActivitiesExportButton events={events} />
            <div className={styles.reservationActivities__btnContainer}>
              <div className={styles.reservationActivities__btnBlock}>
                <div
                  className={
                    styles.reservationActivities__calendar_header__buttons_button__icon
                  }
                >
                  <IoIosArrowForward />
                </div>
                {t("button.closed")}
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.reservationActivities__container_icon}>
          <HiOutlineInbox />
        </div> */}
        {/* <h3>{t("Appointments.ActivitiesPage.subTitle")}</h3> */}
        {/* <div className={styles.reservationActivities__container_text}>
          {t("Appointments.ActivitiesPage.description")}
        </div> */}
        <ActivityCalendar events={events.data} />
      </div>
    </div>
  );
}
