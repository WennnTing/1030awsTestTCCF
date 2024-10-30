"use client";
import FullCalendar from "@fullcalendar/react";
import styles from "./Backend-full-calendar.module.scss";
import timeGridPlugin from "@fullcalendar/timegrid";
import { IoNotificationsOffSharp, IoNotifications } from "react-icons/io5";
import { BackendEventAlert, BackendAlert } from "@/(reservation)/exhibition-backend/_components/BackendAlert/BackendSwal";
import { deleteMeeting } from "@/actions/reservation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useState } from "react";
import LoadingScreen from "@/components/reservation/loading-screen";

export function BackendFullCalendar({ events, timeLimit, onMeetingDeleted }) {
    const t = useTranslations("Reservation");
    const btnText = useTranslations("Alert.Button");
    const locale = useLocale();
    const [isLoading, setIsLoading] = useState(false);

    function handleEventClick(clickInfo) {
        if (clickInfo.event.extendedProps.type === "busy") return;

        BackendEventAlert({
            data: clickInfo.event,
            showCancelButton: false,
            confirmButtonText: "刪除會議",
            locale: locale,
        }).then((result) => {
            if (result.isConfirmed) {
                BackendAlert({
                    icon: "warning",
                    title: "確定刪除此預約？",
                    showCancelButton: true,
                    showConfirmButton: true,
                    cancelButtonText: "取消",
                    confirmButtonText: "確認",
                    locale: locale,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        setIsLoading(true);
                        const response = await deleteMeeting(clickInfo.event.id);
                        if (response.message === "success") {
                            onMeetingDeleted();
                            setIsLoading(false);
                        } else {
                            BackendAlert({
                                icon: "error",
                                title: "刪除失敗",
                                text: response.message,
                                showCancelButton: false,
                                showConfirmButton: true,
                                confirmButtonText: "確認",
                            });
                            setIsLoading(false);
                        }
                    }
                });
            }
        });
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
                                borderColor = '#171717';
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
                                description: data.description,
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
                </div>
            </div>
            <div className={styles.reservationFullCalendar__event_time}>
                {eventInfo.timeText}
            </div>
        </div>
    );
}
