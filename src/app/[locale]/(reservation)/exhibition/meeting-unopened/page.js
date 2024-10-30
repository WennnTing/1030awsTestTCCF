import styles from "./meetion-unopend.module.scss";
import { IoCalendarClearOutline } from "react-icons/io5";
import { getTranslations } from "next-intl/server";
import { _getUserProfile } from "@/actions/auth";
import { redirect } from "../../../../../navigation";
export default async function MeetingUnopenedPage() {
  const t = await getTranslations("Reservation");
  const roleData = await _getUserProfile();

  // 是否有票
  // 角色權限

  const allowedRoles = [
    "Market",
    "Pitching",
    "Buyer",
    "Speaker",
    "VIP",
    "Award Sponsor",
    "Professional",
    "Decision Maker",
    "Press",
  ];

  const hasAccess =
    roleData.hasExhibitPass &&
    roleData.roles.some((role) => allowedRoles.includes(role));

  if (hasAccess) {
    return redirect("/exhibition/meeting");
  }

  return (
    <div className={styles.reservationMeetingUnopened}>
      <h2>{t("Appointments.UnopenedPage.title")}</h2>
      <div className={styles.reservationMeetingUnopened__container}>
        <div className={styles.reservationMeetingUnopened__container_icon}>
          <IoCalendarClearOutline />
        </div>
        <h3>{t("Appointments.UnopenedPage.subTitle")}</h3>
        <div className={styles.reservationMeetingUnopened__container_text}>
          {t("Appointments.UnopenedPage.description")}
        </div>
      </div>
    </div>
  );
}
