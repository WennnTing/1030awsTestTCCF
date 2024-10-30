"use client";
import { useEffect, useState } from "react";
import styles from "./activity-search.module.scss";
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
import moment from "moment";
import { useTranslations } from "next-intl";
import { searchActivities } from "@/actions/activities";

export default function ActivitySearch({ activites }) {
  const t = useTranslations("Activity.Info");
  const placeholderText = useTranslations("Reservation.Activity.Search");

  const [state, formAction] = useFormState(searchActivities, {});

  const pathname = usePathname();

  const locale = useLocale() === "en" ? "En" : "";
  const optionLocale = useLocale() === "en" ? "en" : "zh";

  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(true);

  const [search, setSearch] = useState("");
  const [activity, setActivity] = useState(activites.data);
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
  //       setActivity(activites);
  //     } else {
  //       setOpen(false);
  //       setActivity(
  //         activites?.data?.filter(
  //           (item) =>
  //             item.activityName.includes(search) ||
  //             item.activityNameEn.includes(search)
  //         )
  //       );
  //     }
  //   }
  // }, [search, isComposing, activites]);

  useEffect(() => {
    if (typeof state === "object" && !Array.isArray(state)) {
      setActivity(activites.data);
    } else {
      setActivity(state);
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
          zh: "地點",
          en: "Locatin",
        },
      ],
      isOpen: true,
      fields: [
        {
          title: [
            {
              zh: "展證",
              en: "Badge",
            },
          ],
          options: [
            { label_zh: "主舞台", label_en: "Main Stage" },
            { label_zh: "沙龍舞台", label_en: "Salon Stage" },
            { label_zh: "提案舞台", label_en: "Pitching Stage" },
          ],
        },
      ],
    },
  ]);

  const [formKey, setFormKey] = useState(0);
  const handleReset = () => {
    setFormKey((key) => key + 1);
    // setOpen(false);
    setActivity(activites.data);
  };

  const handleFilterSlide = (type) => {
    setsearchFilterData(
      searchFilterData.map((data) =>
        data?.type?.[0]?.en === type ? { ...data, isOpen: !data.isOpen } : data
      )
    );
  };

  return (
    <>
      <div
        className={styles.reservationActivitySearchBtn}
        onClick={() => setSlide(!slide)}
      >
        <HiOutlineMenuAlt2 />
      </div>

      <div
        className={styles.reservationActivitySearch}
        style={{
          width: slide ? sildeWidth : "0",
          opacity: slide ? "1" : "0",
        }}
      >
        <form key={formKey} action={formAction}>
          <div className={styles.reservationActivitySearch__search}>
            <div className={styles.reservationActivitySearch__search_container}>
              <div
                className={styles.reservationActivitySearch__search_filter}
                onClick={() => setSlide(!slide)}
              >
                <HiChevronDoubleLeft />
              </div>
              <input
                type="text"
                placeholder={placeholderText("placeholder")}
                onChange={(e) => setSearch(e.target.value.trim())}
                className={styles.reservationActivitySearch__search_input}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                name="SearchText"
              />

              <div
                className={styles.reservationActivitySearch__search_filter}
                onClick={() => setOpen(!open)}
                // style={{
                //   background: open ? "rgba(81, 186, 151, 0.1)" : "#f8f9fa",
                //   color: open ? "#51BA97" : "black",
                // }}
              >
                {open ? <LuFilterX /> : <LuFilter />}
              </div>

              <button
                className={styles.reservationActivitySearch__search_filter}
              >
                <LuSearch />
              </button>
            </div>
            <div className={styles.reservationActivitySearch__reset}>
              <div
                onClick={handleReset}
                className={styles.reservationActivitySearch__reset_button}
              >
                Clear All Filters
                <div
                  className={
                    styles.reservationActivitySearch__reset_button__icon
                  }
                >
                  <LuListRestart />
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.reservationActivitySearch__filter}
            style={{
              gridTemplateRows: open ? "1fr" : "0fr",
              maxHeight: open ? "300px" : "0",
            }}
          >
            <div className={styles.reservationActivitySearch__filter_container}>
              {/* <div
              className={
                styles.reservationActivitySearch__filter_container__mask
              }
            >
              <div
                className={
                  styles.reservationActivitySearch__filter_container__mask_icon
                }
              >
                <IoAlarmOutline />
              </div>
              Coming Soon
            </div> */}

              {searchFilterData.map((data) => (
                <ul
                  className={styles.reservationActivitySearch__filter_mainList}
                  key={data?.type?.[0]?.[optionLocale]}
                >
                  <li
                    className={
                      styles.reservationActivitySearch__filter_mainList__item
                    }
                  >
                    <div
                      className={
                        styles.reservationActivitySearch__filter_mainList__item_title
                      }
                      onClick={() => handleFilterSlide(data?.type?.[0]?.en)}
                    >
                      <div
                        className={
                          styles.reservationActivitySearch__filter_mainList__item_title__text
                        }
                      >
                        {data?.type?.[0]?.[optionLocale]}
                      </div>

                      <div
                        className={
                          styles.reservationActivitySearch__filter_mainList__item_title__icon
                        }
                        style={{
                          transform: data.isOpen ? "scaleY(-1) " : "scaleY(1)",
                        }}
                      >
                        <IoIosArrowDown />
                      </div>
                    </div>

                    <div
                      className={styles.reservationActivitySearch__filter_slide}
                      style={{ gridTemplateRows: data.isOpen ? "1fr" : "0fr" }}
                    >
                      <div
                        className={
                          styles.reservationActivitySearch__filter_slide__container
                        }
                      >
                        {data.fields.map((field, index) => (
                          <ul
                            className={
                              styles.reservationActivitySearch__filter_mainList__item__subList
                            }
                            key={index}
                          >
                            <li
                              className={
                                styles.reservationActivitySearch__filter_mainList__item__subList_item
                              }
                            >
                              {/* <div
                                className={
                                  styles.reservationActivitySearch__filter_mainList__item__subList_item__title
                                }
                              >
                                {field.title[0][optionLocale]}
                              </div> */}
                              <div
                                className={
                                  styles.reservationActivitySearch__filter_mainList__item__subList_item__optionList
                                }
                              >
                                {field?.options?.map((option, index) => (
                                  <div key={index}>
                                    <input
                                      type="checkbox"
                                      id={`${field.title[0][optionLocale]}_${
                                        option[`label_${optionLocale}`]
                                      }`}
                                      name={"location"}
                                      value={option[`label_${optionLocale}`]}
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
                                    styles.reservationActivitySearch__filter_mainList__item__thirdList
                                  }
                                  key={index}
                                >
                                  <li
                                    className={
                                      styles.reservationActivitySearch__filter_mainList__item__subList_item
                                    }
                                  >
                                    <div
                                      className={
                                        styles.reservationActivitySearch__filter_mainList__item__subList_item__subTitle
                                      }
                                    >
                                      {subgroup.title[0][optionLocale]}
                                    </div>
                                    <div
                                      className={
                                        styles.reservationActivitySearch__filter_mainList__item__subList_item__optionList
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
          <div className={styles.reservationActivitySearch__container}>
            {activity?.length > 0 ? (
              activity.map((data, index) => (
                <Link
                  key={index}
                  className={
                    pathname.split("/")[3] == data.activityId
                      ? `${styles.reservationActivitySearch__container_box} ${styles.active}`
                      : `${styles.reservationActivitySearch__container_box}`
                  }
                  href={`/exhibition/activities/${data.activityId}`}
                >
                  <div
                    className={
                      styles.reservationActivitySearch__container_box__title
                    }
                  >
                    {data?.[`activityName${locale}`]}
                  </div>
                  <div
                    className={
                      styles.reservationActivitySearch__container_box__content
                    }
                  >
                    <div
                      className={
                        styles.reservationActivitySearch__container_box__content_profile
                      }
                    >
                      {t("eventTime")}
                    </div>
                    <div
                      className={
                        styles.reservationActivitySearch__container_box__content_text
                      }
                    >
                      {`${moment(data?.activityStartTime).format(
                        "YYYY-MM-DD HH:mm"
                      )} -`}
                      <br></br>
                      {`${moment(data?.activityEndTime).format(
                        "YYYY-MM-DD HH:mm"
                      )}`}
                    </div>
                  </div>
                  <div
                    className={
                      styles.reservationActivitySearch__container_box__content
                    }
                  >
                    <div
                      className={
                        styles.reservationActivitySearch__container_box__content_profile
                      }
                    >
                      {t("registrationPeriod")}
                    </div>
                    <div
                      className={
                        styles.reservationActivitySearch__container_box__content_text
                      }
                    >
                      {`${data?.registrationStartDate} - ${data?.registrationEndDate}`}
                    </div>
                  </div>

                  <div
                    className={
                      styles.reservationActivitySearch__container_box__content
                    }
                  >
                    <div
                      className={
                        styles.reservationActivitySearch__container_box__content_profile
                      }
                    >
                      {t("location")}
                    </div>
                    <div
                      className={
                        styles.reservationActivitySearch__container_box__content_text
                      }
                    >
                      {data?.[`location${locale}`]}
                    </div>
                  </div>

                  <div
                    className={
                      styles.reservationActivitySearch__container_box__content
                    }
                  >
                    <div
                      className={
                        styles.reservationActivitySearch__container_box__content_profile
                      }
                    >
                      {t("totalSpots")}
                    </div>
                    <div
                      className={
                        styles.reservationActivitySearch__container_box__content_text
                      }
                    >
                      {data.maxParticipants}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div
                className={styles.reservationActivitySearch__container_nodata}
              >
                <div
                  className={
                    styles.reservationActivitySearch__container_nodata__icon
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
