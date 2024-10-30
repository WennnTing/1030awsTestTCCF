import styles from "./list-type-template.module.scss";
import Link from "next/link";
import ListBlock from "./list-block";
import parse from "html-react-parser";
export default function ListTypeTemplate({ contentData, locale }) {
  const data = contentData;

  console.log(data);

  const themeData = data
    ?.filter((item) => item.elementId.includes("block_"))
    ?.reduce((acc, item) => {
      const match = item.elementId.match(/^[^_]*_[^_]*_(.*)$/);
      if (match) {
        const key = match[1];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
      }
      return acc;
    }, {});

  const themeDataArray = Object.values(themeData || {});

  return (
    <div className={styles.listTypeTemplate}>
      <h1 className={styles.listTypeTemplate__title}>
        {
          data?.filter((item) => item.elementId === "title")?.[0]?.[
            `fieldText${locale}`
          ]
        }
      </h1>
      <div className={styles.listTypeTemplate__content}>
        {parse(
          data?.filter((item) => item.elementId === "content")?.[0]?.[
            `fieldText${locale}`
          ] ?? ""
        )}
      </div>

      {/* 條列內容 */}
      <div className={styles.listTypeTemplate__themeWrapper}>
        {themeDataArray.map((data, index) => (
          <ListBlock data={data} locale={locale} index={index} key={data.id} />
        ))}
      </div>

      <div className={styles.listTypeTemplate__buttonWrapper}>
        {/* 左邊按鈕 */}
        {data?.filter((item) => item.elementId === "leftFooterButton").length >
          0 && (
          <Link
            href={
              data?.filter((item) => item.elementId === "leftFooterButton")[0]
                .fieldValue ?? ""
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
        {/* 右邊按鈕 */}
        {data?.filter((item) => item.elementId === "rightFooterButton").length >
          0 && (
          <Link
            href={
              data?.filter((item) => item.elementId === "rightFooterButton")[0]
                .fieldValue ?? ""
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
