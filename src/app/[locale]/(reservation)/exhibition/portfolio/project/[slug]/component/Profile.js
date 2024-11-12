import styles from "../pitching.module.scss";
import { useLocale, useTranslations } from "next-intl";


const StoryToScreen = ({ data, locale, jobTitleKey, contactPersonKey }) => {
  // 判斷 pitchingCategoryEn
  const category_publications = [
    "Fiction & Non-fiction",
    "Comics",
    "Shoot the Book! TCCF",
    "Fiction & Non-Fiction",
    "Comic",
  ];
  const category_original = ["Original Story Concept"];

  const isPublications = category_publications.includes(
    data.pitchingCategoryEn
  );
  const isOriginal = category_original.includes(data.pitchingCategoryEn);

  const t = useTranslations(
    `Reservation.Portfolios.ProjectPage.${isPublications ? "StoryToScreen_publications" : "StoryToScreen_original"
    }`
  );

  return (
    <>
      {isOriginal && (
        <div className={styles.reservationPitiching__profile_info}>
          <div className={styles.reservationPitiching__profile_info__container}>
            {/* 國家 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("country")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_text}
              >
                {data?.[`country${locale}`]}
              </div>
            </div>
            {/* 期待開發形式 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("formats")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_text}
              >
                {data?.[`formats${locale}`]}
              </div>
            </div>
          </div>

          <div className={styles.reservationPitiching__profile_info__container}>
            {/* 聯絡窗口職稱和姓名 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("concactPersonAndJobTitle")}
              </div>
              <div className={styles.reservationPitiching__profile_info__item_text}>
                {`${data?.[jobTitleKey] || ""} ${data?.[contactPersonKey] || ""}`}
              </div>
            </div>

            {/* 聯絡窗口信箱 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("emailAddress")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_text}
              >
                {data?.contactEmail}
              </div>
            </div>
          </div>
        </div>
      )}

      {isPublications && (
        <div className={styles.reservationPitiching__profile_info}>
          <div className={styles.reservationPitiching__profile_info__container}>
            {/* 國家 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("country")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_text}
              >
                {data?.[`country${locale}`]}
              </div>
            </div>
            {/* 首刷出版年份 / 發表年份 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("yearOfFirstPublicationOrRelease")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_text}
              >
                {data?.yearOfFirstPublicationRelease}
              </div>
            </div>
            {/* 類型 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("genre")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_tag}
              >
                {data?.[`genre${locale}`]?.split(",").map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            {/* 作品體裁 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("type")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_tag}
              >
                {data?.[`type${locale}`]?.split(",").map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            {/* 作品主題 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("theme")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_tag}
              >
                {data?.[`theme${locale}`]
                  ?.split(locale === "En" ? "," : "、")
                  .map((item) => (
                    <span key={item}>{item}</span>
                  ))}
              </div>
            </div>
          </div>

          <div className={styles.reservationPitiching__profile_info__container}>
            {/* 聯絡窗口職稱和姓名 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {t("concactPersonAndJobTitle")}
              </div>
              <div className={styles.reservationPitiching__profile_info__item_text}>
                {`${data?.[jobTitleKey] || ""} ${data?.[contactPersonKey] || ""}`}
              </div>
            </div>

            {/* 聯絡窗口信箱 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {/* <PiDotsThreeCircleLight /> */}
                {t("emailAddress")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_text}
              >
                {data?.contactEmail}
              </div>
            </div>
            {/* 作品著作權交易情形 */}
            <div className={styles.reservationPitiching__profile_info__item}>
              <div
                className={styles.reservationPitiching__profile_info__item_icon}
              >
                {/* <PiDotsThreeCircleLight /> */}
                {t("rightsSold")}
              </div>
              <div
                className={styles.reservationPitiching__profile_info__item_text}
              >
                {data?.[`rightsSold${locale}`]}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ProjectToScreen = ({ data, locale, jobTitleKey, contactPersonKey }) => {
  const t = useTranslations(
    "Reservation.Portfolios.ProjectPage.ProjectToScreen"
  );

  const t_unit = useTranslations("Reservation.Portfolios.ProjectPage.Unit");

  return (
    <div className={styles.reservationPitiching__profile_info}>
      <div className={styles.reservationPitiching__profile_info__container}>
        {/* 國家 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("country")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.[`country${locale}`]}
          </div>
        </div>
        {/* 發展階段  */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("projectStatus")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.[`projectStatus${locale}`]}
          </div>
        </div>
        {/* 總集數 單集長度 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {data?.pitchingCategoryEn === "Film"
              ? t("duration")
              : t("numberOfEpisodes") + " / " + t("duration")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.pitchingCategoryEn === "Film"
              ? `${data?.duration} ${t_unit("min")}`
              : `${data?.duration} ${t_unit("min")} / ${data?.numberOfEpisodes
              } ${t_unit("episodes")}`}
          </div>
        </div>

        {/* 原創／改編作品 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          {/* <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("originalIdeaAndAdaptation")}
          </div> */}
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.[`originalIdeaAdaptation${locale}`]}
          </div>
        </div>

        {/* 類型   */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {/* <PiDotsThreeCircleLight /> */}
            {t("genre")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_tag}>
            {data?.[`genre${locale}`]?.split(",").map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.reservationPitiching__profile_info__container}>
        {/* 製作金額 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("totalBudget")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.totalBudgetUsd}
          </div>
        </div>
        {/* 已募資金*/}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("financingAlreadyInPlace")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.financingAlreadyInPlaceUsd}
          </div>
        </div>

        {/* 聯絡窗口職稱和姓名 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("concactPersonAndJobTitle")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {`${data?.[jobTitleKey] || ""} ${data?.[contactPersonKey] || ""}`}
          </div>
        </div>

        {/* 聯絡窗口信箱 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {/* <PiDotsThreeCircleLight /> */}
            {t("emailAddress")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.contactEmail}
          </div>
        </div>
        {/* 參與目標 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {/* <RiFocus3Line /> */}
            {t("goalAtTccf")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_tag}>
            {data?.[`goalAtTccf${locale}`]?.split(",").map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TaiccaSchool = ({ data, locale, jobTitleKey, contactPersonKey }) => {
  const t = useTranslations("Reservation.Portfolios.ProjectPage.TaiccaSchool");
  const t_unit = useTranslations("Reservation.Portfolios.ProjectPage.Unit");
  return (
    <div className={styles.reservationPitiching__profile_info}>
      <div className={styles.reservationPitiching__profile_info__container}>
        {/* 國家 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("country")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.[`country${locale}`]}
          </div>
        </div>
        {/* 發展階段  */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("projectStatus")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.[`projectStatus${locale}`]}
          </div>
        </div>
        {/* 總集數 單集長度 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {data?.pitchingCategoryEn === "Film"
              ? t("duration")
              : t("numberOfEpisodes") + " / " + t("duration")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.pitchingCategoryEn === "Film"
              ? `${data?.duration?.split(" ")[0]} ${t_unit("min")}`
              : `${data?.duration?.split(" ")[0]} ${t_unit("min")} / ${data?.numberOfEpisodes?.split(" ")[0]
              } ${t_unit("episodes")}`}
          </div>
        </div>

        {/* 原創／改編作品 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("originalIdeaAndAdaptation")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.[`originalIdeaAdaptation${locale}`]}
          </div>
        </div>

        {/* 類型   */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {/* <PiDotsThreeCircleLight /> */}
            {t("genre")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_tag}>
            {data?.[`genre${locale}`]?.split(",").map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.reservationPitiching__profile_info__container}>
        {/* 製作金額 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("totalBudget")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.totalBudgetUsd}
          </div>
        </div>
        {/* 已募資金*/}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("financingAlreadyInPlace")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.financingAlreadyInPlaceUsd}
          </div>
        </div>

        {/* 聯絡窗口職稱和姓名 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {t("concactPersonAndJobTitle")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {`${data?.[jobTitleKey] || ""} ${data?.[contactPersonKey] || ""}`}
          </div>
        </div>

        {/* 聯絡窗口信箱 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {/* <PiDotsThreeCircleLight /> */}
            {t("emailAddress")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_text}>
            {data?.contactEmail}
          </div>
        </div>
        {/* 參與目標 */}
        <div className={styles.reservationPitiching__profile_info__item}>
          <div className={styles.reservationPitiching__profile_info__item_icon}>
            {/* <RiFocus3Line /> */}
            {t("goalAtTccf")}
          </div>
          <div className={styles.reservationPitiching__profile_info__item_tag}>
            {data?.[`goalAtTccf${locale}`]?.split(",").map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Profile({ data }) {
  const locale = useLocale() === "en" ? "En" : "";

  const jobTitleKey = `jobTitle${locale}`;
  const contactPersonKey = `contactPerson${locale}`;

  return (() => {
    switch (data.pitchingMainCategoryEn) {
      case "Project to Screen":
        return <ProjectToScreen data={data} locale={locale} jobTitleKey={jobTitleKey} contactPersonKey={contactPersonKey} />;
      case "Story to Screen":
        return <StoryToScreen data={data} locale={locale} jobTitleKey={jobTitleKey} contactPersonKey={contactPersonKey} />;
      case "Taicca School":
        return <TaiccaSchool data={data} locale={locale} jobTitleKey={jobTitleKey} contactPersonKey={contactPersonKey} />;
    }
  })();
}