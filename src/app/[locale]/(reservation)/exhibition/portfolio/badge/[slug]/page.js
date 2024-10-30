import styles from "./badge.module.scss";
import { _getMemberDetails } from "@/actions/_member-details";
import { getTranslations } from "next-intl/server";
import { BsPersonVideo } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsBriefcase } from "react-icons/bs";
import { BsTags } from "react-icons/bs";

export default async function BadgePage({ params }) {
  const memberDetails = await _getMemberDetails(params.slug);
  const t = await getTranslations("Reservation.Portfolios.BadgePage");
  const locale = params.locale;
  const participationGoalsData = [
    {
      key: 0,
      value: [
        {
          zh: "籌募資金",
          en: "Financing",
        },
      ],
    },
    {
      key: 1,
      value: [
        {
          zh: "版權交易",
          en: "Copyright Transactions",
        },
      ],
    },
    {
      key: 2,
      value: [
        {
          zh: "聯合監製",
          en: "Co-Production",
        },
      ],
    },
    {
      key: 3,
      value: [
        {
          zh: "國際發行",
          en: "International Distribution",
        },
      ],
    },
    {
      key: 4,
      value: [
        {
          zh: "影展放映",
          en: "Festival Screening",
        },
      ],
    },
    {
      key: 5,
      value: [
        {
          zh: "開拓業務市場",
          en: "Business Development",
        },
      ],
    },
    {
      key: 6,
      value: [
        {
          zh: "瞭解市場及產業動態",
          en: "Insight into Market Trends & Industry Landscapes",
        },
      ],
    },
    {
      key: 7,
      value: [
        {
          zh: "機構服務內容推廣",
          en: "Promote Our Services",
        },
      ],
    },
    {
      key: 8,
      value: [
        {
          zh: "其他",
          en: "Others",
        },
      ],
    },
  ];

  return (
    <div className={styles.reservationBadge}>
      <div className={styles.reservationBadge__container}>
        <div className={styles.reservationBadge__container_banner}></div>
        <div className={styles.reservationBadge__container_content}>
          <div className={styles.reservationBadge__container_content__profile}>
            <div
              className={
                styles.reservationBadge__container_content__profile_item
              }
            >
              <div
                className={
                  styles.reservationBadge__container_content__profile_item__label
                }
              >
                <div
                  className={
                    styles.reservationBadge__container_content__profile_item__label_icon
                  }
                >
                  <BsPersonVideo />
                </div>
                {t("contactPerson")}
              </div>
              <div
                className={
                  styles.reservationBadge__container_content__profile_item__value
                }
              >
                {
                  memberDetails?.data?.[
                    `${locale === "zh" ? "fullnameZh" : "fullnameEn"}`
                  ]
                }
              </div>
            </div>
            <div
              className={
                styles.reservationBadge__container_content__profile_item
              }
            >
              <div
                className={
                  styles.reservationBadge__container_content__profile_item__label
                }
              >
                <div
                  className={
                    styles.reservationBadge__container_content__profile_item__label_icon
                  }
                >
                  <BsTelephone />
                </div>
                {t("contactNumber")}
              </div>
              <div
                className={
                  styles.reservationBadge__container_content__profile_item__value
                }
              >
                {memberDetails?.data?.mobilePhone}
              </div>
            </div>

            <div
              className={
                styles.reservationBadge__container_content__profile_item
              }
            >
              <div
                className={
                  styles.reservationBadge__container_content__profile_item__label
                }
              >
                <div
                  className={
                    styles.reservationBadge__container_content__profile_item__label_icon
                  }
                >
                  <BsBriefcase />
                </div>
                {t("jobTitle")}
              </div>
              <div
                className={
                  styles.reservationBadge__container_content__profile_item__value
                }
              >
                {memberDetails?.data?.jobTitle}
              </div>
            </div>

            <div
              className={
                styles.reservationBadge__container_content__profile_item
              }
            >
              <div
                className={
                  styles.reservationBadge__container_content__profile_item__label
                }
              >
                <div
                  className={
                    styles.reservationBadge__container_content__profile_item__label_icon
                  }
                >
                  <BsTags />
                </div>
                {t("participationGoal")}
              </div>
              <div
                className={
                  styles.reservationBadge__container_content__profile_item__value
                }
              >
                {memberDetails?.data?.participationGoals?.map((goal, index) => (
                  <span key={index}>
                    {
                      participationGoalsData.find((data) => data.key === goal)
                        ?.value?.[0]?.[locale]
                    }
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
