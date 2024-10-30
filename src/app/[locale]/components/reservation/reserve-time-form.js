import Calendar from "@/components/reservation/calendar";
import { Input } from "@/components/reservation/input";
import TimeSlider from "@/components/reservation/time-slider";
import { TimeRadioBox } from "@/components/reservation/radio-box";
import Textarea from "@/components/reservation/textarea";
import ReserveFormSubmit from "@/components/reservation/reserve-form-submit";
import { useFormState } from "react-dom";
import { reserveMeeting } from "@/actions/reservation";
import GoBackButton from "./go-back-button";
import styles from "../../(reservation)/exhibition/reserve/reserve.module.scss";
import { Fragment, useEffect, useState } from "react";
import { useTransition } from "react";
import { _searchReserveMember } from "@/actions/_meeting-reservation";
import ReserveLocationForm from "./reserve-location-form";
import { useTranslations } from "next-intl";
import moment from "moment";
import { searchMeetingMemberAndLocation } from "@/actions/reservation";
import { reserveMeetingFunction } from "@/actions/reservation";

export default function ReserveTimeForm({
  formAction,
  entityId,
  entiryOverviewType,
  time,
  state,
  setStatus,
}) {
  const t = useTranslations("Reservation");

  const startTime = time?.map((item, index) => {
    return {
      id: index,
      value: item.startDateTime,
    };
  });

  // Array.from({ length: 18 }, (_, index) => {
  //   const hour = 9 + Math.floor(index / 2);
  //   const minute = (index % 2) * 30;
  //   const formattedHour = hour.toString().padStart(2, "0");
  //   const formattedMinute = minute.toString().padStart(2, "0");
  //   return {
  //     id: index + 1,
  //     value: `${formattedHour}:${formattedMinute}`,
  //   };
  // });
  const endTime = time?.map((item, index) => {
    return {
      id: index,
      value: item.endDateTime,
    };
  });

  // Array.from({ length: 18 }, (_, index) => {
  //   const hour = 9 + Math.floor((index + 1) / 2);
  //   const minute = ((index + 1) % 2) * 30;
  //   const formattedHour = hour.toString().padStart(2, "0");
  //   const formattedMinute = minute.toString().padStart(2, "0");
  //   return {
  //     id: index + 1,
  //     value: `${formattedHour}:${formattedMinute}`,
  //   };
  // });

  return (
    <form action={formAction}>
      <div className={styles.reservationReserve__container_reserve__container}>
        <TimeRadioBox
          label={t("Appointments.ReservePage.time.formItem.startTime")}
          name={"startTime"}
          required={true}
          options={startTime}
        />
        <TimeRadioBox
          label={t("Appointments.ReservePage.time.formItem.endTime")}
          name={"endTime"}
          required={true}
          options={endTime}
        />
      </div>

      {state?.errors?.time && (
        <ul className={styles.reservationReserve__container_error}>
          {Object.keys(state.errors).map((key) => (
            <li key={key}>{state.errors[key]}</li>
          ))}
        </ul>
      )}

      {state?.result ? (
        <div className={styles.reservationReserve__singleButton}>
          <ReserveFormSubmit
            text={t("Appointments.ReservePage.button.searchTime")}
            onClickFun={() => setStatus("time")}
          />
        </div>
      ) : (
        <div className={styles.reservationReserve__button}>
          <GoBackButton />
          <ReserveFormSubmit
            text={t("Appointments.ReservePage.button.searchTime")}
            onClickFun={() => setStatus("time")}
          />
        </div>
      )}

      <input
        type="text"
        name="entiryOverviewType"
        defaultValue={entiryOverviewType}
        hidden
      />
      <input type="text" name="entityId" defaultValue={entityId} hidden />
    </form>
  );
}
