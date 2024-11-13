import styles from "./switch-button.module.scss";
export default function SwitchButton({ value, name }) {
  return (
    <div className={styles.cmsSwitchButton}>
      <input
        type="checkbox"
        id="switch-button"
        name={name}
        defaultChecked={value}
        hidden="hidden"
      />
      <label htmlFor="switch-button" aria-label="Toggle switch"></label>
    </div>
  );
}
