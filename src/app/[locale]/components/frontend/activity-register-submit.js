"use client";
import styles from "./activity-register-form.module.scss";
import { useFormStatus } from "react-dom";

export default function ActivityRegisterSubmit({ text, type }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={styles.activityRegisterForm__cta}
      disabled={pending || type !== "active"}
      style={{
        cursor: type !== "active" ? "not-allowed" : "pointer",
        borderColor: (() => {
          switch (type) {
            case "active":
              return "#51BA97";
            case "full":
              return "#C73E3A";
            case "disabled":
              return "#e8e8e8";
            default:
              return "#171717";
          }
        })(),
        background: (() => {
          switch (type) {
            case "active":
              return "#51BA97";
            case "full":
              return "#C73E3A";
            case "disabled":
              return "#e8e8e8";
            default:
              return "#171717";
          }
        })(),
        color: (() => {
          switch (type) {
            case "active":
            case "full":
              return "#fcfcfc";
            case "disabled":
              return "#6c6c6c";
            default:
              return "#fcfcfc";
          }
        })(),
      }}
    >
      <span className={styles.activityRegisterForm__cta_text}>
        {pending ? "loading..." : text}
      </span>
    </button>
  );
}
