import styles from "./market.module.scss";
import { BsGlobe } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { PiCirclesFourLight } from "react-icons/pi";
import { RiFocus3Line } from "react-icons/ri";
import { HiOutlineCube } from "react-icons/hi2";
import { Link } from "../../../../../../../navigation";
import ReservationButton from "@/components/reservation/reservation-button";
import {
  _getEntityOverviewList,
  _getEntityOverviewDetail,
} from "@/actions/_meeting-detail";
import { _getAttachmentByPortfolioId } from "@/actions/_portfolio-attachment";
import { getTranslations } from "next-intl/server";

import { _getUserProfile } from "@/actions/auth";
import { _checkUserCalendarPermissions } from "@/actions/_meeting-reservation";

export default async function MarketPage({ params }) {
  const t = await getTranslations("Reservation.Portfolios.MarketPage");
  const locale = params.locale === "en" ? "En" : "Zh";
  const overviewDetail = await _getEntityOverviewDetail({
    EntityId: params.slug,
    EntiryOverviewType: "Market",
  });

  const handleGetAttachment = async (portfolioId) => {
    const attachment = await _getAttachmentByPortfolioId(portfolioId);
    return attachment.data?.[0]?.fileUrl ?? "/images/background.png";
  };

  const contentTypeData = [
    {
      key: 0,
      value: [
        {
          zh: "電影作品",
          en: "Film Works",
        },
      ],

      subValue: [
        {
          Key: 0,
          value: [
            {
              zh: "劇情長片",
              en: "Narrative Feature",
            },
          ],
        },
        {
          Key: 1,
          value: [
            {
              zh: "紀錄片",
              en: "Documentary",
            },
          ],
        },

        {
          Key: 2,
          value: [
            {
              zh: "動畫",
              en: "Animation",
            },
          ],
        },
        {
          Key: 3,
          value: [
            {
              zh: "短片",
              en: "Short",
            },
          ],
        },
        {
          Key: 4,
          value: [
            {
              zh: "經典修復",
              en: "Restored Classic",
            },
          ],
        },
        {
          Key: 5,
          value: [
            {
              zh: "沈浸式內容",
              en: "Immersive Content",
            },
          ],
        },
      ],
    },
    {
      key: 1,
      value: [
        {
          zh: "電視作品",
          en: "TV Works",
        },
      ],

      subValue: [
        {
          Key: 0,
          value: [
            {
              zh: "電視劇集",
              en: "TV Series",
            },
          ],
        },
        {
          Key: 1,
          value: [
            {
              zh: "紀實節目",
              en: "Factual",
            },
          ],
        },
        {
          Key: 2,
          value: [
            {
              zh: "娛樂",
              en: "Entertainment",
            },
          ],
        },
        {
          Key: 3,
          value: [
            {
              zh: "兒童節目",
              en: "Kids",
            },
          ],
        },
        {
          Key: 4,
          value: [
            {
              zh: "電視電影",
              en: "TV Film",
            },
          ],
        },
      ],
    },
    {
      key: 2,
      value: [
        {
          zh: "IP作品",
          en: "IP Works",
        },
      ],

      subValue: [
        {
          Key: 0,
          value: [
            {
              zh: "出版",
              en: "Book",
            },
          ],
        },

        {
          Key: 1,
          value: [
            {
              zh: "表演藝術",
              en: "Performing Arts",
            },
          ],
        },

        {
          Key: 2,
          value: [
            {
              zh: "遊戲",
              en: "Games",
            },
          ],
        },

        {
          Key: 3,
          value: [
            {
              zh: "其它",
              en: "Others",
            },
          ],
        },
      ],
    },
  ];

  const companyCategoryData = [
    {
      key: "無",
      locale: {
        zh: "無",
        en: "None",
      },
    },
    {
      key: "電視台與頻道",
      locale: {
        zh: "電視台與頻道",
        en: "Television Stations and Channels",
      },
    },
    {
      key: "新媒體數位影音",
      locale: {
        zh: "新媒體數位影音",
        en: "New Media & Digital Entertainment",
      },
    },
    {
      key: "製作發行",
      locale: {
        zh: "製作發行",
        en: "Production and Distribution",
      },
    },
    {
      key: "動畫業者",
      locale: {
        zh: "動畫業者",
        en: "Animation Companies",
      },
    },
    {
      key: "出版",
      locale: {
        zh: "出版（含數位出版及版權經紀）",
        en: "Publishing (including digital publishing and copyright agencies)",
      },
    },
    {
      key: "表演藝術",
      locale: {
        zh: "表演藝術",
        en: "Performance Arts",
      },
    },
    {
      key: "創新技術與後製特效公司",
      locale: {
        zh: "創新技術與後製特效公司",
        en: "Innovative Technology and Post-production Special Effects Companies",
      },
    },
    {
      key: "政府組織或機構",
      locale: {
        zh: "政府組織或機構",
        en: "Government Organizations or Institutions",
      },
    },
  ];

  const exhibitionZoneData = [
    {
      zh: "版權交易區",
      en: "Copyright Transaction Zone",
    },
    {
      zh: "協拍資源區",
      en: "Production Resource Zone",
    },
    {
      zh: "IP 轉影視",
      en: "IP Adaptations",
    },
    {
      zh: "影像技術區",
      en: "Visual Technologies Zone",
    },
    {
      zh: "國家館",
      en: "National Pavilions",
    },
    {
      zh: "其他",
      en: "Others",
    },
  ];

  // 已經開通月曆
  // hasExhibitPass = true
  const roleData = await _getUserProfile();
  const calendarPermissions = await _checkUserCalendarPermissions();
  const permissionStatus =
    roleData.hasExhibitPass && calendarPermissions === true;

  return (
    <div className={styles.reservationMarket}>
      <div className={styles.reservationMarket__container}>
        <div className={styles.reservationMarket__container_content}>
          <div className={styles.reservationMarket__banner_logo}>
            <img
              src={overviewDetail?.logoUrl ?? "/images/background.png"}
              alt={`${overviewDetail?.subject}_logo`}
            />
          </div>

          <div className={styles.reservationMarket__profile}>
            <h1 className={styles.reservationMarket__profile_title}>
              {overviewDetail?.[`subject${params.locale === "en" ? "En" : ""}`]}
            </h1>
            <div className={styles.reservationMarket__profile_info}>
              <div className={styles.reservationMarket__profile_info__item}>
                <div
                  className={styles.reservationMarket__profile_info__item_icon}
                >
                  <BsGlobe />
                </div>
                <div
                  className={styles.reservationMarket__profile_info__item_text}
                >
                  {overviewDetail?.[`country${locale}`]}
                </div>
              </div>

              <div className={styles.reservationMarket__profile_info__item}>
                <div
                  className={styles.reservationMarket__profile_info__item_icon}
                >
                  <RiFocus3Line />
                </div>
                <div
                  className={styles.reservationMarket__profile_info__item_tag}
                >
                  {overviewDetail?.tags?.split(",").map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className={styles.reservationMarket__profile_info__item}>
                <div
                  className={styles.reservationMarket__profile_info__item_icon}
                >
                  <HiOutlineCube />
                </div>
                <div
                  className={styles.reservationMarket__profile_info__item_text}
                >
                  {
                    companyCategoryData.find(
                      (data) => data.key === overviewDetail?.companyCategory
                    )?.locale?.[params.locale]
                  }
                </div>
              </div>
              <div className={styles.reservationMarket__profile_info__item}>
                <div
                  className={styles.reservationMarket__profile_info__item_icon}
                >
                  <PiCirclesFourLight />
                </div>
                <div
                  className={styles.reservationMarket__profile_info__item_text}
                >
                  {
                    exhibitionZoneData.find(
                      (data) => data.zh === overviewDetail?.exhibitionZone
                    )?.[params.locale]
                  }
                </div>
              </div>

              <div className={styles.reservationMarket__profile_info__item}>
                <div
                  className={styles.reservationMarket__profile_info__item_icon}
                >
                  <IoMailOutline />
                </div>
                <div
                  className={styles.reservationMarket__profile_info__item_text}
                >
                  <Link href={`mailto:${overviewDetail?.companyEmail}`}>
                    {overviewDetail?.companyEmail}
                  </Link>
                </div>
              </div>

              <div className={styles.reservationMarket__profile_info__item}>
                <div
                  className={styles.reservationMarket__profile_info__item_icon}
                >
                  <IoIosLink />
                </div>
                <div>
                  <Link href={overviewDetail?.websiteUrl ?? ""} target="_blank">
                    {overviewDetail?.websiteUrl}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.reservationMarket__intro}>
            <p className={styles.reservationMarket__intro_text}>
              {overviewDetail?.[`companyProfile${locale}`]}
            </p>
          </div>

          {overviewDetail?.companyPortfolioList?.length > 0 && (
            <div className={styles.reservationMarket__collection}>
              <h3 className={styles.reservationMarket__collection_title}>
                {t("work")}（{overviewDetail?.companyPortfolioList?.length}）
              </h3>
              <div className={styles.reservationMarket__collection_container}>
                {overviewDetail?.companyPortfolioList.map(async (data) => (
                  <Link
                    key={data.genre}
                    href={`/exhibition/portfolio/market/${params.slug}/collection/${data.portfolioId}`}
                    className={
                      styles.reservationMarket__collection_container__box
                    }
                  >
                    <div
                      className={
                        styles.reservationMarket__collection_container__box_content
                      }
                    >
                      <h2
                        className={
                          styles.reservationMarket__collection_container__box_content__title
                        }
                      >
                        {data?.[`title${locale}`]}
                      </h2>
                      <p
                        className={
                          styles.reservationMarket__collection_container__box_content__summary
                        }
                      >
                        {data?.[`description${locale}`]}
                      </p>
                      <div
                        className={
                          styles.reservationMarket__collection_container__box_content__category
                        }
                      >
                        {t("type")}
                        <span
                          className={
                            styles.reservationMarket__collection_item_info_category_tag
                          }
                        >
                          {
                            contentTypeData.find(
                              (item) => item.value[0].zh === data.contentType
                            ).value[0][params.locale]
                          }
                          {" / "}
                          {
                            contentTypeData.find(
                              (item) => item.value[0].zh === data.contentType
                            ).subValue[
                              data.contentSubtype.toString(2).length - 1
                            ]?.value[0][params.locale]
                          }
                        </span>
                      </div>
                    </div>
                    <div
                      className={
                        styles.reservationMarket__collection_container__box_image
                      }
                    >
                      <img
                        src={await handleGetAttachment(data.portfolioId)}
                        alt={data.titleZh}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* {permissionStatus && <ReservationButton />}/ */}
    </div>
  );
}
