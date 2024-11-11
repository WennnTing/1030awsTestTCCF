"use client";
import { useEffect, useState } from "react";
import styles from "../setting/setting.module.scss";
import { BsTrash3 } from "react-icons/bs";
import { RxPlus } from "react-icons/rx";
import { Alert } from "@/components/reservation/swal";
import BusyFormSubmit from "@/components/reservation/busy-form-submit";
import { useFormState } from "react-dom";
import { setBusyDateAndTime } from "@/actions/reservation";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import BusyDateTimeCalendar from "@/components/reservation/busy-date-time-calendar";

const showDeleteErrorAlert = () => {
  Alert({
    icon: "error",
    title: "刪除失敗",
    text: "至少需有一個忙碌時段",
    showCancelButton: false,
    confirmButtonText: btnText("confirm"),
  });
};

const showDeleteConfirmationAlert = (onConfirm) => {
  Alert({
    icon: "warning",
    title: "確定刪除此忙碌時段？",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: btnText("confirm"),
    cancelButtonText: btnText("cancel"),
  }).then((result) => {
    if (result.isConfirmed) onConfirm();
  });
};



export default function SettingPage({ setActive }) {
  const t = useTranslations("Reservation");
  const btnText = useTranslations("Alert.Button");
  const [state, formAction] = useFormState(
    setBusyDateAndTime.bind(null, "busy"),
    {}
  );
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

  // 刪除忙碌時段
  const deleteBusyDate = (id) => {
    setBusyDate((prev) => prev.filter((data) => data.id !== id));
  };

  // 主函數
  const handleDeleteBusyDate = (id) => {
    if (busyDate.length === 1) {
      showDeleteErrorAlert();
    } else {
      showDeleteConfirmationAlert(() => deleteBusyDate(id));
    }
  };

  return (
    <div className={styles.reservationSetting}>
      <h1>{t("Appointments.SettingsPage.title")}</h1>
      <div className={styles.reservationSetting__header}>
        <div className={styles.reservationSetting__header_container}>
          {/* <h2>{t("Appointments.SettingsPage.subTitle")}</h2> */}
          <div>
            {t("Appointments.SettingsPage.description.item_1")}
            <br />
            {t("Appointments.SettingsPage.description.item_2")}
          </div>
        </div>
      </div>
      <div className={styles.reservationSetting__container}>
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
              <BusyDateTimeCalendar data={data} key={data.id} />
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
              <BusyFormSubmit />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
