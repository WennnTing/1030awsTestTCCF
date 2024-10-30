import styles from "./announcement-type-template.module.scss";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { useRouter } from "../../../../navigation";
import { FiFileText } from "react-icons/fi";
import { getPageByID } from "@/actions/pages";

export default function AnnouncementCard({ data, locale, index }) {
  const router = useRouter();

  const handleNavigate = (functionType, link) => {
    if (functionType === "article") {
      getPageByID(link).then((res) => {
        const routerName = res?.data?.routerName;
        router.push(`/${routerName}`);
      });
    }
    return;
  };

  return (
    // 取得卡片路路徑
    // 確認卡片的功能是文章導頁 或是 下載檔案
    <div className={styles.announcementTypeTemplate__cardWrapper_container}>
      {data?.function === "link" && (
        <div
          className={
            styles.announcementTypeTemplate__cardWrapper_container__serial
          }
        >
          {(index + 1).toString().padStart(2, "0")}
        </div>
      )}

      <div
        href={data?.function === "article" ? "/home" : ""}
        onClick={() => handleNavigate(data.function, data.article?.fieldValue)}
        className={styles.announcementTypeTemplate__cardWrapper_card}
        key={index}
        style={{
          backgroundImage:
            data.function === "link"
              ? data.image.fieldValue
                ? data.image.fieldValue
                : `url(/images/background.png)`
              : "none",
          backgroundSize: "cover",
          border: data.function === "article" ? "1px solid #F8F9FAFF" : "none",
        }}
      >
        {data.function === "link" && (
          <div
            className={styles.announcementTypeTemplate__cardWrapper_card__icon}
          >
            <FiFileText />
          </div>
        )}

        {data.function === "article" && (
          <div
            className={styles.announcementTypeTemplate__cardWrapper_card__image}
          >
            <img src={data.image.url} />
          </div>
        )}

        <div
          className={styles.announcementTypeTemplate__cardWrapper_card__content}
        >
          {/* 文章名稱 */}
          <div
            className={
              styles.announcementTypeTemplate__cardWrapper_card__content_title
            }
            style={{
              textAlign: data?.function === "link" ? "center" : "left",
            }}
          >
            {data?.title?.[`fieldText${locale}`]}
          </div>

          {/* 是否顯示地點 */}
          {data?.location?.fieldValue == "true" && (
            <div
              className={
                styles.announcementTypeTemplate__cardWrapper_card__content_info
              }
            >
              <div
                className={
                  styles.announcementTypeTemplate__cardWrapper_card__content_info__icon
                }
              >
                <IoLocationOutline />
              </div>
              <div
                className={
                  styles.announcementTypeTemplate__cardWrapper_card__content_info__text
                }
              >
                {data?.location?.[`fieldText${locale}`]}
              </div>
            </div>
          )}

          {/* 功能為進入文章才顯示Tag */}
          {data.function === "article" && data?.tag?.[`fieldText${locale}`] && (
            <span
              className={
                styles.announcementTypeTemplate__cardWrapper_card__content_tag
              }
            >
              # {data?.tag?.[`fieldText${locale}`]}
            </span>
          )}
        </div>
        {data.button?.fieldValue && (
          <div
            className={
              styles.announcementTypeTemplate__cardWrapper_card__button
            }
          >
            <Link href={data.button?.fieldValue ?? ""}>
              {data.button?.[`fieldText${locale}`]}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
