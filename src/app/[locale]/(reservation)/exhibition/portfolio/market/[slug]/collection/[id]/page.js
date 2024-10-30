import styles from "./collection.module.scss";
import { _getPortfolioByID } from "@/actions/_portfolio";
import { _getAttachmentByPortfolioId } from "@/actions/_portfolio-attachment";
import { PiCalendarCheck } from "react-icons/pi";
import { PiFilmReel } from "react-icons/pi";
import { PiFilmSlate } from "react-icons/pi";
import { PiFilmStrip } from "react-icons/pi";
import { PiTimer } from "react-icons/pi";
import { BsFileEarmarkMedical } from "react-icons/bs";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { getTranslations } from "next-intl/server";
export default async function collectionPage({ params }) {
  const locale = params.locale === "en" ? "En" : "Zh";

  const collection = await _getPortfolioByID(params.id);
  const t = await getTranslations("Reservation.Portfolios.CollectionPage");
  const attachment = await _getAttachmentByPortfolioId(params.id);

  const statusData = [
    {
      key: 0,
      value: [
        {
          zh: "已完成",
          en: "Completed",
        },
      ],
    },
    {
      key: 1,
      value: [
        {
          zh: "前製",
          en: "Pre-production",
        },
      ],
    },
    {
      key: 2,
      value: [
        {
          zh: "拍攝中",
          en: "Filming",
        },
      ],
    },
    {
      key: 3,
      value: [
        {
          zh: "後製",
          en: "Post-production",
        },
      ],
    },
  ];

  const genreData = [
    {
      key: 0,
      value: [
        {
          zh: "愛情",
          en: "Romance",
        },
      ],
    },
    {
      key: 1,
      value: [
        {
          zh: "喜劇",
          en: "Comedy",
        },
      ],
    },
    {
      key: 2,
      value: [
        {
          zh: "家庭",
          en: "Family",
        },
      ],
    },
    {
      key: 3,
      value: [
        {
          zh: "奇幻",
          en: "Fantasy",
        },
      ],
    },
    {
      key: 4,
      value: [
        {
          zh: "科幻",
          en: "Sci-Fi",
        },
      ],
    },
    {
      key: 5,
      value: [
        {
          zh: "動作",
          en: "Action",
        },
      ],
    },
    {
      key: 6,
      value: [
        {
          zh: "犯罪",
          en: "Crime",
        },
      ],
    },
    {
      key: 7,
      value: [
        {
          zh: "恐怖",
          en: "Horror",
        },
      ],
    },
    {
      key: 8,
      value: [
        {
          zh: "懸疑",
          en: "Mystery",
        },
      ],
    },
    {
      key: 9,
      value: [
        {
          zh: "驚悚",
          en: "Thriller",
        },
      ],
    },
    {
      key: 10,
      value: [
        {
          zh: "青少年成長",
          en: "Teenage Growth",
        },
      ],
    },
    {
      key: 11,
      value: [
        {
          zh: "多元性別",
          en: "LGBTQ+",
        },
      ],
    },
    {
      key: 12,
      value: [
        {
          zh: "政治",
          en: "Political",
        },
      ],
    },
    {
      key: 13,
      value: [
        {
          zh: "歷史",
          en: "Historical",
        },
      ],
    },
    {
      key: 14,
      value: [
        {
          zh: "戰爭",
          en: "War",
        },
      ],
    },
    {
      key: 15,
      value: [
        {
          zh: "社會議題",
          en: "Social Issues",
        },
      ],
    },
    {
      key: 16,
      value: [
        {
          zh: "職人",
          en: "Professional",
        },
      ],
    },
    {
      key: 17,
      value: [
        {
          zh: "時代／古裝劇",
          en: "Period/Costume Drama",
        },
      ],
    },
    {
      key: 18,
      value: [
        {
          zh: "音樂",
          en: "Music",
        },
      ],
    },
    {
      key: 19,
      value: [
        {
          zh: "美食",
          en: "Food",
        },
      ],
    },
    {
      key: 20,
      value: [
        {
          zh: "運動",
          en: "Sports",
        },
      ],
    },
    {
      key: 21,
      value: [
        {
          zh: "旅遊",
          en: "Travel",
        },
      ],
    },
    {
      key: 22,
      value: [
        {
          zh: "動畫",
          en: "Animation",
        },
      ],
    },
    {
      key: 23,
      value: [
        {
          zh: "環境生態",
          en: "Environmental Ecology",
        },
      ],
    },
    {
      key: 24,
      value: [
        {
          zh: "生活風格",
          en: "Lifestyle",
        },
      ],
    },
    {
      key: 25,
      value: [
        {
          zh: "談話性節目",
          en: "Talk Show",
        },
      ],
    },
    {
      key: 26,
      value: [
        {
          zh: "實境節目",
          en: "Reality Show",
        },
      ],
    },
    {
      key: 27,
      value: [
        {
          zh: "綜藝節目",
          en: "Variety Show",
        },
      ],
    },
    {
      key: 28,
      value: [
        {
          zh: "其他",
          en: "Others",
        },
      ],
    },
  ];

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

  return (
    <div className={styles.reservationCollection}>
      <div className={styles.reservationCollection__container}>
        <div className={styles.reservationCollection__container_banner}></div>
        <div className={styles.reservationCollection__container_content}>
          <div
            className={styles.reservationCollection__container_content__profile}
          >
            <h1
              className={
                styles.reservationCollection__container_content__profile_title
              }
            >
              {collection?.data?.[`title${locale}`]}
            </h1>

            <div
              className={
                styles.reservationCollection__container_content__profile_info
              }
            >
              <div
                className={
                  styles.reservationCollection__container_content__profile_info__container
                }
              >
                {/* 完成時間 */}
                <div
                  className={
                    styles.reservationCollection__container_content__profile_info__item
                  }
                >
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_icom
                    }
                  >
                    <PiCalendarCheck />
                  </div>
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_text
                    }
                  >
                    {t("completionDate")}{" "}
                    {collection?.data?.expectedCompletionDate}
                  </div>
                </div>
                {/* 狀態 */}
                <div
                  className={
                    styles.reservationCollection__container_content__profile_info__item
                  }
                >
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_icom
                    }
                  >
                    <PiFilmSlate />
                  </div>
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_text
                    }
                  >
                    {
                      statusData.find(
                        (data) => data.key == collection?.data?.status
                      )?.value?.[0]?.[`${params.locale}`]
                    }
                  </div>
                </div>
                {/* genre */}
                <div
                  className={
                    styles.reservationCollection__container_content__profile_info__item
                  }
                >
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_icom
                    }
                  >
                    <PiFilmReel />
                  </div>
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_tag
                    }
                  >
                    {collection?.data?.genre
                      .map(
                        (item) =>
                          genreData.find((el) => el.key === item)?.value?.[0]?.[
                            params.locale
                          ]
                      )
                      .map((genre, index) => (
                        <span key={index}>{genre}</span>
                      ))}
                  </div>
                </div>
              </div>
              <div
                className={
                  styles.reservationCollection__container_content__profile_info__container
                }
              >
                {/* 集數 時間 */}
                <div
                  className={
                    styles.reservationCollection__container_content__profile_info__item
                  }
                >
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_icon
                    }
                  >
                    <PiTimer />
                  </div>
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_text
                    }
                  >
                    {collection?.data?.contentType === 0
                      ? `${collection?.data?.runningTimeMinutes} ${t(
                          "Unit.min"
                        )}`
                      : `${collection?.data?.runningTimeMinutes} ${t(
                          "Unit.min"
                        )} / ${collection?.data?.episodeCount} ${t(
                          "Unit.episodes"
                        )}`}
                  </div>
                </div>
                {/* contentType */}
                <div
                  className={
                    styles.reservationCollection__container_content__profile_info__item
                  }
                >
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_icom
                    }
                  >
                    <PiFilmStrip />
                  </div>
                  <div
                    className={
                      styles.reservationCollection__container_content__profile_info__item_tag
                    }
                  >
                    <span>
                      {" "}
                      {
                        contentTypeData.find(
                          (data) => data.key == collection?.data?.contentType
                        )?.value?.[0]?.[`${params.locale}`]
                      }{" "}
                      /{" "}
                      {
                        contentTypeData.find(
                          (data) => data.key == collection?.data?.contentType
                        ).subValue[collection?.data?.contentSubtype]
                          ?.value?.[0]?.[`${params.locale}`]
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.reservationCollection__container_content__intro}
          >
            <div
              className={
                styles.reservationCollection__container_content__intro_brief
              }
            >
              <h2
                className={
                  styles.reservationCollection__container_content__intro_title
                }
              >
                <div
                  className={
                    styles.reservationCollection__container_content__intro_title__icon
                  }
                >
                  <BsFileEarmarkMedical />
                </div>

                <div
                  className={
                    styles.reservationCollection__container_content__intro_title__text
                  }
                >
                  {t("overview")}
                </div>
              </h2>
              {/* 劇情介紹 */}
              <div
                className={
                  styles.reservationCollection__container_content__intro_description
                }
              >
                {collection?.data?.[`description${locale}`]}
              </div>

              {/* 獎項 */}
              {collection?.data?.[`awards${locale}`] && (
                <h3
                  className={
                    styles.reservationCollection__container_content__intro_content__item_title
                  }
                >
                  {t("awards")}
                </h3>
              )}

              {collection?.data?.[`awards${locale}`] && (
                <ul
                  className={
                    styles.reservationCollection__container_content__intro_content__list
                  }
                >
                  {collection?.data?.[`awards${locale}`]
                    ?.split(locale === "en" ? "," : "、")
                    .map((award, index) => (
                      <li
                        key={index}
                        className={
                          styles.reservationCollection__container_content__intro_content__list_item
                        }
                      >
                        {award}
                      </li>
                    ))}
                </ul>
              )}

              <h2
                className={
                  styles.reservationCollection__container_content__intro_title
                }
              >
                <div
                  className={
                    styles.reservationCollection__container_content__intro_title__icon
                  }
                >
                  <BsFileEarmarkPerson />
                </div>

                <div
                  className={
                    styles.reservationCollection__container_content__intro_title__text
                  }
                >
                  {t("crew")}
                </div>
              </h2>
              <div
                className={
                  styles.reservationCollection__container_content__intro_content
                }
              >
                {/* 導演 */}
                <div
                  className={
                    styles.reservationCollection__container_content__intro_content__item
                  }
                >
                  <h3
                    className={
                      styles.reservationCollection__container_content__intro_content__item_title
                    }
                  >
                    {t("director")}
                  </h3>
                  <div
                    className={
                      styles.reservationCollection__container_content__intro_content__item_text
                    }
                  >
                    {collection?.data?.[`directorName${locale}`]}
                  </div>
                </div>
                {/* 製片 製作人 */}
                <div
                  className={
                    styles.reservationCollection__container_content__intro_content__item
                  }
                >
                  <h3
                    className={
                      styles.reservationCollection__container_content__intro_content__item_title
                    }
                  >
                    {collection?.data?.contentType === 0
                      ? t("producer_film")
                      : t("producer_tv")}
                  </h3>
                  <div
                    className={
                      styles.reservationCollection__container_content__intro_content__item_text
                    }
                  >
                    {collection?.data?.[`producerName${locale}`]}
                  </div>
                </div>
                {/* 創作者 */}
                {collection?.data?.[`creatorFullName${locale}`] && (
                  <div
                    className={
                      styles.reservationCollection__container_content__intro_content__item
                    }
                  >
                    <h3
                      className={
                        styles.reservationCollection__container_content__intro_content__item_title
                      }
                    >
                      {t("creator")}
                    </h3>
                    <div
                      className={
                        styles.reservationCollection__container_content__intro_content__item_text
                      }
                    >
                      {collection?.data?.[`creatorFullName${locale}`]}
                    </div>
                  </div>
                )}

                {/* 創作者簡介 */}
                {collection?.data?.[`creatorBiography${locale}`] && (
                  <div>{collection?.data?.[`creatorBiography${locale}`]}</div>
                )}

                {/* 卡司 */}
                <h3
                  className={
                    styles.reservationCollection__container_content__intro_content__item_title
                  }
                >
                  {t("cast")}
                </h3>
                <ul
                  className={
                    styles.reservationCollection__container_content__intro_content__list
                  }
                >
                  {collection?.data?.[`hostCast${locale}`]
                    ?.split(locale === "en" ? "," : "、")
                    .map((cast, index) => (
                      <li
                        key={index}
                        className={
                          styles.reservationCollection__container_content__intro_content__list_item
                        }
                      >
                        {cast.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div
              className={
                styles.reservationCollection__container_content__intro_image
              }
            >
              <img
                src={attachment.data?.[0]?.fileUrl ?? "/images/background.png"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
