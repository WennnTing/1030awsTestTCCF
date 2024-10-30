"use client";
import { useEffect, useState } from "react";
import styles from "./setting.module.scss";
import Calendar from "@/components/reservation/calendar";
import { BsTrash3 } from "react-icons/bs";
import { RxPlus } from "react-icons/rx";
import SelectComponent from "@/components/reservation/select";
import { Alert } from "@/components/reservation/swal";
import GoBackButton from "@/components/reservation/go-back-button";
import BusyFormSubmit from "@/components/reservation/busy-form-submit";
import { useFormState } from "react-dom";
import { setBusyDateAndTime } from "@/actions/reservation";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import LoadingScreen from "@/components/reservation/loading-screen";

export default function SettingPage({ setActive }) {
  const t = useTranslations("Reservation");
  const btnText = useTranslations("Alert.Button");
  const [state, formAction] = useFormState(
    setBusyDateAndTime.bind(null, "busy"),
    {}
  );
  const busyDateAndTimeFormStatus = useFormStatus();
  const { pending } = useFormStatus();

  const [skipState, skipFormAction] = useFormState(
    setBusyDateAndTime.bind(null, "skip"),
    {}
  );

  useEffect(() => {
    if (state.message) {
      Alert({
        icon: "warning",
        title: state.message,
        confirmButtonText: btnText("confirm"),
      });
    }

    if (skipState.message) {
      Alert({
        icon: "warning",
        title: skipState.message,
        confirmButtonText: btnText("confirm"),
      });
    }
  }, [state, skipState]);

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

  const [busyDate, setBusyDate] = useState([
    {
      id: 1,
    },
  ]);

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
    <div className={styles.reservationSetting}>
      {(pending || busyDateAndTimeFormStatus.pending) && <LoadingScreen />}
      <h1>{t("Appointments.SettingsPage.title")}</h1>
      <div className={styles.reservationSetting__header}>
        <div className={styles.reservationSetting__header_container}>
          <h2>{t("Appointments.SettingsPage.subTitle")}</h2>
          <div>
            {t("Appointments.SettingsPage.description.item_1")}
            <br />
            {t("Appointments.SettingsPage.description.item_2")}
          </div>
        </div>

        <div
          className={styles.reservationSetting__header_icon}
          onClick={handleIncreaseBusyDate}
        >
          <RxPlus />
        </div>
      </div>
      <div className={styles.reservationSetting__container}>
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
              />
              <SelectComponent
                label={t("Appointments.SettingsPage.formItem.startTime")}
                required={true}
                placeholder={t(
                  "Appointments.SettingsPage.formItem.startTimePlaceholder"
                )}
                options={startTime}
                name={`busy_startTime_${data.id}`}
              />
              <SelectComponent
                label={t("Appointments.SettingsPage.formItem.endTime")}
                required={true}
                placeholder={t(
                  "Appointments.SettingsPage.formItem.endTimePlaceholder"
                )}
                options={endTime}
                name={`busy_endTime_${data.id}`}
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
            {/* <GoBackButton /> */}

            <button
              type="button"
              className={styles.reservationSetting__button_back}
              onClick={() => setActive(false)}
            >
              {t("Appointments.SettingsPage.button.back")}
            </button>

            <div className={styles.reservationSetting__button_actionButtons}>
              <button
                type="button"
                disabled={pending}
                className={
                  styles.reservationSetting__button_actionButtons__skip
                }
                onClick={() => skipFormAction()}
              >
                {pending
                  ? "loading..."
                  : t("Appointments.SettingsPage.button.skip")}
              </button>
              <BusyFormSubmit status={busyDateAndTimeFormStatus} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
