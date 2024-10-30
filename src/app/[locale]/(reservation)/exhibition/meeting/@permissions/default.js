"use client";
import styles from "./permissions.module.scss";
import { IoCalendarClearOutline } from "react-icons/io5";
import { Link } from "../../../../../../navigation";
import Settings from "../@settings/default";
import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
export default function Permissions() {
  const [active, setActive] = useState(false);

  const t = useTranslations("Reservation");

  return (
    <Fragment>
      {active ? (
        <Settings setActive={setActive} />
      ) : (
        <div className={styles.reservationPermissions}>
          <h2>{t("Appointments.PermissionsPage.title")}</h2>
          <div className={styles.reservationPermissions__container}>
            <div className={styles.reservationPermissions__container_icon}>
              <IoCalendarClearOutline />
            </div>
            <h3>{t("Appointments.PermissionsPage.subTitle")}</h3>
            <div className={styles.reservationPermissions__container_text}>
              {t("Appointments.PermissionsPage.title")}
            </div>
            <button
              className={styles.reservationPermissions__container_button}
              onClick={() => setActive(true)}
            >
              {t("Appointments.PermissionsPage.button")}
            </button>
          </div>
        </div>
      )}
    </Fragment>

    // <div className={styles.reservationPermissions}>
    //   <h2>預約會議</h2>
    //   <div className={styles.reservationPermissions__container}>
    //     <div className={styles.reservationPermissions__container_icon}>
    //       <IoCalendarClearOutline />
    //     </div>
    //     <h3>開始設定</h3>
    //     <div className={styles.reservationPermissions__container_text}>
    //       您可以啟動會議預約功能
    //     </div>
    //     <Button
    //       className={styles.reservationPermissions__container_button}
    //       href={"/reservation/meeting/settings"}
    //     >
    //       啟動
    //     </Button>
    //     <Settings />
    //   </div>
    // </div>
  );
}
