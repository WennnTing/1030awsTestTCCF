"use client";
import styles from "./error.module.scss";

import { useTranslations } from "next-intl";
import { MdWifiTetheringErrorRounded } from "react-icons/md";
import { logoutByUser } from "@/actions/login";
import { useFormState, useFormStatus } from "react-dom";
import { Link } from "../../../navigation";
import ImageLoader from "@/components/global/image-loader";
export default function Error({ error, reset }) {
  const t = useTranslations("Error.msg");
  const [state, formAction] = useFormState(logoutByUser, {});
  const { pending } = useFormStatus();

  return (
    <div className={styles.reservationGlobalError}>
      <div className={styles.reservationGlobalError__header}>
        <Link href="/">
          <ImageLoader
            src={"/images/logo_black.svg"}
            sizes={"100%"}
            style={{ width: "100%", height: "auto" }}
            alt={"logo"}
          />
        </Link>
      </div>
      <div className={styles.reservationGlobalError__container}>
        <div className={styles.reservationGlobalError__container_icon}>
          <MdWifiTetheringErrorRounded />
        </div>
        <div className={styles.reservationGlobalError__container_msg}>
          <h1>Error</h1>
          <h3>{t("title")}</h3>
          {error.message.includes("500") || error.message.includes("405") ? (
            <p>{t("description")}</p>
          ) : (
            <p>{t("unauthorized")}</p>
          )}
        </div>
      </div>

      <div className={styles.reservationGlobalError__redirect}>
        <Link
          className={styles.reservationGlobalError__redirect_goHome}
          href={"/"}
        >
          {t("home")}
        </Link>
        <button
          className={styles.reservationGlobalError__redirect_button}
          onClick={
            error.message.includes("500") || error.message.includes("405")
              ? () => formAction()
              : reset
          }
        >
          {pending ? "loading..." : t("relogin")}
        </button>
      </div>
      <div className={styles.reservationGlobalError__footer}>
        <p>
          Copyright © TAICCA (Taiwan Creative Content Agency). All rights
          reserved
        </p>
      </div>
    </div>
  );
}
