import styles from "./general-type-template.module.scss";
import parse from "html-react-parser";
import Link from "next/link";
import moment from "moment";

export default function GeneralTypeTemplate({ contentData, locale, pageInfo }) {
  const data = contentData;

  return (
    <div className={styles.generalTypeTemplate}>
      {/* 是否顯示標題 */}
      {data?.filter((item) => item.elementId === "displayTitle")?.[0]
        ?.fieldValue == "true" && (
        <h1 className={styles.generalTypeTemplate__title}>
          {
            data?.filter((item) => item.elementId === "title")[0][
              `fieldText${locale}`
            ]
          }
        </h1>
      )}
      {/* 是否顯示時間*/}
      {data?.filter((item) => item.elementId === "displayTime")?.[0]
        ?.fieldValue == "true" && (
        <span className={styles.generalTypeTemplate__time}>
          {moment(pageInfo.publishDate).format("YYYY.MM.DD")}
        </span>
      )}

      {/* 上架內容 */}
      <div className={styles.generalTypeTemplate__content}>
        {parse(
          data?.filter((item) => item.elementId === "content")?.[0]?.[
            `fieldText${locale}`
          ] ?? ""
        )}
      </div>

      {/* 下方按鈕 */}
      <div className={styles.generalTypeTemplate__buttonWrapper}>
        {/* 是否顯示左邊按鈕 */}
        {data?.filter((item) => item.elementId === "leftFooterButton").length >
          0 && (
          <Link
            href={
              data?.filter((item) => item.elementId === "leftFooterButton")[0]
                .fieldValue
            }
            target="_blank"
          >
            {
              data?.filter((item) => item.elementId === "leftFooterButton")[0][
                `fieldText${locale}`
              ]
            }
          </Link>
        )}

        {/* 是否顯示右邊按鈕 */}
        {data?.filter((item) => item.elementId === "rightFooterButton").length >
          0 && (
          <Link
            href={
              data?.filter((item) => item.elementId === "rightFooterButton")[0]
                .fieldValue
            }
            target="_blank"
          >
            {
              data?.filter((item) => item.elementId === "rightFooterButton")[0][
                `fieldText${locale}`
              ]
            }
          </Link>
        )}
      </div>
    </div>
  );
}
