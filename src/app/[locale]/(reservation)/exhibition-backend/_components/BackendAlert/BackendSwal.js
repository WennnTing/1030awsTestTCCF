import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "@/components/reservation/swal.module.scss";
import moment from "moment";

const MySwal = withReactContent(Swal);

const BackendEventAlert = ({ data, confirmButtonText, locale }) => {
    const startTime = moment(data.startStr).format("HH:mm");
    const endTime = moment(data.endStr).format("HH:mm");

    return MySwal.fire({
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: true,
        html: (
            <div className={styles.reservationSwal}>
                <div className={styles.reservationSwal__content}>
                    <h3>{locale === "zh" ? "會議管理" : "Manage Meeting"}</h3>
                    <h5>{data.extendedProps.content.subject}</h5>
                    <div className={styles.reservationSwal__content_item}>
                        <div className={styles.reservationSwal__content_item__title}>
                            {locale === "zh" ? "時間" : "Time"}
                        </div>
                        <div className={styles.reservationSwal__content_item__text}>
                            {`${data.startStr.split("T")[0]} ${startTime}-${endTime}`}
                        </div>
                    </div>
                    <div className={styles.reservationSwal__content_item}>
                        <div className={styles.reservationSwal__content_item__title}>
                            {locale === "zh" ? "人員" : "Participants"}
                        </div>
                        <div className={styles.reservationSwal__content_item__text}>
                            {data.extendedProps.content.participants.map((item) => (
                                <span key={item.email}>
                                    {item.name || "The account has not been named yet"} ({item.email})
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.reservationSwal__content_item}>
                        <div className={styles.reservationSwal__content_item__title}>
                            {locale === "zh" ? "地點" : "Location"}
                        </div>
                        <div className={styles.reservationSwal__content_item__text}>
                            {data.extendedProps.content.location}
                        </div>
                    </div>
                    <div className={styles.reservationSwal__content_item}>
                        <div className={styles.reservationSwal__content_item__title}>
                            {locale === "zh" ? "訊息" : "Message"}
                        </div>
                        <div className={styles.reservationSwal__content_item__description}>
                            {data.extendedProps.content.description || "No additional details"}
                        </div>
                    </div>
                </div>

                <div className={styles.reservationSwal__button}>
                    <button
                        className={styles.reservationSwal__button_confirm}
                        onClick={() => MySwal.clickConfirm()}
                    >
                        {locale === "zh" ? confirmButtonText : "Delete"}
                    </button>
                </div>
            </div>
        ),
    });
};

const BackendAlert = ({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonText,
    locale,
    props,
}) => {
    return MySwal.fire({
        icon: icon,
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        html: (
            <div className={styles.reservationSwal}>
                <div className={styles.reservationSwal__content}>
                    <h2>{title}</h2>
                    {text && <p>{text}</p>}
                </div>
                <div className={styles.reservationSwal__button}>
                    <button
                        className={styles.reservationSwal__button_cancel}
                        onClick={() => MySwal.clickCancel()}
                    >
                        {locale === "zh" ? "取消" : "Cancel"}
                    </button>
                    <button
                        className={styles.reservationSwal__button_confirm}
                        onClick={() => MySwal.clickConfirm()}
                    >
                        {locale === "zh" ? confirmButtonText : "Confirm"}
                    </button>
                </div>
            </div>
        ),
        preConfirm: async () => {
            return {
                props: props,
            };
        },
    });
};

export { BackendEventAlert, BackendAlert };
