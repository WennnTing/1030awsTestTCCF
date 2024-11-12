"use client";
import styles from "./error.module.scss";
import { Link } from "../../../navigation";
import ImageLoader from "@/components/global/image-loader";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { logoutByAdmin } from "@/actions/login";
import { IoWarning } from "react-icons/io5";

export default function Error({ error, reset }) {
  const t = useTranslations("Error.msg");
  const { pending } = useFormStatus();
  const [, formAction] = useFormState(logoutByAdmin, {});

  return (
    <div className={styles.cmsGlobalError}>
      <div className={styles.cmsGlobalError__header}>
        <Link href="/">
          <ImageLoader
            src={"/images/logo_black.svg"}
            sizes={"100%"}
            style={{ width: "100%", height: "auto" }}
            alt={"logo"}
          />
        </Link>
      </div>
      <div className={styles.cmsGlobalError__container}>
        <div className={styles.cmsGlobalError__container_msg}>
          <div className={styles.cmsGlobalError__container_msg__title}>
            <div className={styles.cmsGlobalError__container_msg__title_icon}>
              <IoWarning />
            </div>
            <h1>Error</h1>
          </div>

          <h3>{t("title")}</h3>
          {error.message.includes("500") || error.message.includes("405") ? (
            <p>{t("description")}</p>
          ) : (
            <p>{t("unauthorized")}</p>
          )}
        </div>
      </div>
      <div className={styles.cmsGlobalError__redirect}>
        <Link className={styles.cmsGlobalError__redirect_goHome} href={"/"}>
          {t("home")}
        </Link>
        <button
          className={styles.cmsGlobalError__redirect_button}
          onClick={
            error.message.includes("500") || error.message.includes("405")
              ? () => formAction()
              : reset
          }
        >
          {pending ? "loading..." : t("relogin")}
        </button>
      </div>
      <div className={styles.cmsGlobalError__footer}>
        <p>
          Copyright © TAICCA (Taiwan Creative Content Agency). All rights
          reserved
        </p>
      </div>
    </div>
  );
}
