"use client";
import styles from "../pitching.module.scss";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const StoryToScreen = ({ data, locale, tabList, tabStatus, setTabStatus }) => {
  // 判斷 pitchingCategoryEn
  const category_publications = [
    "Fiction & Non-fiction",
    "Comic",
    "Shoot the Book! TCCF",
    "Fiction & Non-Fiction",
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
        <div>
          <div
            className={styles.reservationPitiching__intro_description__tabList}
          >
            {tabList.map((tab) => (
              <button
                key={tab.id}
                className={styles.reservationPitiching__intro_description__tabList_tab}
                style={{
                  borderBottom: tabStatus === tab.value ? "2px solid #171717" : "2px solid transparent",
                  color: tabStatus === tab.value ? "#171717" : "#6c6c6c",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer"
                }}
                onClick={() => setTabStatus(tab.value)}
              >
                {tab.name}
              </button>
            ))}

          </div>
          {tabStatus === "work" ? (
            <div className={styles.reservationPitiching__container_work}>
              <div
                className={styles.reservationPitiching__container_work__logline}
              >
                {data?.[`logline${locale}`]}
              </div>

              <div
                className={styles.reservationPitiching__container_work__section}
              >
                <h3>故事大綱</h3>
                <div
                  className={
                    styles.reservationPitiching__container_work__section_content
                  }
                >
                  {data?.[`synopsis${locale}`]}
                </div>
              </div>

              <div
                className={styles.reservationPitiching__container_work__section}
              >
                <h3>主要角色</h3>
                <div
                  className={
                    styles.reservationPitiching__container_work__section_content
                  }
                >
                  <ul>
                    {data?.projectCharacters.map((character, index) => (
                      <li key={index}>
                        {character?.[`characterName${locale}`]}
                        <div>
                          {character?.[`characterDescription${locale}`]}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={styles.reservationPitiching__container_work__section}
              >
                <h3>期望開發形式 </h3>
                <div
                  className={
                    styles.reservationPitiching__container_work__section_content
                  }
                >
                  {data?.[`formats${locale}`]}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.reservationPitiching__container_team}>
              {data?.projectCreators.map((creator, index) => (
                <div
                  key={index}
                  className={
                    styles.reservationPitiching__container_team__section
                  }
                >
                  <h3>
                    {creator?.[`creatorTitle${locale}`]}{" "}
                    {creator?.[`creatorName${locale}`]}
                  </h3>
                  <div
                    className={
                      styles.reservationPitiching__container_team__section_content
                    }
                  >
                    {creator?.[`creatorProfile${locale}`]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {isPublications && (
        <div>
          <div
            className={styles.reservationPitiching__intro_description__tabList}
          >
            {tabList.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={
                  styles.reservationPitiching__intro_description__tabList_tab
                }
                style={{
                  borderBottom:
                    tabStatus === tab.value
                      ? "2px solid #171717"
                      : "2px solid transparent",

                  color: tabStatus === tab.value ? "#171717" : "#6c6c6c",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer"
                }}
                onClick={() => setTabStatus(tab.value)}
              >
                {tab.name}
              </button>
            ))}

          </div>
          {tabStatus === "work" ? (
            <div className={styles.reservationPitiching__container_work}>
              <div
                className={styles.reservationPitiching__container_work__logline}
              >
                {data?.[`logline${locale}`]}
              </div>
              <div
                className={styles.reservationPitiching__container_work__section}
              >
                <h3>{t("backgroundSetting")}</h3>
                <div
                  className={
                    styles.reservationPitiching__container_work__section_content
                  }
                >
                  {data?.[`backgroundSetting${locale}`]}
                </div>
              </div>

              <div
                className={styles.reservationPitiching__container_work__section}
              >
                <h3>{t("synopsis")}</h3>
                <div
                  className={
                    styles.reservationPitiching__container_work__section_content
                  }
                >
                  {data?.[`synopsis${locale}`]}
                </div>
              </div>

              <div
                className={styles.reservationPitiching__container_work__section}
              >
                <h3>{t("characterDescription")}</h3>
                <div
                  className={
                    styles.reservationPitiching__container_work__section_content
                  }
                >
                  <ul>
                    {data?.projectCharacters.map((character, index) => (
                      <li key={index}>
                        {character?.[`characterName${locale}`]}
                        <div>
                          {character?.[`characterDescription${locale}`]}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={styles.reservationPitiching__container_work__section}
              >
                <h3>{t("whyAdaptThisStory")}</h3>
                <div
                  className={
                    styles.reservationPitiching__container_work__section_content
                  }
                >
                  {data?.[`whyAdaptThisStory${locale}`]}
                </div>
              </div>

              <div
                className={styles.reservationPitiching__container_work__section}
              >
                <h3>{t("comparableFilmAndTvWorks")}</h3>
                <div
                  className={
                    styles.reservationPitiching__container_work__section_content
                  }
                >
                  {data?.[`comparableFilmTvWorks${locale}`]}
                </div>
              </div>

              <div
                className={styles.reservationPitiching__container_work__section}
              >
                <h3>{t("awardsReceivedOrNumberOfCopiesSold")}</h3>
                <div
                  className={
                    styles.reservationPitiching__container_work__section_content
                  }
                >
                  {data?.[`awardsReceivedOrNumberOfCopiesSold${locale}`]}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.reservationPitiching__container_team}>
              {data?.projectCreators.map((creator, index) => (
                <div
                  key={index}
                  className={
                    styles.reservationPitiching__container_team__section
                  }
                >
                  <h3>
                    {creator?.[`creatorTitle${locale}`]}{" "}
                    {creator?.[`creatorName${locale}`]}
                  </h3>
                  <div
                    className={
                      styles.reservationPitiching__container_team__section_content
                    }
                  >
                    {creator?.[`creatorProfile${locale}`]}
                  </div>
                </div>
              ))}
              <div
                className={styles.reservationPitiching__container_team__section}
              >
                <h3>
                  {t("publisherName")} {data?.[`publisherName${locale}`]}
                </h3>

                <div
                  className={
                    styles.reservationPitiching__container_team__section_content
                  }
                >
                  {data?.[`publisherProfile${locale}`]}
                </div>
              </div>

              <div
                className={styles.reservationPitiching__container_team__section}
              >
                <h3>
                  {t("holderOfAudiovisualAdaptationRights")}{" "}
                  {data?.[`holderOfAudiovisualAdaptationRights${locale}`]}
                </h3>

                <div
                  className={
                    styles.reservationPitiching__container_team__section_content
                  }
                >
                  {data?.[`productionCompanyProfile${locale}`]}
                </div>
              </div>
              {data?.projectCompanies?.map((company, index) => (
                <div
                  key={index}
                  className={
                    styles.reservationPitiching__container_team__section
                  }
                >
                  <h3>{company?.[`productionCompanyName${locale}`]} </h3>
                  <div
                    className={
                      styles.reservationPitiching__container_team__section_content
                    }
                  >
                    {company?.[`productionCompanyProfile${locale}`]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const ProjectToScreen = ({
  data,
  locale,
  tabList,
  tabStatus,
  setTabStatus,
}) => {
  const t = useTranslations(
    "Reservation.Portfolios.ProjectPage.ProjectToScreen"
  );
  return (
    <div>
      <div className={styles.reservationPitiching__intro_description__tabList}>
        {tabList.map((tab) => (
          <button
            key={tab.id}
            className={styles.reservationPitiching__intro_description__tabList_tab}
            style={{
              borderBottom: tabStatus === tab.value ? "2px solid #171717" : "2px solid transparent",
              color: tabStatus === tab.value ? "#171717" : "#6c6c6c",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer"
            }}
            onClick={() => setTabStatus(tab.value)}
          >
            {tab.name}
          </button>
        ))}

      </div>
      {tabStatus === "work" ? (
        <div className={styles.reservationPitiching__container_work}>
          <div className={styles.reservationPitiching__container_work__logline}>
            {data?.[`logline${locale}`]}
          </div>

          <div className={styles.reservationPitiching__container_work__section}>
            <h3>{t("synopsis")}</h3>
            <div
              className={
                styles.reservationPitiching__container_work__section_content
              }
            >
              {data?.[`synopsis${locale}`]}
            </div>
          </div>

          <div className={styles.reservationPitiching__container_work__section}>
            <h3>{t("productionStatement")}</h3>
            <div
              className={
                styles.reservationPitiching__container_work__section_content
              }
            >
              {data?.[`productionStatement${locale}`]}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.reservationPitiching__container_team}>
          {data?.projectCreators.map((creator, index) => (
            <div
              key={index}
              className={styles.reservationPitiching__container_team__section}
            >
              <h3>
                {creator?.[`creatorTitle${locale}`]}{" "}
                {creator?.[`creatorName${locale}`]}
              </h3>
              <div
                className={
                  styles.reservationPitiching__container_team__section_content
                }
              >
                {creator?.[`creatorProfile${locale}`]}
              </div>
            </div>
          ))}

          {data?.projectCompanies?.map((company, index) => (
            <div
              key={index}
              className={styles.reservationPitiching__container_team__section}
            >
              <h3>{company?.[`productionCompanyName${locale}`]} </h3>
              <div
                className={
                  styles.reservationPitiching__container_team__section_content
                }
              >
                {company?.[`productionCompanyProfile${locale}`]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TaiccaSchool = ({ data, locale, tabList, tabStatus, setTabStatus }) => {
  const t = useTranslations("Reservation.Portfolios.ProjectPage.TaiccaSchool");
  return (
    <div>
      <div className={styles.reservationPitiching__intro_description__tabList}>
        {tabList.map((tab) => (
          <button
            key={tab.id}
            className={styles.reservationPitiching__intro_description__tabList_tab}
            style={{
              borderBottom: tabStatus === tab.value ? "2px solid #171717" : "2px solid transparent",
              color: tabStatus === tab.value ? "#171717" : "#6c6c6c",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer"
            }}
            onClick={() => setTabStatus(tab.value)}
          >
            {tab.name}
          </button>
        ))}

      </div>
      {tabStatus === "work" ? (
        <div className={styles.reservationPitiching__container_work}>
          <div className={styles.reservationPitiching__container_work__logline}>
            {data?.[`logline${locale}`]}
          </div>

          <div className={styles.reservationPitiching__container_work__section}>
            <h3>{t("synopsis")}</h3>
            <div
              className={
                styles.reservationPitiching__container_work__section_content
              }
            >
              {data?.[`synopsis${locale}`]}
            </div>
          </div>

          <div className={styles.reservationPitiching__container_work__section}>
            <h3>{t("creatorStatement")}</h3>
            <div
              className={
                styles.reservationPitiching__container_work__section_content
              }
            >
              {data?.[`productionStatement${locale}`]}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.reservationPitiching__container_team}>
          {data?.projectCreators.map((creator, index) => (
            <div
              key={index}
              className={styles.reservationPitiching__container_team__section}
            >
              <h3>
                {creator?.[`creatorTitle${locale}`]}{" "}
                {creator?.[`creatorName${locale}`]}
              </h3>
              <div
                className={
                  styles.reservationPitiching__container_team__section_content
                }
              >
                {creator?.[`creatorProfile${locale}`]}
              </div>
            </div>
          ))}
          {data?.projectCompanies?.map((company, index) => (
            <div
              key={index}
              className={styles.reservationPitiching__container_team__section}
            >
              <h3>{company?.[`productionCompanyName${locale}`]} </h3>
              <div
                className={
                  styles.reservationPitiching__container_team__section_content
                }
              >
                {company?.[`productionCompanyProfile${locale}`]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Introduction({ data }) {
  const locale = useLocale() === "en" ? "En" : "";
  const [tabStatus, setTabStatus] = useState("work");
  const t = useTranslations("Reservation.Portfolios.ProjectPage.Tab");

  const tabList = [
    {
      id: 1,
      value: "work",
      name: t("overview"),
    },
    {
      id: 2,
      value: "team",
      name: "主創成員簡介",
      name: t("crew"),
    },
  ];

  return (() => {
    switch (data.pitchingMainCategoryEn) {
      case "Project to Screen":
        return (
          <ProjectToScreen
            data={data}
            locale={locale}
            tabList={tabList}
            tabStatus={tabStatus}
            setTabStatus={setTabStatus}
          />
        );
      case "Story to Screen":
        return (
          <StoryToScreen
            data={data}
            locale={locale}
            tabList={tabList}
            tabStatus={tabStatus}
            setTabStatus={setTabStatus}
          />
        );
      case "Taicca School":
        return (
          <TaiccaSchool
            data={data}
            locale={locale}
            tabList={tabList}
            tabStatus={tabStatus}
            setTabStatus={setTabStatus}
          />
        );
      default:
        return <></>;
    }
  })();
}
