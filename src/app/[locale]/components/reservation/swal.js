import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "./swal.module.scss";
import moment from "moment";
const MySwal = withReactContent(Swal);

const EventAlert = ({ data, denyButtonText, confirmButtonText, locale }) => {
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
          <h3>{locale === "zh" ? "會議預約" : "Appointment"}</h3>
          <h5>（{data.extendedProps.content.subject}）</h5>
          <div className={styles.reservationSwal__content_item}>
            <div className={styles.reservationSwal__content_item__title}>
              {locale === "zh" ? "時間" : "Time"}
            </div>
            <div className={styles.reservationSwal__content_item__text}>
              {`${data.startStr.split("T")[0]}   ${startTime}-${endTime}`}
            </div>
          </div>
          <div className={styles.reservationSwal__content_item}>
            <div className={styles.reservationSwal__content_item__title}>
              {locale === "zh" ? "人員" : "Participants"}
            </div>
            <div className={styles.reservationSwal__content_item__text}>
              {data.extendedProps.content.participants.map((item) => (
                <span key={item.email}>
                  {item.name} ({item.email})
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
              {data.extendedProps.content.descriprion}
            </div>
          </div>
        </div>

        <div className={styles.reservationSwal__button}>
          {!data.extendedProps.content.deletePermissions && (
            <button
              className={styles.reservationSwal__button_cancel}
              onClick={() => MySwal.clickDeny()}
            >
              {locale === "zh"
                ? denyButtonText
                : data.extendedProps.content.status === "needsAction"
                ? "Decline"
                : "Delete"}
            </button>
          )}

          {data.extendedProps.content.deletePermissions && (
            <button
              className={styles.reservationSwal__button_cancel}
              onClick={() => MySwal.clickConfirm()}
            >
              {locale === "zh" ? confirmButtonText : "Delete"}
            </button>
          )}

          {!data.extendedProps.content.deletePermissions &&
            data.extendedProps.content.status === "needsAction" && (
              <button
                className={styles.reservationSwal__button_confirm}
                onClick={() => MySwal.clickConfirm()}
              >
                {locale === "zh" ? confirmButtonText : "Accept"}
              </button>
            )}
        </div>
      </div>
    ),
  });
};

const ActivityAlert = ({ data, confirmButtonText, locale }) => {
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
          <h3>{locale === "zh" ? "活動預約" : "Activity"}</h3>
          <h5>（{data.title}）</h5>
          <div className={styles.reservationSwal__content_item}>
            <div className={styles.reservationSwal__content_item__title}>
              {locale === "zh" ? "時間" : "Time"}
            </div>
            <div className={styles.reservationSwal__content_item__text}>
              {`${data.startStr.split("T")[0]} ${startTime}`} -
              <br />
              {`${data.endStr.split("T")[0]} ${endTime}`}
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
        </div>

        <div className={styles.reservationSwal__button}>
          <button
            className={styles.reservationSwal__button_cancel}
            onClick={() => MySwal.clickConfirm()}
          >
            {locale === "zh" ? confirmButtonText : "Delete"}
          </button>
        </div>
      </div>
    ),
  });
};

const Alert = ({
  title,
  text,
  icon,
  showCancelButton,
  showConfirmButton = true,
  cancelButtonText,
  confirmButtonText,
  timer,
  props,
}) => {
  return MySwal.fire({
    icon: icon,
    showCloseButton: false,
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
    timer: timer,
    html: (
      <div className={styles.reservationSwal}>
        <div className={styles.reservationSwal__content}>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className={styles.reservationSwal__button}>
          {showCancelButton && (
            <button
              className={styles.reservationSwal__button_cancel}
              onClick={() => MySwal.clickCancel()}
            >
              {cancelButtonText}
            </button>
          )}

          {showConfirmButton && (
            <button
              className={styles.reservationSwal__button_confirm}
              onClick={() => MySwal.clickConfirm()}
            >
              {confirmButtonText}
            </button>
          )}
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

export { EventAlert, Alert, ActivityAlert };
