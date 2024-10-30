import styles from "./textarea.module.scss";

export default function Textarea({
  label,
  required,
  elementId,
  state,
  onChangeFun,
  id,
  placeholder,
}) {
  return (
    <div className={styles.cmsTextarea}>
      <label htmlFor={elementId}>
        {label}
        {required && (
          <span className={styles.cmsTextarea__required}>&#42;</span>
        )}
      </label>
      <textarea
        type="text"
        name={elementId}
        id={elementId}
        value={state}
        onChange={
          onChangeFun ? (e) => onChangeFun(id, elementId, e.target.value) : null
        }
        placeholder={placeholder}
      />
    </div>
  );
}
