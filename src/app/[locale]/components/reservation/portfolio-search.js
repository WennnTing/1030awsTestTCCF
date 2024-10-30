"use client";
import { useEffect, useState } from "react";
import styles from "./portfolio-search.module.scss";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { usePathname } from "../../../../navigation";
import { Link } from "../../../../navigation";
import { useLocale } from "next-intl";
import { LuSearchX } from "react-icons/lu";
import useWindowSize from "@/tool/useWindowSize";
import { useFormState } from "react-dom";
import { searchEntityList } from "@/actions/reservation";
import { LuSearch } from "react-icons/lu";
import { LuListRestart } from "react-icons/lu";
import { LuFilter } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { LuFilterX } from "react-icons/lu";
import { useTranslations } from "next-intl";

export default function PortfolioSearch({ overviewList, meetingMemberList }) {
  const t = useTranslations("Reservation.Portfolios");
  const [state, formAction] = useFormState(searchEntityList, {});

  const pathname = usePathname();

  const locale = useLocale() === "en" ? "En" : "";
  const optionLocale = useLocale() === "en" ? "en" : "zh";
  const currentPath = pathname.match(/^\/exhibition\/(.+)/)[1].split("/")[0];

  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(true);

  const [search, setSearch] = useState("");

  const overviewListWithType = overviewList.map((data) => {
    return {
      ...data,
      type: "entity",
    };
  });

  const meetingMemberListWithType = meetingMemberList.map((data) => {
    return {
      ...data,
      type: "member",
    };
  });

  const [overview, setOverview] = useState([
    ...overviewListWithType,
    ...meetingMemberListWithType,
  ]);

  const [isComposing, setIsComposing] = useState(false);

  const windowSize = useWindowSize();
  const [sildeWidth, setSlideWidth] = useState("350px");

  useEffect(() => {
    if (windowSize.width <= 1024) {
      setSlideWidth("98vw");
    } else {
      setSlideWidth("350px");
    }
  }, [windowSize.width]);

  // useEffect(() => {
  //   if (!isComposing) {
  //     if (search === "") {
  //       setOverview(overviewList);
  //     } else {
  //       setOpen(false);
  //       setOverview(
  //         overviewList.filter((item) => item.subject.includes(search))
  //       );
  //     }
  //   }
  // }, [search, isComposing, overviewList]);

  useEffect(() => {
    if (typeof state === "object" && !Array.isArray(state)) {
      setOverview([...overviewListWithType, ...meetingMemberListWithType]);
    } else {
      setOverview(state);
    }
    setOpen(false);
  }, [state]);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const [searchFilterData, setsearchFilterData] = useState([
    {
      type: [
        {
          zh: "展證身份",
          en: "BADGE",
        },
      ],
      isOpen: false,
      fields: [
        {
          title: [
            {
              zh: "",
              en: "",
            },
          ],
          key: "SearchMember_RoleType",
          options: [
            { label_zh: "Market", label_en: "Market" },
            { label_zh: "Buyer", label_en: "Buyer" },
            { label_zh: "Speaker", label_en: "Speaker" },
            // { label_zh: "VIP", label_en: "VIP" },
            { label_zh: "Award Sponsor", label_en: "Award Sponsor" },
            { label_zh: "Professional", label_en: "Professional" },
            { label_zh: "Decision Maker", label_en: "Decision Maker" },
          ],
        },
      ],
    },
    {
      type: [
        {
          zh: "市場展",
          en: "MARKET",
        },
      ],
      isOpen: false,
      fields: [
        // {
        //   title: [
        //     {
        //       zh: "展證",
        //       en: "Badge",
        //     },
        //   ],
        //   key: "SearchMarket_OwnerRole",
        //   options: [
        //     { label_zh: "Market", label_en: "Market" },
        //     { label_zh: "Buyer", label_en: "Buyer" },
        //     { label_zh: "Speaker", label_en: "Speaker" },
        //     { label_zh: "VIP", label_en: "VIP" },
        //     { label_zh: "Award Sponsor", label_en: "Award Sponsor" },
        //     { label_zh: "Professional", label_en: "Professional" },
        //   ],
        // },
        {
          title: [
            {
              zh: "公司行業別",
              en: "Nature of Business",
            },
          ],
          key: "SearchMarket_CompanyCategoryZh",
          options: [
            {
              label_zh: "電視台與頻道",
              label_en: "Television Stations and Channels",
            },
            {
              label_zh: "新媒體數位影音",
              label_en: "New Media & Digital Entertainment",
            },
            { label_zh: "製作發行", label_en: "Production and Distribution" },
            { label_zh: "動畫業者", label_en: "Animation Companies" },
            {
              label_zh: "出版",
              label_en:
                "Publishing (including digital publishing and copyright agencies)",
            },
            { label_zh: "表演藝術", label_en: "Performance Arts" },
            {
              label_zh: "創新技術與後製特效公司",
              label_en:
                "Innovative Technology and Post-production Special Effects Companies",
            },
            {
              label_zh: "政府組織或機構",
              label_en: "Government Organizations or Institutions",
            },
          ],
        },
        {
          title: [
            {
              zh: "市場展五大區",
              en: "Zone",
            },
          ],
          key: "SearchMarket_ExhibitionZoneZh",
          options: [
            { label_zh: "版權交易區", label_en: "Copyright Transaction Zone" },
            { label_zh: "協拍資源區", label_en: "Production Resource Zone" },
            { label_zh: "IP轉影視", label_en: "IP Adaptations" },
            { label_zh: "影像技術區", label_en: "Visual Technologies Zone" },
            { label_zh: "國家館", label_en: "National Pavilions" },
            { label_zh: "其他", label_en: "Others" },
          ],
        },
        {
          title: [
            {
              zh: "參展目標",
              en: "Participation Goal",
            },
          ],
          key: "SearchMarket_ParticipationGoals",
          options: [
            { label_zh: "籌募資金", label_en: "Financing" },
            { label_zh: "版權交易", label_en: "Copyright Transactions" },
            { label_zh: "聯合監製", label_en: "Co-Production" },
            { label_zh: "國際發行", label_en: "International Distribution" },
            { label_zh: "影展放映", label_en: "Festival Screening" },
            { label_zh: "開拓業務市場", label_en: "Business Development" },
            {
              label_zh: "瞭解市場及產業動態",
              label_en: "Insight into Market Trends & Industry Landscapes",
            },
            { label_zh: "機構服務內容推廣", label_en: "Promote Our Services" },
            { label_zh: "其他", label_en: "Others" },
          ],
        },
        {
          title: [
            {
              zh: "作品",
              en: "Work",
            },
          ],
          key: "SearchMarket_PortfolioSubType",
          subgroups: [
            {
              title: [
                {
                  zh: "電影作品",
                  en: "Film",
                },
              ],
              options: [
                { label_zh: "劇情長片", label_en: "Narrative Feature" },
                { label_zh: "紀錄片", label_en: "Documentary" },
                { label_zh: "動畫", label_en: "Animation" },
                { label_zh: "短片", label_en: "Short" },
                { label_zh: "經典修復", label_en: "Restored Classic" },
                { label_zh: "沉浸式內容", label_en: "Immersive Content" },
              ],
            },
            {
              title: [
                {
                  zh: "電視作品",
                  en: "TV",
                },
              ],
              options: [
                { label_zh: "電視劇集", label_en: "TV Series" },
                { label_zh: "紀實節目", label_en: "Factual" },
                { label_zh: "娛樂", label_en: "Entertainment" },
                { label_zh: "兒童節目", label_en: "Kids" },
                { label_zh: "電視電影", label_en: "TV Film" },
              ],
            },
            {
              title: [
                {
                  zh: "IP作品",
                  en: "IP",
                },
              ],
              options: [
                { label_zh: "出版", label_en: "Book" },
                { label_zh: "表演藝術", label_en: "Performance Arts" },
                { label_zh: "遊戲", label_en: "Game" },
                { label_zh: "其它", label_en: "Others" },
              ],
            },
          ],
        },
        {
          title: [
            {
              zh: "主題 / 類型",
              en: "Theme / Genre",
            },
          ],
          key: "SearchMarket_PortfolioGenres",
          options: [
            { label_zh: "愛情", label_en: "Romance" },
            { label_zh: "喜劇", label_en: "Comedy" },
            { label_zh: "家庭", label_en: "Family" },
            { label_zh: "奇幻", label_en: "Fantasy" },
            { label_zh: "科幻", label_en: "Sci-Fi" },
            { label_zh: "動作", label_en: "Action" },
            { label_zh: "犯罪", label_en: "Crime" },
            { label_zh: "恐怖", label_en: "Horror" },
            { label_zh: "懸疑", label_en: "Mystery" },
            { label_zh: "驚悚", label_en: "Thriller" },
            { label_zh: "青少年成長", label_en: "Coming of Age" },
            { label_zh: "多元性別", label_en: "LGBTQIA+" },
            { label_zh: "政治", label_en: "Politics" },
            { label_zh: "歷史", label_en: "History" },
            { label_zh: "戰爭", label_en: "War" },
            { label_zh: "社會議題", label_en: "Social Issues" },
            { label_zh: "職人", label_en: "Workplace Drama" },
            { label_zh: "時代劇 / 古裝劇", label_en: "Period Drama" },
            { label_zh: "音樂", label_en: "Music" },
            { label_zh: "美食", label_en: "Food" },
            { label_zh: "運動", label_en: "Sports" },
            { label_zh: "旅遊", label_en: "Travel" },
            { label_zh: "動畫", label_en: "Animation" },
            { label_zh: "環境生態", label_en: "Environment" },
            { label_zh: "生活風格", label_en: "Liftstyle" },
            { label_zh: "談話性節目", label_en: "Talk Show" },
            { label_zh: "實境節目", label_en: "Reality Show" },
            { label_zh: "綜藝節目", label_en: "Variety" },
            { label_zh: "其他", label_en: "Others" },
          ],
        },
      ],
    },
    {
      type: [
        {
          zh: "提案大會",
          en: "PITCHING",
        },
      ],
      isOpen: false,
      fields: [
        {
          title: [
            {
              zh: "Story to Screen",
              en: "Story to Screen",
            },
          ],
          key: "SearchProject_ProjectToScreenZh",
          options: [
            { label_zh: "出版文本", label_en: "Fiction & Non-Fiction" },
            { label_zh: "漫畫", label_en: "Comics" },
            {
              label_zh: "Shoot the Book! TCCF",
              label_en: "Shoot the Book! TCCF",
            },
            {
              label_zh: "原創故事專場",
              label_en: "Original Story Concept",
            },
          ],
        },
        {
          title: [
            {
              zh: "Project to Screen",
              en: "Project to Screen",
            },
          ],
          key: "SearchProject_ProjectToScreenZh",
          options: [
            { label_zh: "長片", label_en: "Feature Films" },
            { label_zh: "影集", label_en: "Series" },
            { label_zh: "動畫", label_en: "Animation Films and Series" },
            { label_zh: "紀錄片", label_en: "Documentary Films and Series" },
          ],
        },
        {
          title: [
            {
              zh: "Taicca School",
              en: "Taicca School",
            },
          ],
          key: "SearchProject_TaiccaSchool",
          options: [{ label_zh: "Taicca School", label_en: "Taicca School" }],
        },
        {
          title: [
            {
              zh: "參與目標",
              en: "Goal at TCCF",
            },
          ],
          key: "SearchProject_GoalAtTccFZh",
          options: [
            { label_zh: "籌募資金", label_en: "Financing" },
            { label_zh: "聯合製作", label_en: "Co-Production" },
            { label_zh: "後期製作", label_en: "Post Production Partners" },
            { label_zh: "版權預售", label_en: "Pre-Sales" },
            { label_zh: "銷售代理", label_en: "International Sales" },
            { label_zh: "國際發行", label_en: "International Distribution" },
            { label_zh: "其他", label_en: "Other" },
          ],
        },
        {
          title: [
            {
              zh: "作品類型",
              en: "Genre",
            },
          ],
          key: "SearchProject_GenreZh",
          options: [
            { label_zh: "動作", label_en: "Action" },
            { label_zh: "冒險", label_en: "Adventure" },
            { label_zh: "喜劇", label_en: "Comedy" },
            { label_zh: "職人", label_en: "Craftsman" },
            { label_zh: "犯罪", label_en: "Crime" },
            { label_zh: "偵探", label_en: "Detective" },
            { label_zh: "劇情", label_en: "Drama" },
            { label_zh: "諜報", label_en: "Espionage" },
            { label_zh: "奇幻", label_en: "Fantasy" },
            { label_zh: "歷史", label_en: "Historical" },
            { label_zh: "恐怖", label_en: "Horror" },
            { label_zh: "偵查", label_en: "Investigation" },
            { label_zh: "生活故事", label_en: "Life Story" },
            { label_zh: "武打", label_en: "Martial arts" },
            { label_zh: "愛情", label_en: "Romance" },
            { label_zh: "科幻", label_en: "Sci-Fi" },
            { label_zh: "運動", label_en: "Sports" },
            { label_zh: "懸疑", label_en: "Suspense" },
            { label_zh: "靈異", label_en: "Supernatural" },
            { label_zh: "驚悚", label_en: "Thriller" },
            { label_zh: "政治", label_en: "Political" },
            { label_zh: "心理劇情", label_en: "Psychological Drama" },
            { label_zh: "戰爭", label_en: "War" },
          ],
        },
      ],
    },
  ]);

  const [formKey, setFormKey] = useState(0);
  const handleReset = () => {
    setFormKey((key) => key + 1);
    // setOpen(false);
    setOverview([...overviewListWithType, ...meetingMemberListWithType]);
  };

  const handleFilterSlide = (type) => {
    setsearchFilterData(
      searchFilterData.map((data) =>
        data.type[0].en === type ? { ...data, isOpen: !data.isOpen } : data
      )
    );
  };

  return (
    <>
      <div
        className={styles.reservationPortfolioSearchBtn}
        onClick={() => setSlide(!slide)}
      >
        <HiOutlineMenuAlt2 />
      </div>

      <div
        className={styles.reservationPortfolioSearch}
        style={{
          width: slide ? sildeWidth : "0",
          opacity: slide ? "1" : "0",
        }}
      >
        <form action={formAction} key={formKey}>
          <div className={styles.reservationPortfolioSearch__search}>
            <div
              className={styles.reservationPortfolioSearch__search_container}
            >
              <div
                className={styles.reservationPortfolioSearch__search_filter}
                onClick={() => setSlide(!slide)}
              >
                <HiChevronDoubleLeft />
              </div>
              <input
                type="text"
                placeholder={t("Search.placeholder")}
                onChange={(e) => setSearch(e.target.value.trim())}
                className={styles.reservationPortfolioSearch__search_input}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                name="SearchText"
              />

              <div
                className={styles.reservationPortfolioSearch__search_filter}
                onClick={() => setOpen(!open)}
                // style={{
                //   background: open ? "rgba(81, 186, 151, 0.1)" : "#f8f9fa",
                //   color: open ? "#51BA97" : "black",
                // }}
              >
                {open ? <LuFilterX /> : <LuFilter />}
              </div>

              <button
                className={styles.reservationPortfolioSearch__search_filter}
              >
                <LuSearch />
              </button>
            </div>
            <div className={styles.reservationPortfolioSearch__reset}>
              <div
                onClick={handleReset}
                className={styles.reservationPortfolioSearch__reset_button}
              >
                Clear All Filters
                <div
                  className={
                    styles.reservationPortfolioSearch__reset_button__icon
                  }
                >
                  <LuListRestart />
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.reservationPortfolioSearch__filter}
            style={{
              gridTemplateRows: open ? "1fr" : "0fr",
              maxHeight: open ? "300px" : "0",
            }}
          >
            <div
              className={styles.reservationPortfolioSearch__filter_container}
            >
              {/* <div
              className={
                styles.reservationPortfolioSearch__filter_container__mask
              }
            >
              <div
                className={
                  styles.reservationPortfolioSearch__filter_container__mask_icon
                }
              >
                <IoAlarmOutline />
              </div>
              Coming Soon
            </div> */}

              {searchFilterData.map((data) => (
                <ul
                  className={styles.reservationPortfolioSearch__filter_mainList}
                  key={data.type[0].en}
                >
                  <li
                    className={
                      styles.reservationPortfolioSearch__filter_mainList__item
                    }
                  >
                    <div
                      className={
                        styles.reservationPortfolioSearch__filter_mainList__item_title
                      }
                      onClick={() => handleFilterSlide(data.type[0].en)}
                    >
                      <div
                        className={
                          styles.reservationPortfolioSearch__filter_mainList__item_title__text
                        }
                      >
                        {data.type[0][optionLocale]}
                      </div>

                      <div
                        className={
                          styles.reservationPortfolioSearch__filter_mainList__item_title__icon
                        }
                        style={{
                          transform: data.isOpen ? "scaleY(-1) " : "scaleY(1)",
                        }}
                      >
                        <IoIosArrowDown />
                      </div>
                    </div>

                    <div
                      className={
                        styles.reservationPortfolioSearch__filter_slide
                      }
                      style={{ gridTemplateRows: data.isOpen ? "1fr" : "0fr" }}
                    >
                      <div
                        className={
                          styles.reservationPortfolioSearch__filter_slide__container
                        }
                      >
                        {data.fields.map((field, index) => (
                          <ul
                            className={
                              styles.reservationPortfolioSearch__filter_mainList__item__subList
                            }
                            key={index}
                          >
                            <li
                              className={
                                styles.reservationPortfolioSearch__filter_mainList__item__subList_item
                              }
                            >
                              <div
                                className={
                                  styles.reservationPortfolioSearch__filter_mainList__item__subList_item__title
                                }
                              >
                                {field.title[0][optionLocale]}
                              </div>
                              <div
                                className={
                                  styles.reservationPortfolioSearch__filter_mainList__item__subList_item__optionList
                                }
                              >
                                {field?.options?.map((option, index) => (
                                  <div key={index}>
                                    <input
                                      type="checkbox"
                                      id={`${field.title[0][optionLocale]}_${
                                        option[`label_${optionLocale}`]
                                      }`}
                                      name={field.key}
                                      value={(() => {
                                        switch (option.label_en) {
                                          case "Taicca School":
                                            return true;
                                          case "Shoot the Book! TCCF":
                                            return "Shoot_TheBook_TCCF";
                                          case "Period Drama":
                                            return "時代劇OR古裝劇";
                                          default:
                                            return option.label_zh;
                                        }
                                      })()}
                                      hidden
                                    />
                                    <label
                                      htmlFor={`${
                                        field.title[0][optionLocale]
                                      }_${option[`label_${optionLocale}`]}`}
                                    >
                                      {option[`label_${optionLocale}`]}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </li>

                            <div>
                              {field?.subgroups?.map((subgroup, index) => (
                                <ul
                                  className={
                                    styles.reservationPortfolioSearch__filter_mainList__item__thirdList
                                  }
                                  key={index}
                                >
                                  <li
                                    className={
                                      styles.reservationPortfolioSearch__filter_mainList__item__subList_item
                                    }
                                  >
                                    <div
                                      className={
                                        styles.reservationPortfolioSearch__filter_mainList__item__subList_item__subTitle
                                      }
                                    >
                                      {subgroup.title[0][optionLocale]}
                                    </div>
                                    <div
                                      className={
                                        styles.reservationPortfolioSearch__filter_mainList__item__subList_item__optionList
                                      }
                                    >
                                      {subgroup.options.map((option, index) => (
                                        <div key={index}>
                                          <input
                                            type="checkbox"
                                            id={`${
                                              subgroup.title[0][optionLocale]
                                            }_${
                                              option[`label_${optionLocale}`]
                                            }`}
                                            name={field.key}
                                            value={
                                              option[`label_${optionLocale}`]
                                            }
                                            hidden
                                          />
                                          <label
                                            htmlFor={`${
                                              subgroup.title[0][optionLocale]
                                            }_${
                                              option[`label_${optionLocale}`]
                                            }`}
                                          >
                                            {option[`label_${optionLocale}`]}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </li>
                                </ul>
                              ))}
                            </div>
                          </ul>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className={styles.reservationPortfolioSearch__container}>
            {overview?.length > 0 ? (
              overview?.map((data, index) => (
                <Link
                  key={index}
                  className={
                    data.type === "entity"
                      ? pathname.split("/")[3] ===
                          data.entiryOverviewType?.toLowerCase() &&
                        pathname.split("/")[4] == data.entityId
                        ? `${styles.reservationPortfolioSearch__container_box} ${styles.active}`
                        : `${styles.reservationPortfolioSearch__container_box}`
                      : pathname.split("/")[4] == data.memberId
                      ? `${styles.reservationPortfolioSearch__container_box} ${styles.active}`
                      : `${styles.reservationPortfolioSearch__container_box}`
                  }
                  href={
                    data.type === "entity"
                      ? `/exhibition/${currentPath}/${data.entiryOverviewType?.toLowerCase()}/${
                          data.entityId
                        }`
                      : `/exhibition/${currentPath}/badge/${data.memberId}`
                  }
                >
                  <div
                    className={
                      styles.reservationPortfolioSearch__container_box__title
                    }
                  >
                    {data.type === "entity"
                      ? data?.[`subject${locale}`]
                      : data?.[`fullname${locale ? locale : "Zh"}`]}
                  </div>
                  <div
                    className={
                      styles.reservationPortfolioSearch__container_box__content
                    }
                  >
                    <div
                      className={
                        styles.reservationPortfolioSearch__container_box__content_profile
                      }
                    >
                      <div>
                        {data.type === "entity"
                          ? `${data?.[`description${locale}`].substring(
                              0,
                              40
                            )}... `
                          : data?.jobTitle}
                      </div>
                    </div>
                    {/* <div
                    className={
                      styles.reservationPortfolioSearch__container_box__content_share
                    }
                  >
                    <IoShareSocialOutline />
                  </div> */}
                  </div>
                  {data.companyCategoryTypeEn !== "None" && (
                    <div
                      className={
                        styles.reservationPortfolioSearch__container_box__tag
                      }
                    >
                      {data.entiryOverviewType === "Market" ? (
                        <span>
                          {" "}
                          {`${data[`companyCategoryType${locale}`]}`}
                        </span>
                      ) : (
                        <div
                          className={
                            styles.reservationPortfolioSearch__container_box__tag_container
                          }
                        >
                          {data.pitchingMainCategoryEn === "Taicca School" ? (
                            <span>{`${
                              data[`pitchingMainCategory${locale}`]
                            }`}</span>
                          ) : (
                            <span>
                              {data.type === "entity"
                                ? `${data[`pitchingMainCategory${locale}`]} | ${
                                    data[`pitchingCategory${locale}`]
                                  }`
                                : data?.roleName}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Link>
              ))
            ) : (
              <div
                className={styles.reservationPortfolioSearch__container_nodata}
              >
                <div
                  className={
                    styles.reservationPortfolioSearch__container_nodata__icon
                  }
                >
                  <LuSearchX />
                </div>
                No Results
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
