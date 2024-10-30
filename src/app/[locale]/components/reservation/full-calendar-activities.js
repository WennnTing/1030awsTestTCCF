"use client";
import FullCalendar from "@fullcalendar/react";
import styles from "./full-calendar-activites.module.scss";
import timeGridPlugin from "@fullcalendar/timegrid";
import { IoBookmarks, IoStar } from "react-icons/io5";
import { ActivityAlert, Alert } from "./swal";
import { unregisterActivity } from "@/actions/activities";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import LoadingScreen from "./loading-screen";
import { useState } from "react";

export function ActivityCalendar({ events, timeLimit }) {
  const t = useTranslations("Reservation");
  const btnText = useTranslations("Alert.Button");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  function handleEventClick(clickInfo) {
    ActivityAlert({
      data: clickInfo.event,
      showCancelButton: false,
      confirmButtonText: "刪除活動",
      locale: locale,
    }).then((result) => {
      if (result.isConfirmed) {
        Alert({
          icon: "warning",
          title: "確定刪除此活動？",
          showCancelButton: true,
          cancelButtonText: btnText("cancel"),
          confirmButtonText: btnText("confirm"),
        }).then(async (result) => {
          if (result.isConfirmed) {
            setIsLoading(true);
            const response = await unregisterActivity(clickInfo.event.id);
            if (response !== "success") {
              setIsLoading(false);
              Alert({
                icon: "error",
                title: "更新失敗",
                text: response.message,
                cancelButtonText: btnText("cancel"),
                confirmButtonText: btnText("confirm"),
              });
            }
            setIsLoading(false);
          }
        });
      }
    });
  }

  return (
    <div className={styles.reservationActivityFullCalendar}>
      {isLoading && <LoadingScreen />}
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          right: "",
          left: "title",
          center: "",
        }}
        events={events?.map((data) => {
          let backgroundColor;
          let borderColor;
          switch (data.status) {
            case "needsAction":
              backgroundColor = "#7dcab6";
              borderColor = "#7dcab6";
              break;
            case "accepted":
              backgroundColor = "#f7bd56";
              borderColor = "#f7bd56";
              break;
            default:
              backgroundColor = "#fff";
              borderColor = '#171717"';
              break;
          }

          return {
            title: data.activityName,
            start: data.activityStartTime,
            end: data.activityEndTime,
            backgroundColor: "#7dcab6",
            borderColor: "#7dcab6",
            textColor: "#171717",
            id: data.activityId,
            content: {
              location: data.location,
            },
          };
        })}
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
        slotMinTime="09:00:00"
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
      className={styles.reservationActivityFullCalendar__event}
      style={{
        cursor:
          eventInfo.event.extendedProps.type === "busy" ? "default" : "pointer",
      }}
    >
      <div className={styles.reservationActivityFullCalendar__event_title}>
        <div
          className={styles.reservationActivityFullCalendar__event_title__icon}
        >
          <IoStar />
        </div>
        <div
          className={styles.reservationActivityFullCalendar__event_title__text}
        >
          {eventInfo.event.title}
          {/* {eventInfo.event.extendedProps.content.name} */}
        </div>
      </div>
      <div className={styles.reservationActivityFullCalendar__event_time}>
        {eventInfo.timeText}
      </div>
    </div>
  );
}
