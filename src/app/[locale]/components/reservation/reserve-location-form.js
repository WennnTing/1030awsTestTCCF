"use client";
import styles from "../../(reservation)/exhibition/reserve/reserve.module.scss";
import { useFormState } from "react-dom";
import { reserveMeeting } from "@/actions/reservation";
import { Fragment, useEffect, useState } from "react";
import { LocationRadioBox } from "@/components/reservation/radio-box";
import Textarea from "@/components/reservation/textarea";
import { Input } from "@/components/reservation/input";
import GoBackButton from "./go-back-button";
import ReserveFormSubmit from "./reserve-form-submit";
import { useTranslations } from "next-intl";
import { Alert } from "@/components/reservation/swal";

export default function ReserveLocationForm({
  member,
  location,
  result,
  entityId,
}) {
  const [state, formAction] = useFormState(reserveMeeting, {});

  const t = useTranslations("Reservation");
  const btnText = useTranslations("Alert.Button");

  const [selectMember, setSelectMember] = useState();
  const [subject, setSubject] = useState();

  useEffect(() => {
    if (selectMember) {
      const id = selectMember.split("_")[0];
      setSubject(result.subject.filter((data) => data.memberId == id));
    }
  }, [selectMember]);

  useEffect(() => {
    if (state.message) {
      Alert({
        icon: "warning",
        title: state.message,
        confirmButtonText: btnText("confirm"),
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <h2 className={styles.reservationReserve__container_reserve__title}>
        {t("Appointments.ReservePage.participants.title")}
      </h2>
      <div className={styles.reservationReserve__container_reserve__container}>
        <div className={styles.reservationReserve__container_crew}>
          {member.length > 0 ? (
            member?.map((data, index) => (
              <Fragment key={data.memberId}>
                <input
                  type="radio"
                  name="inteeMember"
                  value={`${data.memberId}_${data.email}`}
                  id={`crew_${data.memberId}`}
                  hidden
                  onChange={(e) => setSelectMember(e.target.value)}
                />

                <label
                  className={styles.reservationReserve__container_crew__box}
                  htmlFor={`crew_${data.memberId}`}
                  aria-label={`Select member ${data.nameEN || data.nameZH}`}
                >

                  <div
                    className={
                      styles.reservationReserve__container_crew__box_item
                    }
                  >
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__title
                      }
                    >
                      {t(
                        "Appointments.ReservePage.participants.formItem.engName"
                      )}
                    </div>
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__text
                      }
                    >
                      {data.nameEN}
                    </div>
                  </div>
                  <div
                    className={
                      styles.reservationReserve__container_crew__box_item
                    }
                  >
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__title
                      }
                    >
                      {t(
                        "Appointments.ReservePage.participants.formItem.zhName"
                      )}
                    </div>
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__text
                      }
                    >
                      {data.nameZH}
                    </div>
                  </div>

                  <div
                    className={
                      styles.reservationReserve__container_crew__box_item
                    }
                  >
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__title
                      }
                    >
                      {t(
                        "Appointments.ReservePage.participants.formItem.position"
                      )}
                    </div>
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__text
                      }
                    >
                      {data.jobTitle}
                    </div>
                  </div>

                  <div
                    className={
                      styles.reservationReserve__container_crew__box_item
                    }
                  >
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__title
                      }
                    >
                      {t(
                        "Appointments.ReservePage.participants.formItem.mobNumber"
                      )}
                    </div>
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__text
                      }
                    >
                      {data.phone}
                    </div>
                  </div>

                  <div
                    className={
                      styles.reservationReserve__container_crew__box_item
                    }
                  >
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__title
                      }
                    >
                      {t(
                        "Appointments.ReservePage.participants.formItem.email"
                      )}
                    </div>
                    <div
                      className={
                        styles.reservationReserve__container_crew__box_item__text
                      }
                    >
                      {data.email}
                    </div>
                  </div>
                </label>
              </Fragment>
            ))
          ) : (
            <div> 尚無可預約的人員 </div>
          )}
        </div>
      </div>

      {member.length > 0 && (
        <Fragment>
          <h2 className={styles.reservationReserve__container_reserve__title}>
            {t("Appointments.ReservePage.location.title")}
          </h2>
          <div
            className={styles.reservationReserve__container_reserve__container}
          >
            <LocationRadioBox
              label={t("Appointments.ReservePage.location.formItem.location")}
              required={true}
              options={location.filter((data) => data)}
              name={"meetingLocation"}
            />
          </div>

          <h2 className={styles.reservationReserve__container_reserve__title}>
            {t("Appointments.ReservePage.details.title")}
          </h2>
          <div
            className={styles.reservationReserve__container_reserve__container}
          >
            <Input
              name={"subject"}
              label={t("Appointments.ReservePage.details.formItem.subject")}
              defaultValue={subject?.[0]?.message.message}
              // value={subject?.[0]?.message.message}
              disabled={true}
            />
            <input
              name="subject"
              value={subject?.[0]?.message.message}
              // disabled={true}
              hidden
            />
            <Textarea
              name={"description"}
              label={t("Appointments.ReservePage.details.formItem.message")}
              placeholder={t("Appointments.ReservePage.placeholder.message")}
            />
          </div>
          {state?.errors && (
            <ul className={styles.reservationReserve__container_error}>
              {Object.keys(state.errors).map((key) => (
                <li key={key}>{state.errors[key]}</li>
              ))}
            </ul>
          )}
        </Fragment>
      )}

      {member.length > 0 ? (
        <div className={styles.reservationReserve__button}>
          <GoBackButton />
          <ReserveFormSubmit />
        </div>
      ) : (
        <div className={styles.reservationReserve__button}>
          <GoBackButton />
        </div>
      )}

      <input
        type="text"
        name="startDateTime"
        defaultValue={result?.startDateTime}
        hidden
      />
      <input
        type="text"
        name="endDateTime"
        defaultValue={result?.endDateTime}
        hidden
      />
      <input type="text" name="entityId" defaultValue={entityId} hidden />
    </form>
  );
}
