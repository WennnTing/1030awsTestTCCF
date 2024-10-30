"use client";
import styles from "./error.module.scss";

import { useTranslations } from "next-intl";
import { MdWifiTetheringErrorRounded } from "react-icons/md";
import { logoutByUser } from "@/actions/login";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "../../../../navigation";
export default function Error({ error, reset }) {
  const t = useTranslations("Error.msg");
  const [state, formAction] = useFormState(logoutByUser, {});
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <div className={styles.reservationError}>
      <div className={styles.reservationError__container}>
        <div className={styles.reservationError__container_icon}>
          <MdWifiTetheringErrorRounded />
        </div>
        <div className={styles.reservationError__container_msg}>
          <h1>Error</h1>
          <h3>System service exception</h3>
          <p>{error.message}</p>
        </div>
      </div>

      <div className={styles.reservationError__redirect}>
        <button
          className={styles.reservationError__redirect_goBack}
          onClick={() => router.back()}
          type="button"
        >
          {t("goback")}
        </button>
        <button
          className={styles.reservationError__redirect_button}
          onClick={reset}
        >
          {pending ? "loading..." : t("refresh")}
        </button>
      </div>
    </div>
  );
}
