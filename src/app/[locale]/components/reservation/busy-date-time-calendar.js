"use client";
import styles from "./busy-date-time-calendar.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarClearOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { forwardRef, useRef, useState, useEffect } from "react";
import SelectComponent from "./select";
import { useTranslations } from "next-intl";
import moment from "moment";
export default function BusyDateTimeCalendar({ name, data }) {
  const t = useTranslations("Reservation");
  const btnText = useTranslations("Alert.Button");

  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleCalendarClose = () => {
    setIsOpen(false);
  };
  const handleCalendarOpen = () => {
    setIsOpen(true);
  };
  const dateInputRef = useRef(null);

  useEffect(() => {
    setDate(data.date);
  }, [data.date]);

  const DateInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <button
        className={styles.reservationBusyDateTimeCalendar__container}
        onClick={onClick}
        ref={ref}
      >
        <input
          name={`busy_date_${data.id}`}
          placeholder={t("Appointments.SettingsPage.formItem.datePlaceholder")}
          defaultValue={value}
          autoComplete="off"
        />
        <div
          className={styles.reservationBusyDateTimeCalendar__icon}
          isonclick={value.toString()}
        >
          {date === null || !date ? (
            <IoCalendarClearOutline />
          ) : (
            <RxCross2 onClick={() => setDate(null)} />
          )}
        </div>
      </button>
    );
  });
  DateInput.displayName = "DateInput";

  const includeDates = [
    new Date(2024, 10, 5), // 11/5
    new Date(2024, 10, 6), // 11/6
    new Date(2024, 10, 7), // 11/7
    new Date(2024, 10, 8), // 11/8
  ];

  const startTime = Array.from({ length: 13 }, (_, index) => {
    const hour = 10 + Math.floor(index / 2);
    const minute = (index % 2) * 30;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      label: `${formattedHour}:${formattedMinute}`,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });

  const endTime = Array.from({ length: 13 }, (_, index) => {
    const hour = 10 + Math.floor((index + 1) / 2);
    const minute = ((index + 1) % 2) * 30;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      label: `${formattedHour}:${formattedMinute}`,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });

  const particularStartTime = Array.from({ length: 9 }, (_, index) => {
    const hour = 10 + Math.floor(index / 2);
    const minute = (index % 2) * 30;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      label: `${formattedHour}:${formattedMinute}`,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });

  const particularEndTime = Array.from({ length: 9 }, (_, index) => {
    const hour = 10 + Math.floor((index + 1) / 2);
    const minute = ((index + 1) % 2) * 30;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      label: `${formattedHour}:${formattedMinute}`,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });

  return (
    <div className={styles.reservationBusyDateTimeCalendar}>
      <div className={styles.reservationBusyDateTimeCalendar__calendar}>
        <label
          htmlFor={`busy_date_${data.id}`}
          className={styles.reservationBusyDateTimeCalendar__label}
        >
          {t("Appointments.SettingsPage.formItem.date")}
          <span className={styles.reservationBusyDateTimeCalendar__required}>
            &#42;
          </span>
        </label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy/MM/dd"
          startDate={new Date(2024, 10, 1)} // 從11月開始顯示
          includeDates={includeDates}
          onCalendarClose={handleCalendarClose}
          onCalendarOpen={handleCalendarOpen}
          enableTabLoop={false}
          customInput={<DateInput ref={dateInputRef} isOpen={isOpen} />}
        />
      </div>
      <SelectComponent
        label={t("Appointments.SettingsPage.formItem.startTime")}
        required={true}
        placeholder={t(
          "Appointments.SettingsPage.formItem.startTimePlaceholder"
        )}
        options={
          moment(date).format("YYYY/MM/DD") === "2024/11/08"
            ? particularStartTime
            : startTime
        }
        name={`busy_startTime_${data.id}`}
        defaultValue={data.startTime}
      />
      <SelectComponent
        label={t("Appointments.SettingsPage.formItem.endTime")}
        required={true}
        placeholder={t("Appointments.SettingsPage.formItem.endTimePlaceholder")}
        options={
          moment(date).format("YYYY/MM/DD") === "2024/11/08"
            ? particularEndTime
            : endTime
        }
        name={`busy_endTime_${data.id}`}
        defaultValue={data.endTime}
      />
    </div>
  );
}
