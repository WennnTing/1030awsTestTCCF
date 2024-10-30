"use client";
import styles from "./activity-register-form.module.scss";
import { registerActivity } from "@/actions/activities";
import { useFormState } from "react-dom";
import ActivityRegisterSubmit from "./activity-register-submit";
import { useEffect } from "react";
import { Alert } from "./swal";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function ActivityRegisterForm({ id, text, type }) {
  const locale = useLocale();
  const t = useTranslations("Activity.Alert");
  const btnText = useTranslations("Alert.Button");
  const props = {
    id: id,
    type: "site",
  };
  const [state, formAction] = useFormState(
    registerActivity.bind(null, props),
    {}
  );

  useEffect(() => {
    if (state?.msg) {
      if (state.msg.message) {
        Alert({
          icon: "warning",
          title: t("errorTitle"),
          text: t(state.msg.message),
          confirmButtonText: btnText("confirm"),
        });
      } else {
        Alert({
          icon: "warning",
          title: "尚未登入",
          text: "請先登入展務系統",
          confirmButtonText: btnText("login"),
          showCancelButton: true,
          cancelButtonText: btnText("cancel"),
          redirect: `/${locale}/exhibition`,
        });
      }
    }

    if (state === "success") {
      Alert({
        icon: "success",
        title: t("successTitle"),
        confirmButtonText: btnText("confirm"),
      });
    }
  }, [state]);

  return (
    <form action={formAction} className={styles.activityRegisterForm}>
      <ActivityRegisterSubmit text={text} type={type} />
    </form>
  );
}
