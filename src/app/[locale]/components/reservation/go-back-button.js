"use client";
import styles from "./button.module.scss";
import { useRouter } from "../../../../navigation";
import { useTranslations } from "next-intl";

export default function GoBackButton() {
  const t = useTranslations("Reservation");
  const router = useRouter();
  const handleRouterBack = () => {
    router.back();
  };
  return (
    <button
      className={styles.reservationGoBackButton}
      onClick={handleRouterBack}
      aria-label={t("Appointments.SettingsPage.button.back")}
      style={{ border: "none" }}
    >
      {t("Appointments.SettingsPage.button.back")}
    </button>
  );
}
