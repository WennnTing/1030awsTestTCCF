"use client";
import styles from "./auth-form.module.scss";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

export default function AuthFormSubmit() {
  const { pending } = useFormStatus();
  const t = useTranslations("Login");
  return (
    <button
      className={styles.authForm__container_form__submit}
      disabled={pending}
    >
      {pending ? "loading..." : t("button.login")}
    </button>
  );
}
