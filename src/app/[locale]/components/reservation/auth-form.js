"use client";
import styles from "./auth-form.module.scss";
import { useFormState } from "react-dom";
import { login } from "@/actions/login";
import AuthFormSubmit from "./auth-form-submit";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

export default function AuthForm() {
  const type = "user";
  const [state, formAction] = useFormState(login.bind(null, type), {});
  const t = useTranslations("Login");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.authForm}>
      <div className={styles.authForm__container}>
        <h1 className={styles.authForm__container_title}>{t("title")}</h1>
        <span className={styles.authForm__container_subtitle}>
          {t("siteTitle")}
        </span>
        <form className={styles.authForm__container_form} action={formAction}>
          <div className={styles.authForm__container_form__inputWrapper}>
            <label htmlFor="email"> {t("formItem.email")}</label>
            <input
              placeholder={t("formItem.email")}
              name="email"
              id="email"
              type="text"
            />
          </div>
          <div className={styles.authForm__container_form__inputWrapper}>
            <label htmlFor="password">{t("formItem.password")}</label>
            <div
              className={
                styles.authForm__container_form__inputWrapper_container
              }
            >
              <input
                placeholder={t("formItem.password")}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
              />
              <div
                className={
                  styles.authForm__container_form__inputWrapper_container__icon
                }
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                tabIndex="0"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowPassword(!showPassword);
                  }
                }}
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </div>
            </div>
          </div>
          <span className={styles.authForm__container_form__forgot}>
            <Link href="exhibitionauth/resetpasswordrequest">
              {t("button.forgot")}
            </Link>
          </span>

          <AuthFormSubmit />
          {state.errors && (
            <ul className={styles.authForm__container_form__error}>
              {Object.keys(state.errors).map((key) => (
                <li key={key}>{state.errors[key]}</li>
              ))}
            </ul>
          )}
        </form>
        {/* <div className={styles.authForm__container_thirdParty}>
          <span className={styles.authForm__container_thirdParty__info}>
            Or Log in with
          </span>
          <div className={styles.authForm__container_thirdParty__buttonWrapper}>
            <Link
              href=""
              className={
                styles.authForm__container_thirdParty__buttonWrapper_button
              }
            >
              <div
                className={
                  styles.authForm__container_thirdParty__buttonWrapper_button__icon
                }
              >
                <BsGoogle />
              </div>
              Google
            </Link>
            <Link
              href=""
              className={
                styles.authForm__container_thirdParty__buttonWrapper_button
              }
            >
              <div
                className={
                  styles.authForm__container_thirdParty__buttonWrapper_button__icon
                }
              >
                <BsFacebook />
              </div>
              Facebook
            </Link>
          </div>
        </div>
        <div className={styles.authForm__container_notice}>
          <span>尚未開通TCCF創意內容大會們服務嗎？</span>
          <span>
            請前往
            <Link href="">開通</Link>
          </span>
        </div> */}
      </div>
    </div>
  );
}
