import { Fragment } from "react";
import styles from "./radio-box.module.scss";
import moment from "moment";
import { useLocale } from "next-intl";

function RadioBox({ name, required, label, options }) {
  return (
    <div className={styles.reservationRadioBox}>
      <label className={styles.reservationRadioBox__label}>
        {label}
        {required && (
          <span className={styles.reservationRadioBox__required}>&#42;</span>
        )}
      </label>

      <div className={styles.reservationRadioBox__options}>
        {options?.map((data) => (
          <Fragment key={data.id}>
            <input
              type="radio"
              id={`${name}_${data.value}`}
              name={name}
              value={data.value}
              hidden
            />
            <label
              htmlFor={`${name}_${data.value}`}
              className={styles.reservationRadioBox__options_box}
            >
              {data.value}
            </label>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function TimeRadioBox({ name, required, label, options }) {
  return (
    <div className={styles.reservationRadioBox}>
      <label className={styles.reservationRadioBox__label}>
        {label}
        {required && (
          <span className={styles.reservationRadioBox__required}>&#42;</span>
        )}
      </label>

      <div className={styles.reservationRadioBox__options}>
        {options?.map((data) => (
          <Fragment key={data.id}>
            <input
              type="radio"
              id={`${name}_${data.value}`}
              name={name}
              value={data.value}
              hidden
            />
            <label
              htmlFor={`${name}_${data.value}`}
              className={
                data.isLocationCustom
                  ? styles.reservationRadioBox__options_boxSpecial
                  : styles.reservationRadioBox__options_box
              }
            >
              {moment(data.value.split("T")[1], "HH:mm:ss").format("HH:mm")}
            </label>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function LocationRadioBox({ name, required, label, options }) {
  const locale = useLocale();
  return (
    <div className={styles.reservationRadioBox}>
      <label className={styles.reservationRadioBox__label}>
        {label}
        {required && (
          <span className={styles.reservationRadioBox__required}>&#42;</span>
        )}
      </label>

      <div
        className={`${styles.reservationRadioBox__options} ${styles.location}`}
      >
        {options.map((data, index) => (
          <Fragment key={index}>
            <input
              type="radio"
              id={`${name}_${index}`}
              name={name}
              value={`${data?.locationType}#@#${data?.location}#@#${data?.meetingLocationId}`}
              hidden
            />

            <label
              htmlFor={`${name}_${index}`}
              className={styles.reservationRadioBox__options_box}
            >
              {data?.location === "其他"
                ? locale === "zh"
                  ? "其他"
                  : "Other"
                : data?.location}
            </label>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export { RadioBox, LocationRadioBox, TimeRadioBox };
