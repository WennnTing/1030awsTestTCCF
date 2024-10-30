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
    <div className={styles.reservationGoBackButton} onClick={handleRouterBack}>
      {t("Appointments.SettingsPage.button.back")}
    </div>
  );
}
