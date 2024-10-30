"use client";
import Calendar from "@/components/reservation/calendar";
import { Input } from "@/components/reservation/input";
import TimeSlider from "@/components/reservation/time-slider";
import RadioBox from "@/components/reservation/radio-box";
import Textarea from "@/components/reservation/textarea";
import ReserveFormSubmit from "@/components/reservation/reserve-form-submit";
import { useFormState } from "react-dom";
import { reserveMeeting } from "@/actions/reservation";
import GoBackButton from "./go-back-button";
import styles from "../../(reservation)/exhibition/reserve/reserve.module.scss";
import { Fragment, useEffect, useState } from "react";
import {
  searchMeetingMemberAndLocation,
  searchMemberAvailableTime,
  reserveMeetingFunction,
} from "@/actions/reservation";
import ReserveLocationForm from "./reserve-location-form";
import ReserveDateForm from "./reserve-date-form";
import ReserveTimeForm from "./reserve-time-form";
import { Alert } from "@/components/reservation/swal";
import { useTranslations } from "next-intl";

export default function ReserveForm({ entityId, entiryOverviewType }) {
  const btnText = useTranslations("Alert.Button");
  const [status, setStatus] = useState();
  const [state, formAction] = useFormState(
    reserveMeetingFunction.bind(null, status),
    {}
  );
  const [time, setTime] = useState([]);

  const locationData = (data) => {
    return []
      .concat(data.inviteeLocation)
      .concat(data.inviterLocation)
      .concat(data.vipRooms)
      .concat(data.otherLocation);
  };

  useEffect(() => {
    if (state.errorMsg) {
      Alert({
        icon: "warning",
        title: state.errorMsg.message,
        text: "請重新選擇預約時間",
        confirmButtonText: btnText("confirm"),
      });
    }

    if (state.errors?.date) {
      setStatus("date");
    }

    if (state.errors?.time) {
      setStatus("time");
    }

    if (state.timeResult) {
      setTime(state.timeResult);
    }
    if (state.status) {
      setStatus(state.status);
    }
  }, [state]);

  return (
    <Fragment>
      <ReserveDateForm
        formAction={formAction}
        state={state}
        entityId={entityId}
        entiryOverviewType={entiryOverviewType}
        setStatus={setStatus}
        time={time}
      />
      {time.length > 0 && (
        <ReserveTimeForm
          time={time}
          entityId={entityId}
          entiryOverviewType={entiryOverviewType}
          formAction={formAction}
          state={state}
          setStatus={setStatus}
        />
      )}

      {state?.result && (
        <ReserveLocationForm
          result={state}
          member={state?.result.availableReserveMemberDetails}
          location={locationData(state?.result)}
          entityId={entityId}
        />
      )}

      {/* {state?.result && (
        <Fragment>
          <h2 className={styles.reservationReserve__container_reserve__title}>
            預約人員
          </h2>
          <div
            className={styles.reservationReserve__container_reserve__container}
          >
            <div className={styles.reservationReserve__container_crew}>
              {state?.result?.availableReserveMemberDetails.map(
                (data, index) => (
                  <Fragment key={data.index}>
                    <input
                      type="checkbox"
                      name="crew"
                      value={data.index}
                      id={`crew_${data.index}`}
                      hidden
                    />
                    <label
                      className={styles.reservationReserve__container_crew__box}
                      htmlFor={`crew_${data.index}`}
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
                          聯絡窗口姓名
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
                          聯絡窗口職稱
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
                          聯絡窗口電話
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
                          聯絡窗口Email
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
                )
              )}
            </div>
          </div>

          <h2 className={styles.reservationReserve__container_reserve__title}>
            預約地點
          </h2>
          <div
            className={styles.reservationReserve__container_reserve__container}
          >
            <RadioBox
              label={"會議地點"}
              required={true}
              options={location}
              name={"meetingLocation"}
            />
          </div>

          <h2 className={styles.reservationReserve__container_reserve__title}>
            預約內容
          </h2>
          <div
            className={styles.reservationReserve__container_reserve__container}
          >
            <Input
              name={"meetingTitle"}
              label={"會議標題"}
              defaultValue={"台灣特有種會議"}
              disabled={true}
            />
            <Textarea
              name={"meetingContent"}
              label={"預約留言"}
              placeholder={"請輸入留言內容"}
            />
          </div>
        </Fragment>
      )} */}
    </Fragment>
  );
}
