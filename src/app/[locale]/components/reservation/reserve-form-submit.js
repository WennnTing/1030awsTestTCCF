"use client";
import styles from "./button.module.scss";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

export default function ReserveFormSubmit({ text, onClickFun }) {
  const { pending } = useFormStatus();
  const t = useTranslations("Reservation");

  return (
    <button
      className={styles.reservationSubmitButton}
      disabled={pending}
      onClick={onClickFun}
    >
      {pending
        ? "loading..."
        : text ?? t("Appointments.ReservePage.button.confirm")}
    </button>
  );
}
