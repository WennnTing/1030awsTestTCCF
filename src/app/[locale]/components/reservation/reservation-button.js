"use client";
import styles from "./reservation-button.module.scss";
import { TbCalendarPlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
export default function ReservationButton() {
  const router = useRouter();
  const path = usePathname();
  const locale = useLocale();
  const t = useTranslations("Reservation.Portfolios.ProjectPage.button");
  const handleReserve = () => {
    const pathSegments = path.split("/");
    router.push(
      `/${locale}/exhibition/reserve/${pathSegments[pathSegments.length - 2]}/${
        pathSegments[pathSegments.length - 1]
      }`
    );
  };

  return (
    <div className={styles.reservationButton}>
      <button
        type="button"
        className={styles.reservationButton__button}
        onClick={handleReserve}
      >
        <div className={styles.reservationButton__button_icon}>
          <TbCalendarPlus />
        </div>
        <span>{t("invite")}</span>
      </button>
    </div>
  );
}
