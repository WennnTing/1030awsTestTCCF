import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "./swal.module.scss";
import Link from "next/link";

const MySwal = withReactContent(Swal);

const Alert = ({
  title,
  text,
  icon,
  showCancelButton,
  cancelButtonText,
  confirmButtonText,
  redirect,
}) => {
  return MySwal.fire({
    icon: icon,
    showCloseButton: false,
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
    html: (
      <div className={styles.swal}>
        <div className={styles.swal__content}>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className={styles.swal__button}>
          {showCancelButton && (
            <button
              className={styles.swal__button_cancel}
              onClick={() => MySwal.clickCancel()}
            >
              {cancelButtonText}
            </button>
          )}

          {redirect ? (
            <Link className={styles.swal__button_confirm} href={redirect}>
              {confirmButtonText}
            </Link>
          ) : (
            <button
              className={styles.swal__button_confirm}
              onClick={() => MySwal.clickConfirm()}
            >
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    ),
  });
};

export { Alert };
