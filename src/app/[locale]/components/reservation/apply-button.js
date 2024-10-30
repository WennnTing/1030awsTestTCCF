"use client";
import { TbCalendarStar } from "react-icons/tb";
import styles from "./apply-button.module.scss";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { registerActivity } from "@/actions/activities";
import { useEffect, Fragment, useState } from "react";
import { Alert } from "@/components/reservation/swal";
import LoadingScreen from "./loading-screen";
import { useTranslations } from "next-intl";

export default function ApplyButton({ id }) {
  const t = useTranslations("Reservation.Activity.ActivityPage");

  const AlertText = useTranslations("Activity.Alert");
  const btnText = useTranslations("Alert.Button");

  const [isLoading, setIsLoading] = useState(false);

  const props = {
    id: id,
    type: "exhibition",
  };

  const [state, formAction] = useFormState(
    registerActivity.bind(null, props),
    {}
  );

  useEffect(() => {
    if (state?.msg) {
      setIsLoading(false);
      if (state.msg.message) {
        Alert({
          icon: "warning",
          title: AlertText("errorTitle"),
          text: AlertText(state.msg.message),
          confirmButtonText: btnText("confirm"),
        });
      }
    }
    if (state === "success") {
      Alert({
        icon: "success",
        title: AlertText("successTitle"),
        confirmButtonText: btnText("confirm"),
      });
    }
  }, [state]);

  const handleApply = () => {
    setIsLoading(true);
    formAction();
  };

  return (
    <Fragment>
      {isLoading && <LoadingScreen />}
      <form className={styles.reservationApplyButton}>
        <button
          className={styles.reservationApplyButton__button}
          onClick={handleApply}
          type="button"
        >
          <div className={styles.reservationApplyButton__button_icon}>
            <TbCalendarStar />
          </div>
          <span>{t("button.registration")}</span>
        </button>
      </form>
    </Fragment>
  );
}
