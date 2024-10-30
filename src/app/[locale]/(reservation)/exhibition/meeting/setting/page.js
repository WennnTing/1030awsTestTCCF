import styles from "./setting.module.scss";
import { getTranslations } from "next-intl/server";
import BusyForm from "@/components/reservation/busy-form";
import { _getMeetingTimeLimit } from "@/actions/_meeting-reservation";
import moment from "moment";
import { IoNotificationsOffSharp } from "react-icons/io5";

export default async function SettingPage() {
  const t = await getTranslations("Reservation");
  const meetingTimeLimit = await _getMeetingTimeLimit();

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

        {/* <div
          className={styles.reservationSetting__header_icon}
          onClick={handleIncreaseBusyDate}
        >
          <RxPlus />
        </div> */}
      </div>

      {/* <div className={styles.reservationSetting__timeLimit}>
        {meetingTimeLimit.map((data, index) => (
          <div
            className={styles.reservationSetting__timeLimit_list}
            key={index}
          >
            <div className={styles.reservationSetting__timeLimit_list__icon}>
              <IoNotificationsOffSharp />
            </div>
            <div className={styles.reservationSetting__timeLimit_list__date}>
              {moment(data.startDateTime).format("YYYY-MM-DD")}
            </div>
            <div className={styles.reservationSetting__timeLimit_list__time}>
              {`${moment(data.startDateTime).format("HH:mm")} 
            - 
            ${moment(data.endDateTime).format("HH:mm")}`}
            </div>
          </div>
        ))}
      </div> */}
      {/* <div className={styles.reservationSetting__container}>
        <form action={formAction}>
          {busyDate.map((data) => (
            <div
              className={styles.reservationSetting__container_box}
              key={data.id}
            >
              <Calendar
                label={t("Appointments.SettingsPage.formItem.date")}
                required={true}
                placeholder={"請選擇忙碌日期"}
                name={`busy_date_${data.id}`}
              />
              <SelectComponent
                label={t("Appointments.SettingsPage.formItem.startTime")}
                required={true}
                placeholder={"請選擇開始時間"}
                options={startTime}
                name={`busy_startTime_${data.id}`}
              />
              <SelectComponent
                label={t("Appointments.SettingsPage.formItem.endTime")}
                required={true}
                placeholder={"請選擇結束時間"}
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
            <GoBackButton />

            <BusyFormSubmit />
          </div>
        </form>
     
      </div> */}
      <BusyForm timeLimit={meetingTimeLimit} />
    </div>
  );
}
