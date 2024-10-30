import styles from "./event-type-template.module.scss";
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoTodayOutline } from "react-icons/io5";
import parse from "html-react-parser";
import EventMember from "./event-member";
import SlideShow from "./slide-show";
import Link from "next/link";
import { PiPaperclipLight } from "react-icons/pi";
import { _getActivitiesByPageUuId } from "@/actions/_activities";
import ActivityRegisterForm from "./activity-register-form";
import moment from "moment-timezone";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export default async function EventTypeTemplate({ contentData, locale }) {
  const data = contentData;
  const activityInfo = await _getActivitiesByPageUuId(data[0]?.pageUuId);
  const memberData = data
    ?.filter((item) => item.elementId.includes("member_"))
    ?.reduce((acc, item) => {
      const match = item.elementId.match(/^[^_]*_[^_]*_(.*)$/);

      if (match) {
        const key = match[1];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
      }
      return acc;
    }, {});

  const memberDataArray = Object.values(memberData || {});
  const slideData = data?.filter((item) => item.elementId.includes("slide_"));

  // const serverTimeResponse = await fetch(
  //   `${headers().get("x-full-url")}/${locale}/api/server`
  // );
  // const serverTime = await serverTimeResponse.json();

  const ActivityTimeCheck = () => {
    const serverTimeMoment = moment(
      moment().tz("Asia/Taipei").format("YYYY-MM-DD")
    );

    const startDateMoment = moment(activityInfo?.data?.registrationStartDate);
    const endDateMoment = moment(activityInfo?.data?.registrationEndDate);
    const isBeforeStart = serverTimeMoment.isBefore(startDateMoment);
    const isAfterEnd = serverTimeMoment.isAfter(endDateMoment);
    const isBetween = serverTimeMoment.isBetween(
      startDateMoment,
      endDateMoment,
      "day",
      "[]"
    );

    const status = {
      isBeforeStart,
      isAfterEnd,
      isBetween,
    };

    return Object.keys(status).filter((key) => status[key]);
  };

  const t = await getTranslations("Activity");

  return (
    <div className={styles.eventTypeTemplate}>
      <h1 className={styles.eventTypeTemplate__introductionWrapper_info__title}>
        {
          data?.filter((item) => item.elementId === "title")?.[0]?.[
            `fieldText${locale}`
          ]
        }
      </h1>
      <div className={styles.eventTypeTemplate__introductionWrapper}>
        <div className={styles.eventTypeTemplate__introductionWrapper_kv}>
          <img
            src={data?.filter((item) => item.elementId === "kv")?.[0]?.imageUrl}
          />
        </div>
        <div className={styles.eventTypeTemplate__introductionWrapper_info}>
          {/* <h1
            className={
              styles.eventTypeTemplate__introductionWrapper_info__title
            }
          >
            {
              data?.filter((item) => item.elementId === "title")?.[0]?.[
                `fieldText${locale}`
              ]
            }
          </h1> */}

          <div className={styles.eventTypeTemplate__introductionWrapper_kvRwd}>
            <img
              src={
                data?.filter((item) => item.elementId === "kv")?.[0]?.imageUrl
              }
            />
          </div>

          {data?.filter((item) => item.elementId === "locationInfo")?.[0]
            ?.fieldValue === "true" && (
            <div
              className={
                styles.eventTypeTemplate__introductionWrapper_info__location
              }
            >
              <div
                className={
                  styles.eventTypeTemplate__introductionWrapper_info__location_icon
                }
              >
                <IoLocationOutline />
              </div>
              <div
                className={
                  styles.eventTypeTemplate__introductionWrapper_info__location_label
                }
              >
                {t("Info.location")}
              </div>
              <div
                className={
                  styles.eventTypeTemplate__introductionWrapper_info__location_text
                }
              >
                {
                  data?.filter((item) => item.elementId === "location")?.[0]?.[
                    `fieldText${locale}`
                  ]
                }
              </div>
            </div>
          )}

          <div
            className={styles.eventTypeTemplate__introductionWrapper_info__time}
          >
            <div
              className={
                styles.eventTypeTemplate__introductionWrapper_info__time_icon
              }
            >
              <IoTodayOutline />
            </div>

            <div
              className={
                styles.eventTypeTemplate__introductionWrapper_info__time_label
              }
            >
              {t("Info.eventTime")}
            </div>
            <div
              className={
                styles.eventTypeTemplate__introductionWrapper_info__time_wrapper
              }
            >
              <div
                className={
                  styles.eventTypeTemplate__introductionWrapper_info__time_wrapper__text
                }
              >
                <span>
                  {
                    data?.filter(
                      (item) => item.elementId === "activityStartDate"
                    )?.[0]?.["fieldValue"]
                  }{" "}
                  {
                    data?.filter(
                      (item) => item.elementId === "activityStartTime"
                    )?.[0]?.["fieldValue"]
                  }{" "}
                  -
                </span>{" "}
                <span>
                  {
                    data?.filter(
                      (item) => item.elementId === "activityEndDate"
                    )?.[0]?.["fieldValue"]
                  }{" "}
                  {
                    data?.filter(
                      (item) => item.elementId === "activityEndTime"
                    )?.[0]?.["fieldValue"]
                  }
                </span>
              </div>
            </div>
          </div>

          <div
            className={styles.eventTypeTemplate__introductionWrapper_info__time}
          >
            <div
              className={
                styles.eventTypeTemplate__introductionWrapper_info__time_icon
              }
            >
              <IoCalendarClearOutline />
            </div>

            <div
              className={
                styles.eventTypeTemplate__introductionWrapper_info__time_label
              }
            >
              {t("Info.registrationPeriod")}
            </div>
            <div
              className={
                styles.eventTypeTemplate__introductionWrapper_info__time_wrapper
              }
            >
              <div
                className={
                  styles.eventTypeTemplate__introductionWrapper_info__time_text
                }
              >
                {
                  data?.filter(
                    (item) => item.elementId === "registrationStartDate"
                  )?.[0]?.["fieldValue"]
                }{" "}
                -{" "}
                {
                  data?.filter(
                    (item) => item.elementId === "registrationEndDate"
                  )?.[0]?.["fieldValue"]
                }
              </div>
            </div>
          </div>

          <div
            className={
              styles.eventTypeTemplate__introductionWrapper_info__summary
            }
          >
            {data?.filter((item) => item.elementId === "summary")?.[0]?.[
              `fieldText${locale}`
            ].length > 100
              ? `${data
                  ?.filter((item) => item.elementId === "summary")?.[0]
                  ?.[`fieldText${locale}`].substring(0, 100)}...`
              : data?.filter((item) => item.elementId === "summary")?.[0]?.[
                  `fieldText${locale}`
                ]}
          </div>
          {/* <a
            className={
              styles.eventTypeTemplate__introductionWrapper_info__ctaButton
            }
          >
            <div
              className={
                styles.eventTypeTemplate__introductionWrapper_info__ctaButton_text
              }
            >
              {data?.filter((item) => item.elementId === "eventType")?.[0]?.[
                `fieldText${locale}`
              ] === "apply"
                ? "報名入場"
                : "自由入場"}
            </div>
          </a> */}
          {data.find((item) => item.elementId === "eventType").fieldValue ===
          "apply" ? (
            <ActivityRegisterForm
              id={activityInfo?.data?.activityId}
              type={(() => {
                switch (ActivityTimeCheck()?.[0]) {
                  case "isBeforeStart":
                  case "isAfterEnd":
                    return "disabled";
                  case "isBetween":
                    if (
                      activityInfo?.data?.currentParticipants >=
                      activityInfo?.data?.maxParticipants
                    ) {
                      return "full";
                    }
                    return "active";
                }
              })()}
              text={
                (() => {
                  switch (ActivityTimeCheck()?.[0]) {
                    case "isBeforeStart":
                      return t("Status.upcoming");
                    case "isAfterEnd":
                      return t("Status.closed");
                    case "isBetween":
                      if (
                        activityInfo?.data?.currentParticipants >=
                        activityInfo?.data?.maxParticipants
                      ) {
                        return t("Status.full");
                      }
                      return t("Status.reserve");
                  }
                })() // data?.filter((item) => item.elementId === "eventType")?.[0]?.[
                //   `fieldText${locale}`
                // ] === "apply"
                //   ? "報名入場"
                //   : "憑展證入場"
              }
            />
          ) : (
            <div className={styles.eventTypeTemplate__eventType}>
              {t("EventType.badge")}
            </div>
          )}

          {/* <div
            className={
              styles.eventTypeTemplate__introductionWrapper_info__quota
            }
          >
            <span>
              {t("Info.remainingSpots")}{" "}
              {Number(activityInfo?.data?.maxParticipants) -
                Number(activityInfo?.data?.currentParticipants)}{" "}
              /
            </span>{" "}
            <span>
              {t("Info.totalSpots")} {activityInfo?.data?.maxParticipants}
            </span>
          </div> */}
        </div>
      </div>
      <div className={styles.eventTypeTemplate__conetntWrapper}>
        {parse(
          data?.filter((item) => item.elementId === "content")?.[0]?.[
            `fieldText${locale}`
          ] ?? ""
        )}
        {data?.filter((item) => item.elementId === "file")?.[0]?.[
          "fieldValue"
        ] && (
          <div className={styles.eventTypeTemplate__conetntWrapper_file}>
            <Link
              href={
                data?.filter((item) => item.elementId === "file")?.[0]?.[
                  "fieldValue"
                ]
              }
              target="_blank"
            >
              <div
                className={styles.eventTypeTemplate__conetntWrapper_file__icon}
              >
                <PiPaperclipLight />
              </div>
              參展說明文件
            </Link>
          </div>
        )}
      </div>

      {slideData.length > 0 && (
        <div className={styles.eventTypeTemplate__slideShowWrapper}>
          <SlideShow data={slideData} />
        </div>
      )}
      {memberDataArray.length > 0 && (
        <div className={styles.eventTypeTemplate__memberWrapper}>
          <h2 className={styles.eventTypeTemplate__memberWrapper_title}>
            {t("Info.team")}
          </h2>
          <div className={styles.eventTypeTemplate__memberWrapper_container}>
            {memberDataArray.map((data, index) => (
              <EventMember
                data={data}
                locale={locale}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* <div className={styles.eventTypeTemplate__locationWrapper}>
        <h2 className={styles.eventTypeTemplate__locationWrapper_title}>
          空間介紹
        </h2>
        <div className={styles.eventTypeTemplate__locationWrapper_location}>
          <span>地點</span>
          <div
            className={styles.eventTypeTemplate__locationWrapper_location__icon}
          >
            <IoLocationOutline />
          </div>
          <div
            className={styles.eventTypeTemplate__locationWrapper_location__text}
          >
            {
              data?.filter((item) => item.elementId === "location")?.[0]?.[
                `fieldText${locale}`
              ]
            }
          </div>
        </div>

        <div className={styles.eventTypeTemplate__locationWrapper_map}>
          {data?.filter((item) => item.elementId === "locationDisplayType")?.[0]
            ?.fieldValue === "googlemap" ? (
            <iframe
              src={
                data
                  ?.filter((item) => item.elementId === "location")[0]
                  ["fieldValue"].match(/src="([^"]+)"/)[1]
              }
              height="450"
              width="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div
              className={styles.eventTypeTemplate__locationWrapper_map__image}
            >
              <img src="https://picsum.photos/500/400?random=2" />
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}
