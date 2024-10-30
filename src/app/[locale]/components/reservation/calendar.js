"use client";
import styles from "./calendar.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarClearOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { forwardRef, useRef, useState, useEffect } from "react";

export default function Calendar({
  name,
  placeholder,
  label,
  required,
  defaultValue,
}) {
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
    setDate(defaultValue);
  }, [defaultValue]);

  const DateInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <button
        className={styles.reservationCalendar__container}
        onClick={onClick}
        ref={ref}
      >
        <input
          name={name}
          placeholder={placeholder}
          defaultValue={value}
          autoComplete="off"
        />
        <div
          className={styles.reservationCalendar__icon}
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

  return (
    <div className={styles.reservationCalendar}>
      <label htmlFor={name} className={styles.reservationCalendar__label}>
        {label}
        {required && (
          <span className={styles.reservationCalendar__required}>&#42;</span>
        )}
      </label>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy/MM/dd"
        startDate={new Date(2024, 10, 1)} // 從11月開始顯示
        // monthsShown={2}
        includeDates={includeDates}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
        enableTabLoop={false}
        customInput={<DateInput ref={dateInputRef} isOpen={isOpen} />}
      />
    </div>
  );
}
