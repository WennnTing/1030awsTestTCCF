import styles from "./textarea.module.scss";

export default function Textarea({ label, required, placeholder, name }) {
  return (
    <div className={styles.reservationTextarea}>
      <label htmlFor={name}>
        {label}
        {required && (
          <span className={styles.reservationTextarea__required}>&#42;</span>
        )}
      </label>
      <textarea type="text" placeholder={placeholder} name={name} />
    </div>
  );
}
