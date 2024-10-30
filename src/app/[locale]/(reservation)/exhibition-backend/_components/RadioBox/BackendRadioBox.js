import { Fragment } from 'react'
import styles from './BackendRadioBox.module.scss';
import moment from 'moment';

const BackendRadioBox = ({ name, required, label, options, onChange }) => {

    if (!options || options.length === 0) {
        return (
            <div> 尚無可預約的人員 </div>
        )
    };

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
                            onChange={() => onChange(data.value)}
                            hidden
                        />

                        <label
                            htmlFor={`${name}_${index}`}
                            className={styles.reservationRadioBox__options_box}
                        >
                            {data?.label}
                        </label>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

const BackendTimeRadioBox = ({ name, required, label, option, onChange }) => {
    return (
        <div className={styles.reservationRadioBox}>
            <label className={styles.reservationRadioBox__label}>
                {label}
                {required && (
                    <span className={styles.reservationRadioBox__required}>&#42;</span>
                )}
            </label>

            <div className={styles.reservationRadioBox__options}>
                {option?.map((data) => (
                    <Fragment key={data.id}>
                        <input
                            type="radio"
                            id={`${name}_${data.value}`}
                            name={name}
                            value={data.value}
                            hidden
                            onChange={() => onChange(data.value)}
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

export { BackendRadioBox, BackendTimeRadioBox };