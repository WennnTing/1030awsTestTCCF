import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "./swal.module.scss";

const MySwal = withReactContent(Swal);

const Alert = ({
  title,
  text,
  icon,
  showCancelButton,
  cancelButtonText,
  confirmButtonText,
}) => {
  return MySwal.fire({
    icon: icon,
    showCloseButton: false,
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
    html: (
      <div className={styles.cmsSwal}>
        <div className={styles.cmsSwal__content}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className={styles.cmsSwal__button}>
          {showCancelButton && (
            <button
              className={styles.cmsSwal__button_cancel}
              onClick={() => MySwal.clickCancel()}
            >
              {cancelButtonText}
            </button>
          )}

          <button
            className={styles.cmsSwal__button_confirm}
            onClick={() => MySwal.clickConfirm()}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    ),
  });
};

export { Alert };
