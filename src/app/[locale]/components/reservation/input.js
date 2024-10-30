import styles from "./input.module.scss";

const Input = ({
  label,
  required,
  placeholder,
  name,
  disabled,
  defaultValue,
}) => {
  return (
    <div className={styles.reservationInput}>
      <label htmlFor={name}>
        {label}
        {required && (
          <span className={styles.reservationInput__required}>&#42;</span>
        )}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export { Input };
