import styles from "../reserve.module.scss";
import ReserveForm from "@/components/reservation/reserve-form";
import { Suspense } from "react";
import LoadingScreen from "@/components/reservation/loading-screen";
import { _searchReserveMember } from "@/actions/_meeting-reservation";
import { _getEntityOverviewDetail } from "@/actions/_meeting-detail";
import { getTranslations } from "next-intl/server";
import GoBackButton from "@/components/reservation/go-back-button";
export default async function ReservePage({ params }) {
  const locale = params.locale === "en" ? "En" : "Zh";
  const type = params.slug[0];
  const id = params.slug[1];

  const t = await getTranslations("Reservation");
  const startTime = Array.from({ length: 18 }, (_, index) => {
    const hour = 9 + Math.floor(index / 2);
    const minute = (index % 2) * 30;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      id: index + 1,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });
  const endTime = Array.from({ length: 18 }, (_, index) => {
    const hour = 9 + Math.floor((index + 1) / 2);
    const minute = ((index + 1) % 2) * 30;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      id: index + 1,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });

  const portfolio = await _getEntityOverviewDetail({
    EntityId: id,
    EntiryOverviewType: type.replace(/^./, type[0].toUpperCase()),
  });

  return (
    <div className={styles.reservationReserve}>
      <h1>{t("Appointments.ReservePage.title")}</h1>

      <div className={styles.reservationReserve__container}>
        <div className={styles.reservationReserve__container_portfolio}>
          <h2 className={styles.reservationReserve__container_portfolio__title}>
            {type === "market"
              ? portfolio?.[`subject${params.locale === "en" ? "En" : ""}`]
              : portfolio?.[`subject${params.locale === "en" ? "En" : ""}`]}
          </h2>
          <div
            className={styles.reservationReserve__container_portfolio__image}
          >
            <img
              src={
                params.slug[0] === "project"
                  ? portfolio?.keyVisual ?? "/images/background.png"
                  : portfolio?.logoUrl ?? "/images/background.png"
              }
              alt={portfolio?.subject}
            />
          </div>
          <div
            className={
              styles.reservationReserve__container_portfolio__description
            }
          >
            {/* <div
              className={
                styles.reservationReserve__container_portfolio__description_title
              }
            >
              項目簡介
            </div> */}
            <div
              className={
                styles.reservationReserve__container_portfolio__description_content
              }
            >
              {type === "market"
                ? portfolio?.[`companyProfile${locale}`]
                : params.locale === "en"
                ? portfolio?.loglineEn
                : portfolio?.logline}
            </div>
          </div>
        </div>
        <div className={styles.reservationReserve__container_reserve}>
          <Suspense fallback={<LoadingScreen />}>
            <ReserveForm
              startTime={startTime}
              endTime={endTime}
              entityId={id}
              entiryOverviewType={type.replace(/^./, type[0].toUpperCase())}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
