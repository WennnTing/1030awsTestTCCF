"use client";
import styles from "./main-header.module.scss";
import { Link } from "../../../../navigation";
import { useFormState } from "react-dom";
import { logoutByUser } from "@/actions/login";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../../../../navigation";
import { IoLogOutOutline } from "react-icons/io5";
export default function UserActionList({ data, type }) {
  const [state, formAction] = useFormState(logoutByUser, {});
  const [open, setOpen] = useState(false);
  const t = useTranslations("Reservation.Header");
  const router = useRouter();
  const handleRedirect = () => {
    setOpen(false);
    router.push("/exhibition/memberInfo");
  };

  return (
    <div className={styles.reservationMainHeader__function_list__item_user}>

      {type !== "mob" && (
        <button
          className={
            styles.reservationMainHeader__function_list__item_user__icon
          }
          onClick={() => setOpen(!open)}
          aria-label="Toggle user menu"
          style={{ border: "none", fontSize: "1rem" }}
        >
          <span>{data?.email?.charAt(0).toUpperCase()}</span>
        </button>
      )}


      {type !== "mob" && (
        <div
          className={
            styles.reservationMainHeader__function_list__item_user__container
          }
          style={{ gridTemplateRows: open ? "1fr " : "0fr" }}
        >
          <ul
            style={{
              background: open ? "#fcfcfc" : "transparent",
              borderColor: open ? "#e8e8e8" : "transparent",
            }}
          >
            <li onClick={handleRedirect}>{t("memberInfo")}</li>
            <li onClick={() => formAction()}>{t("logout")}</li>
          </ul>
        </div>
      )}

      {type === "mob" && (
        <div
          className={styles.reservationMainHeader__hamLogOut}
          onClick={() => formAction()}
          role="button"
          tabIndex={0}
          aria-label="Log out"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              formAction();
            }
          }}
        >
          <div className={styles.reservationMainHeader__hamLogOut_icon}>
            <IoLogOutOutline />
          </div>
          <div>{t("logout")}</div>
        </div>
      )}

    </div>
  );
}
