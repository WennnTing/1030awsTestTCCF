"use client";
import FullCalendar from "@fullcalendar/react";
import styles from "./full-calendar.module.scss";
import timeGridPlugin from "@fullcalendar/timegrid";
import { IoNotificationsOffSharp, IoNotifications } from "react-icons/io5";
import { EventAlert, Alert } from "./swal";
import { deleteMeeting, updateMeeting } from "@/actions/reservation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import LoadingScreen from "./loading-screen";
import { useState } from "react";

export function Calendar({ events, timeLimit }) {
  const t = useTranslations("Reservation");
  const btnText = useTranslations("Alert.Button");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  function handleEventClick(clickInfo) {
    if (clickInfo.event.extendedProps.type === "busy") return;

    // 邀請者
    if (clickInfo.event.extendedProps.content.deletePermissions) {
      EventAlert({
        data: clickInfo.event,
        showCancelButton: false,
        confirmButtonText: "刪除會議",
        locale: locale,
      }).then((result) => {
        if (result.isConfirmed) {
          Alert({
            icon: "warning",
            title: "確定刪除此預約？",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: btnText("cancel"),
            confirmButtonText: btnText("confirm"),
            locale: locale,
          }).then(async (result) => {
            if (result.isConfirmed) {
              setIsLoading(true);
              const response = await deleteMeeting(clickInfo.event.id);
              if (response.message !== "success") {
                setIsLoading(false);
                Alert({
                  icon: "error",
                  title: "更新失敗",
                  text: response.message,
                  showCancelButton: false,
                  showConfirmButton: true,
                  confirmButtonText: btnText("confirm"),
                });
              }
              setIsLoading(false);
            }
          });
        }
      });
    } else {
      EventAlert({
        data: clickInfo.event,
        showCancelButton: true,
        confirmButtonText: "接受邀請",
        denyButtonText:
          clickInfo.event.extendedProps.content.status === "needsAction"
            ? "拒絕邀請"
            : "刪除",
        locale: locale,
      }).then((result) => {
        if (result.isConfirmed || result.isDenied) {
          Alert({
            icon: "warning",
            title: `確定${result.isConfirmed ? "接受" : "拒絕"}此邀請？`,
            showCancelButton: true,
            cancelButtonText: btnText("cancel"),
            confirmButtonText: btnText("confirm"),
            locale: locale,
            props: result.isConfirmed ? "accepted" : "declined",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const data = {
                EventId: clickInfo.event.id,
                Status: result.value.props,
              };
              setIsLoading(true);
              const response = await updateMeeting(data);

              if (response.message !== "success") {
                setIsLoading(false);
                Alert({
                  icon: "error",
                  title: "更新失敗",
                  text: response.message,
                  showCancelButton: false,
                  showConfirmButton: true,
                  confirmButtonText: btnText("confirm"),
                });
              }
              setIsLoading(false);
            }
          });
        }
      });
    }
  }

  return (
    <div className={styles.reservationFullCalendar}>
      {isLoading && <LoadingScreen />}

      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          right: "prev,today,next",
          left: "title",
          center: "",
        }}
        events={events
          ?.map((data) => {
            let backgroundColor;
            let borderColor;
            switch (data.status) {
              case "needsAction":
                backgroundColor = "#f7bd56";
                borderColor = "#f7bd56";
                break;
              case "accepted":
                backgroundColor = "#7dcab6";
                borderColor = "#7dcab6";
                break;
              default:
                backgroundColor = "#fff";
                borderColor = '#171717"';
                break;
            }

            return {
              title: `${t(
                "Appointments.AppointmentsPage.event.appointment"
              )}（${data.subject}）`,
              start: data.startDateTime,
              end: data.endDateTime,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              textColor: "#171717",
              id: data.eventId,
              type: "event",
              content: {
                subject: data.subject,
                descriprion: data.description,
                participants: data.participants,
                status: data.status,
                deletePermissions: data.deletePermissions,
                location: data.location,
              },
            };
          })
          .concat(
            timeLimit.map((date) => {
              return {
                title: t("Appointments.AppointmentsPage.event.occupied"),
                start: date.startDateTime,
                end: date.endDateTime,
                backgroundColor: "#F3F4F6FF",
                borderColor: "#F3F4F6FF",
                textColor: "#171717",
                type: "busy",
              };
            })
          )}
        eventContent={renderEventContent}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        dayHeaderFormat={{
          weekday: "short",
          day: "numeric",
        }}
        allDaySlot={false}
        height="70vh"
        eventClick={handleEventClick}
        slotMinTime="08:00:00"
        validRange={{
          start: "2024-11-05",
          end: "2024-11-09",
        }}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div
      className={styles.reservationFullCalendar__event}
      style={{
        cursor:
          eventInfo.event.extendedProps.type === "busy" ? "default" : "pointer",
      }}
    >
      <div className={styles.reservationFullCalendar__event_title}>
        <div className={styles.reservationFullCalendar__event_title__icon}>
          {eventInfo.event.extendedProps.type === "busy" ? (
            <IoNotificationsOffSharp />
          ) : (
            <IoNotifications />
          )}
        </div>
        <div className={styles.reservationFullCalendar__event_title__text}>
          {eventInfo.event.title}
          {/* {eventInfo.event.extendedProps.content.name} */}
        </div>
      </div>
      <div className={styles.reservationFullCalendar__event_time}>
        {eventInfo.timeText}
      </div>
    </div>
  );
}
