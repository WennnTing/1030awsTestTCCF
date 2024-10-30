import styles from "./list-type-template.module.scss";
import { FaRegStar } from "react-icons/fa";
import parse from "html-react-parser";
import Link from "next/link";
export default function ListBlock({ data, locale, index }) {
  const key = data[0].elementId.match(/^[^_]*_[^_]*_(.*)$/)[1];

  return (
    <div
      className={styles.listTypeTemplate__themeWrapper_container}
      key={index}
    >
      {/* 顯示主題 */}
      {data?.filter((item) => item.elementId === `block_theme_${key}`).length >
        0 && (
        <div className={styles.listTypeTemplate__themeWrapper_container__theme}>
          {
            data?.filter(
              (item) => item.elementId === `block_theme_${key}`
            )?.[0]?.[`fieldText${locale}`]
          }
        </div>
      )}

      {/* 標題 */}
      <div className={styles.listTypeTemplate__themeWrapper_container__title}>
        <div
          className={
            styles.listTypeTemplate__themeWrapper_container__title_icon
          }
        >
          <FaRegStar />
        </div>
        <div
          className={
            styles.listTypeTemplate__themeWrapper_container__title_text
          }
        >
          {
            data?.filter(
              (item) => item.elementId === `block_title_${key}`
            )?.[0]?.[`fieldText${locale}`]
          }
        </div>
      </div>
      {/* 副標題 */}
      <div
        className={styles.listTypeTemplate__themeWrapper_container__subTitle}
      >
        {
          data?.filter(
            (item) => item.elementId === `block_subTitle_${key}`
          )?.[0]?.[`fieldText${locale}`]
        }
      </div>
      {/* 上架內容 */}
      <div className={styles.listTypeTemplate__themeWrapper_container__content}>
        <div
          className={
            styles.listTypeTemplate__themeWrapper_container__content_text
          }
        >
          {parse(
            data?.filter(
              (item) => item.elementId === `block_content_${key}`
            )?.[0]?.[`fieldText${locale}`] ?? ""
          )}
        </div>

        {/* 顯示按鈕 */}
        {data?.filter((item) => item.elementId === `block_button_${key}`)
          .length > 0 && (
          <Link
            href={
              data?.filter(
                (item) => item.elementId === `block_button_${key}`
              )?.[0]?.fieldValue ?? ""
            }
            target="_blank"
          >
            {
              data?.filter(
                (item) => item.elementId === `block_button_${key}`
              )?.[0]?.[`fieldText${locale}`]
            }
          </Link>
        )}
      </div>
    </div>
  );
}
