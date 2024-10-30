"use client";
import styles from "./permissions.module.scss";
import { IoCalendarClearOutline } from "react-icons/io5";
import { Link } from "../../../../../../navigation";
import Settings from "../@settings/default";
import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
export default function Permissions() {
  const [active, setActive] = useState(false);

  const t = useTranslations("Reservation.Activity.PermissionsPage");

  return (
    <Fragment>
      {active ? (
        <Settings setActive={setActive} />
      ) : (
        <div className={styles.reservationPermissions}>
          <h2>{t("title")}</h2>
          <div className={styles.reservationPermissions__container}>
            <div className={styles.reservationPermissions__container_icon}>
              <IoCalendarClearOutline />
            </div>
            <h3>{t("subTitle")}</h3>
            <div className={styles.reservationPermissions__container_text}>
              {t("description")}
            </div>
            <button
              className={styles.reservationPermissions__container_button}
              onClick={() => setActive(true)}
            >
              {t("button")}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}
