import styles from "./activity.module.scss";

import { _getActivityByActivityId } from "@/actions/_activities";
import { getPageFieldValuesByPageUUID } from "@/actions/page-field-values";
import parse from "html-react-parser";
import moment from "moment";
import ApplyButton from "@/components/reservation/apply-button";
import SlideShow from "@/components/reservation/slide-show";
import { getTranslations } from "next-intl/server";

export default async function ActivityPage({ params }) {
  const t = await getTranslations("Activity.Info");
  const activity = await _getActivityByActivityId(params.slug);
  const activityDetail = activity.data;

  const pageData = await getPageFieldValuesByPageUUID(activityDetail.uuid);

  const locale = params.locale === "en" ? "En" : "Zh";

  const memberData = pageData?.data
    ?.filter((item) => item.elementId.includes("member_"))
    ?.reduce((acc, item) => {
      const match = item.elementId.match(/_(\d+)$/);
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

  const slideData = pageData?.data?.filter((item) =>
    item.elementId.includes("slide_")
  );

  return (
    <div className={styles.reservationActivity__activity_wrapper}>
      <div className={styles.reservationActivity__activity_wrapper__container}>
        <div
          className={
            styles.reservationActivity__activity_wrapper__container_content
          }
        >
          <h1
            className={
              styles.reservationActivity__activity_wrapper__container_content__title
            }
          >
            {
              activityDetail?.[
                `activityName${params.locale === "en" ? "En" : ""}`
              ]
            }
          </h1>

          <div
            className={
              styles.reservationActivity__activity_wrapper__container_content__kv
            }
          >
            <img
              src={
                pageData?.data.find((item) => item.elementId === "kv")?.imageUrl
              }
            />
          </div>

          <div
            className={
              styles.reservationActivity__activity_wrapper__container_content__content
            }
          >
            <div
              className={
                styles.reservationActivity__activity_wrapper__container_content__content_info
              }
            >
              <div
                className={
                  styles.reservationActivity__activity_wrapper__container_content__content_info__list
                }
              >
                {/* <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_title
                  }
                >
                  {t("logline")}
                </div> */}

                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_text
                  }
                >
                  {
                    pageData?.data.find(
                      (item) => item.elementId === "summary"
                    )?.[`fieldText${locale}`]
                  }
                </div>
              </div>

              <div
                className={
                  styles.reservationActivity__activity_wrapper__container_content__content_info__list
                }
              >
                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_title
                  }
                >
                  {t("eventTime")}
                </div>

                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_text
                  }
                >
                  <span>
                    {moment(activityDetail.activityStartTime).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                  </span>
                  <span>
                    {moment(activityDetail.activityEndTime).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                  </span>
                </div>
              </div>

              <div
                className={
                  styles.reservationActivity__activity_wrapper__container_content__content_info__list
                }
              >
                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_title
                  }
                >
                  {t("registrationPeriod")}
                </div>

                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_text
                  }
                >
                  <span>
                    {activityDetail.registrationStartDate} -{" "}
                    {activityDetail.registrationEndDate}
                  </span>
                </div>
              </div>

              <div
                className={
                  styles.reservationActivity__activity_wrapper__container_content__content_info__list
                }
              >
                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_title
                  }
                >
                  {t("location")}
                </div>

                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_text
                  }
                >
                  <span>
                    {(() => {
                      switch (activityDetail.location) {
                        case "主舞台":
                          return params.locale === "en"
                            ? "Main Stage"
                            : "主舞台";
                        case "沙龍舞台":
                          return params.locale === "en"
                            ? "Salon Stage"
                            : "沙龍舞台";
                        case "提案舞台":
                          return params.locale === "en"
                            ? "Pitching Stage"
                            : "提案舞台";
                      }
                    })()}
                  </span>
                </div>
              </div>

              {/* <div
                className={
                  styles.reservationActivity__activity_wrapper__container_content__content_info__list
                }
              >
                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_title
                  }
                >
                  {t("totalSpots")}
                </div>

                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_info__list_text
                  }
                >
                  <span>
                    {t("remainingSpots")}{" "}
                    {activityDetail.maxParticipants -
                      activityDetail.currentParticipants}{" "}
                    / {t("totalSpots")} {activityDetail.maxParticipants}
                  </span>
                </div>
              </div> */}
            </div>

            <div
              className={
                styles.reservationActivity__activity_wrapper__container_content__content_detail
              }
            >
              <div
                className={
                  styles.reservationActivity__activity_wrapper__container_content__content_detail__context
                }
              >
                {parse(
                  pageData?.data.find((item) => item.elementId === "content")?.[
                    `fieldText${locale}`
                  ]
                )}
              </div>

              <div
                className={
                  styles.reservationActivity__activity_wrapper__container_content__content_detail__slide
                }
              >
                <SlideShow data={slideData} />
              </div>

              {memberDataArray.length > 0 && (
                <div
                  className={
                    styles.reservationActivity__activity_wrapper__container_content__content_detail__member
                  }
                >
                  <h2>{t("team")}</h2>
                  {memberDataArray.map((data, index) => (
                    <div
                      className={
                        styles.reservationActivity__activity_wrapper__container_content__content_detail__member_box
                      }
                      key={index}
                    >
                      <div
                        className={
                          styles.reservationActivity__activity_wrapper__container_content__content_detail__member_box__image
                        }
                      >
                        <img
                          src={
                            data?.filter(
                              (item) =>
                                item.elementId === `member_image_${index + 1}`
                            )?.[0]?.imageUrl
                          }
                        />
                      </div>

                      <div
                        className={
                          styles.reservationActivity__activity_wrapper__container_content__content_detail__member_box__content
                        }
                      >
                        <div
                          className={
                            styles.reservationActivity__activity_wrapper__container_content__content_detail__member_box__content_title
                          }
                        >
                          {
                            data?.filter(
                              (item) =>
                                item.elementId === `member_title_${index + 1}`
                            )?.[0]?.[`fieldText${locale}`]
                          }
                        </div>
                        <div
                          className={
                            styles.reservationActivity__activity_wrapper__container_content__content_detail__member_box__content_text
                          }
                        >
                          {parse(
                            data?.filter(
                              (item) =>
                                item.elementId === `member_content_${index + 1}`
                            )?.[0]?.[`fieldText${locale}`] ?? ""
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ApplyButton id={activityDetail.activityId} />
    </div>
  );
}
