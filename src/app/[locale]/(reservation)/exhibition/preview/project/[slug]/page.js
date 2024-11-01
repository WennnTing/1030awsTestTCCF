import styles from "./pitching.module.scss";
import PortfolioSearch from "@/components/reservation/portfolio-search";
import ReservationButton from "@/components/reservation/reservation-button";
import Introduction from "./component/Introduction";
import Profile from "./component/Profile";
import { _getEntityOverviewDetail } from "@/actions/_meeting-detail";

import { _getUserProfile } from "@/actions/auth";
import { _checkUserCalendarPermissions } from "@/actions/_meeting-reservation";

export default async function ProjectPage({ params }) {
  const locale = params.locale === "en" ? "En" : "";
  const overviewDetail = await _getEntityOverviewDetail({
    EntityId: params.slug,
    EntiryOverviewType: "Project",
  });

  // 已經開通月曆
  // hasExhibitPass = true
  const roleData = await _getUserProfile();
  const calendarPermissions = await _checkUserCalendarPermissions();
  const permissionStatus =
    roleData.hasExhibitPass && calendarPermissions === true;

  return (
    <div className={styles.reservationPitiching}>
      <div className={styles.reservationPitiching__container}>
        {/* <div className={styles.reservationPitiching__container_search}>
          <PortfolioSearch overviewList={overviewList} />
        </div> */}
        <div className={styles.reservationPitiching__container_content}>
          <div className={styles.reservationPitiching__profile}>
            <div className={styles.reservationPitiching__profile_title}>
              <div
                className={styles.reservationPitiching__profile_title__category}
              >
                <h1>{overviewDetail?.[`pitchingMainCategory${locale}`]}</h1>
                {/* Taicca School 沒有 pitchingCategory */}
                {overviewDetail.pitchingMainCategoryEn !== "Taicca School" && (
                  <span> | </span>
                )}
                {overviewDetail.pitchingMainCategoryEn !== "Taicca School" && (
                  <h1>{overviewDetail?.[`pitchingCategory${locale}`]}</h1>
                )}
              </div>
              <h2>{overviewDetail?.[`subject${locale}`]}</h2>
            </div>
          </div>
          <Profile data={overviewDetail} />

          <div className={styles.reservationPitiching__intro}>
            <div className={styles.reservationPitiching__intro_description}>
              <Introduction data={overviewDetail} />
            </div>
            <div className={styles.reservationPitiching__intro_keyVisual}>
              <img
                src={overviewDetail?.keyVisual ?? "/images/background.png"}
                alt={`${overviewDetail?.subject}_keyVisual`}
              />
            </div>

            {/* <div
              className={
                styles.reservationPitiching__container_content__intro_contact
              }
            >
              <div
                className={
                  styles.reservationPitiching__container_content__intro_contact__container
                }
              >
                <img
                  src={overviewDetail?.keyVisual ?? "/images/background.png"}
                  alt={`${overviewDetail?.subject}_keyVisual`}
                />
                <div
                  className={
                    styles.reservationPitiching__container_content__intro_contact__container_list
                  }
                >
                  <div
                    className={
                      styles.reservationPitiching__container_content__intro_contact__container_list__item
                    }
                  >
                    <div
                      className={
                        styles.reservationPitiching__container_content__intro_contact__container_list__item_title
                      }
                    >
                      聯絡窗口姓名
                    </div>
                    <div
                      className={
                        styles.reservationPitiching__container_content__intro_contact__container_list__item_text
                      }
                    >
                      {overviewDetail?.[`contactPerson${locale}`]}
                    </div>
                  </div>

                  {overviewDetail?.pitchingCategoryEn !==
                    "Original Story Concept" && (
                    <div
                      className={
                        styles.reservationPitiching__container_content__intro_contact__container_list__item
                      }
                    >
                      <div
                        className={
                          styles.reservationPitiching__container_content__intro_contact__container_list__item_title
                        }
                      >
                        聯絡窗口職稱
                      </div>
                      <div
                        className={
                          styles.reservationPitiching__container_content__intro_contact__container_list__item_text
                        }
                      >
                        {overviewDetail?.[`jobTitle${locale}`]}
                      </div>
                    </div>
                  )}

                  <div
                    className={
                      styles.reservationPitiching__container_content__intro_contact__container_list__item
                    }
                  >
                    <div
                      className={
                        styles.reservationPitiching__container_content__intro_contact__container_list__item_title
                      }
                    >
                      聯絡窗口電話
                    </div>
                    <div
                      className={
                        styles.reservationPitiching__container_content__intro_contact__container_list__item_text
                      }
                    >
                      {overviewDetail?.contactNumber}
                    </div>
                  </div>

                  <div
                    className={
                      styles.reservationPitiching__container_content__intro_contact__container_list__item
                    }
                  >
                    <div
                      className={
                        styles.reservationPitiching__container_content__intro_contact__container_list__item_title
                      }
                    >
                      聯絡窗口信箱
                    </div>
                    <div
                      className={
                        styles.reservationPitiching__container_content__intro_contact__container_list__item_text
                      }
                    >
                      {overviewDetail?.contactEmail}
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* {permissionStatus && <ReservationButton />} */}
    </div>
  );
}
