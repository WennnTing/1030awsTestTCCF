"use client";
import styles from "./backendCalendar.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarClearOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { forwardRef, useRef, useState, useEffect } from "react";

export default function BackendCalendar({
    name,
    placeholder,
    label,
    required,
    value,
    onChange,
    defaultValue,
}) {
    const [date, setDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleCalendarClose = () => setIsOpen(false);
    const handleCalendarOpen = () => setIsOpen(true);

    const dateInputRef = useRef(null);

    useEffect(() => {
        if (defaultValue) {
            setDate(new Date(defaultValue));
        }
    }, [defaultValue]);

    useEffect(() => {
        setDate(value);
    }, [value]);

    // YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const DateInput = forwardRef(({ value, onClick }, ref) => (
        <button
            className={styles.reservationCalendar__container}
            onClick={onClick}
            ref={ref}
        >
            <input
                name={name}
                placeholder={placeholder}
                value={value || ''}
                autoComplete="off"
                readOnly
            />
            <div className={styles.reservationCalendar__icon}>
                {date === null || !date ? (
                    <IoCalendarClearOutline />
                ) : (
                    <RxCross2
                        onClick={(e) => {
                            e.stopPropagation();
                            setDate(null);
                            onChange(null);
                        }}
                    />
                )}
            </div>
        </button>
    ));
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
                onChange={(selectedDate) => {
                    const formattedDate = formatDate(selectedDate); //YYYY-MM-DD
                    setDate(formattedDate);
                    onChange(formattedDate);
                }}
                dateFormat="yyyy/MM/dd"
                startDate={new Date(2024, 10, 1)}
                includeDates={includeDates}
                onCalendarClose={handleCalendarClose}
                onCalendarOpen={handleCalendarOpen}
                enableTabLoop={false}
                customInput={
                    <DateInput
                        value={date instanceof Date && !isNaN(date) ? formatDate(date) : date || ''}
                        ref={dateInputRef}
                    />
                }
            />
        </div>
    );
}

