"use client";
import styles from "./button.module.scss";
import { useTranslations } from "next-intl";

export default function BusyFormSubmit({ status }) {
  const t = useTranslations("Reservation");
  return (
    <button
      className={styles.reservationSubmitButton}
      disabled={status.pending}
    >
      {status.pending
        ? "loading..."
        : t("Appointments.SettingsPage.button.confirm")}
    </button>
  );
}
