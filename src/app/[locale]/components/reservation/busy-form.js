"use client";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { updateBusyDateAndTime } from "@/actions/reservation";
import { useTranslations } from "next-intl";
import styles from "../../(reservation)/exhibition/meeting/setting/setting.module.scss";
import { Alert } from "@/components/reservation/swal";
import Calendar from "./calendar";
import SelectComponent from "./select";
import { BsTrash3 } from "react-icons/bs";
import { RxPlus } from "react-icons/rx";
import GoBackButton from "./go-back-button";
import BusyFormSubmit from "./busy-form-submit";
import { useFormStatus } from "react-dom";
import LoadingScreen from "./loading-screen";
import moment from "moment";
export default function BusyForm({ timeLimit }) {
  const t = useTranslations("Reservation");
  const btnText = useTranslations("Alert.Button");
  const [state, formAction] = useFormState(updateBusyDateAndTime, {});
  const busyDateAndTimeFormStatus = useFormStatus();
  const startTime = Array.from({ length: 18 }, (_, index) => {
    const hour = 9 + Math.floor(index / 2);
    const minute = (index % 2) * 30;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      label: `${formattedHour}:${formattedMinute}`,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });

  const endTime = Array.from({ length: 18 }, (_, index) => {
    const hour = 9 + Math.floor((index + 1) / 2);
    const minute = ((index + 1) % 2) * 30;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      label: `${formattedHour}:${formattedMinute}`,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });
  const [busyDate, setBusyDate] = useState([]);
  useEffect(() => {
    if (timeLimit.length > 0) {
      setBusyDate(
        timeLimit.map((data, index) => {
          return {
            id: index + 1,
            date: data.startDateTime.split("T")[0],
            startTime: {
              label: moment(data.startDateTime, "YYYY-MM-DDTHH:mm:ss").format(
                "HH:mm"
              ),
              value: moment(data.startDateTime, "YYYY-MM-DDTHH:mm:ss").format(
                "HH:mm"
              ),
            },
            endTime: {
              label: moment(data.endDateTime, "YYYY-MM-DDTHH:mm:ss").format(
                "HH:mm"
              ),
              value: moment(data.endDateTime, "YYYY-MM-DDTHH:mm:ss").format(
                "HH:mm"
              ),
            },
          };
        })
      );
    } else {
      setBusyDate([
        {
          id: 1,
        },
      ]);
    }
  }, [timeLimit]);

  const handleIncreaseBusyDate = () => {
    setBusyDate((prev) =>
      prev.concat({
        id: prev[prev.length - 1].id + 1,
      })
    );
  };

  const handleDeleteBusyDate = (id) => {
    if (busyDate.length === 1) {
      Alert({
        icon: "error",
        title: "刪除失敗",
        text: "至少需有一個忙碌時段",
        showCancelButton: false,
        confirmButtonText: btnText("confirm"),
      });
    } else {
      Alert({
        icon: "warning",
        title: "確定刪除此忙碌時段？",
        showCancelButton: true,
        confirmButtonText: btnText("confirm"),
        cancelButtonText: btnText("cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          setBusyDate((prev) => prev.filter((data) => data.id !== id));
        }
      });
    }
  };

  return (
    <div className={styles.reservationSetting__container}>
      {busyDateAndTimeFormStatus.pending && <LoadingScreen />}
      <div className={styles.reservationSetting__container_increase}>
        <h2>{t("Appointments.SettingsPage.subTitle")}</h2>
        <div
          className={styles.reservationSetting__header_icon}
          onClick={handleIncreaseBusyDate}
        >
          <RxPlus />
        </div>
      </div>

      <form action={formAction}>
        {busyDate.map((data) => (
          <div
            className={styles.reservationSetting__container_box}
            key={data.id}
          >
            <Calendar
              label={t("Appointments.SettingsPage.formItem.date")}
              required={true}
              placeholder={t(
                "Appointments.SettingsPage.formItem.datePlaceholder"
              )}
              name={`busy_date_${data.id}`}
              defaultValue={data.date}
            />
            <SelectComponent
              label={t("Appointments.SettingsPage.formItem.startTime")}
              required={true}
              placeholder={t(
                "Appointments.SettingsPage.formItem.startTimePlaceholder"
              )}
              options={startTime}
              name={`busy_startTime_${data.id}`}
              defaultValue={data.startTime}
            />
            <SelectComponent
              label={t("Appointments.SettingsPage.formItem.endTime")}
              required={true}
              placeholder={t(
                "Appointments.SettingsPage.formItem.endTimePlaceholder"
              )}
              options={endTime}
              name={`busy_endTime_${data.id}`}
              defaultValue={data.endTime}
            />
            <div
              className={styles.reservationSetting__container_icon}
              onClick={() => handleDeleteBusyDate(data.id)}
            >
              <BsTrash3 />
            </div>
          </div>
        ))}
        {state?.errors && (
          <ul className={styles.reservationSetting__container_error}>
            {Object.keys(state.errors).map((key) => (
              <li key={key}>{state.errors[key]}</li>
            ))}
          </ul>
        )}
        <div className={styles.reservationSetting__button}>
          <GoBackButton />

          <BusyFormSubmit status={busyDateAndTimeFormStatus} />
        </div>
      </form>
    </div>
  );
}
