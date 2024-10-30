import styles from "./calendar.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useRef, useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
const Calendar = ({ date, setDate, placeholder, elementId }) => {
  const dateInputRef = useRef(null);

  const handleCalendarClose = () => {
    setIsOpen(false);
  };
  const handleCalendarOpen = () => {
    setIsOpen(true);
  };
  const [isOpen, setIsOpen] = useState(false);

  const DateInput = forwardRef(({ value, onClick, isOpen }, ref) => {
    return (
      <button className={styles.cmsCalendar} onClick={onClick} ref={ref}>
        <input
          placeholder={placeholder}
          defaultValue={value}
          name={elementId}
          id={elementId}
          autoComplete="off"
        />
        <div className={styles.cmsCalendar__icon} isonclick={value.toString()}>
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

  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat="yyyy/MM/dd"
      minDate={new Date()}
      onCalendarClose={handleCalendarClose}
      onCalendarOpen={handleCalendarOpen}
      enableTabLoop={false}
      customInput={<DateInput ref={dateInputRef} isOpen={isOpen} />}
    />
  );
};

export { Calendar };
