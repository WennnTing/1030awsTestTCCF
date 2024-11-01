import Calendar from "@/components/reservation/calendar";
import { Input } from "@/components/reservation/input";
import TimeSlider from "@/components/reservation/time-slider";
import { RadioBox } from "@/components/reservation/radio-box";
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

export default function ReserveDateForm({
  formAction,
  state,
  entityId,
  entiryOverviewType,
  setStatus,
  time,
}) {
  const t = useTranslations("Reservation");
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

  const actionFunction = () => {
    setStatus("date");
    const startTimeRadios = document.getElementsByName("startTime");
    const endTimeRadios = document.getElementsByName("endTime");
    const radios = Array.from(startTimeRadios).concat(
      Array.from(endTimeRadios)
    );
    radios.forEach((radio) => {
      radio.checked = false;
    });
  };

  return (
    <form
      action={formAction}
      style={{
        marginBottom: "20px",
      }}
    >
      <h2 className={styles.reservationReserve__container_reserve__title}>
        {t("Appointments.ReservePage.time.title")}
      </h2>
      <div className={styles.reservationReserve__container_reserve__container}>
        {/* <Calendar
          label={t("Appointments.ReservePage.time.formItem.date")}
          required={true}
          name={"meetingDate"}
          placeholder={t("Appointments.ReservePage.placeholder.date")}
        /> */}
        {/* <RadioBox
          label={t("Appointments.ReservePage.time.formItem.startTime")}
          name={"startTime"}
          required={true}
          options={startTime}
        />
        <RadioBox
          label={t("Appointments.ReservePage.time.formItem.endTime")}
          name={"endTime"}
          required={true}
          options={endTime}
        /> */}
      </div>

      {state?.errors?.date && (
        <ul className={styles.reservationReserve__container_error}>
          {Object.keys(state.errors).map((key) => (
            <li key={key}>{state.errors[key]}</li>
          ))}
        </ul>
      )}

      {/* {time.length > 0 ? (
        <div className={styles.reservationReserve__singleButton}>
          <ReserveFormSubmit
            text={t("Appointments.ReservePage.button.searchDate")}
            onClickFun={actionFunction}
          />
        </div>
      ) : (
        <div className={styles.reservationReserve__button}>
          <GoBackButton />
          <ReserveFormSubmit
            text={t("Appointments.ReservePage.button.searchDate")}
            onClickFun={actionFunction}
          />
        </div>
      )} */}

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
