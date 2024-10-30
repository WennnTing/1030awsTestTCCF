"use client";
import React, { useState } from "react";
import styles from "./LoginDialog.module.scss";
import { useTranslations } from "next-intl";

import { usePathname } from "next/navigation";

export default function LoginDialog({
  onSubmit,
  open,
  passwordData,
  closeDialog,
}) {
  const t = useTranslations("LoginDialog");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    open && (
      <div className={styles.loginDialog}>
        <div className={styles.loginDialog__container}>
          <div className={styles.loginDialog__header}>
            <h3 className={styles.loginDialog__title}>{t("title")}</h3>
          </div>

          <div className={styles.loginDialog__mainContainrer}>
            <div className={styles.loginDialog__remindArea}>
              <span>{t("notice_paragraph_1")}</span>
              <h4>{t("notice_paragraph_2")}</h4>
              <ul>
                <li>{t("notice_list.list_item_1")}</li>
                <li>{t("notice_list.list_item_2")}</li>
                <li>{t("notice_list.list_item_3")}</li>
                <li>{t("notice_list.list_item_4")}</li>
                <li>{t("notice_list.list_item_5")}</li>
              </ul>
              <span>{t("notice_paragraph_3")}</span>
              <span>{t("notice_paragraph_4")}</span>
              <span>{t("notice_paragraph_5")}</span>
            </div>
          </div>

          <div className={styles.loginDialog__btnContainer}>
            <button
              className={styles.loginDialog__btnContainer__save}
              onClick={onSubmit}
            >
              {t("button")}
            </button>

            <button
              className={styles.loginDialog__btnContainer__cancel}
              onClick={closeDialog}
            >
              {t("button_2")}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
