import styles from "../../[uuid]/article-content.module.scss";
import { Input, ButtonInput } from "@/components/cms/input";
import { BsTrash3 } from "react-icons/bs";
import Textarea from "@/components/cms/textarea";
import { IoIosArrowDown } from "react-icons/io";
import { localeToUpperCase } from "@/utils";
export default function TableRow({
  data,
  index,
  tableKey,
  row,
  setRow,
  handleDeleteRow,
  handleToggleRow,
  viewButton,
  serial,
  locale,
}) {
  const localeStr = locale ? locale.split("_")[1] : "Zh";
  const handleChange = (id, key, newValue) => {
    setRow(
      row.map((item) =>
        item.map((data) =>
          data.id === id
            ? {
                ...data,
                [key.replace(/_En$/, "")]: [
                  {
                    ...data[key.replace(/_En$/, "")]?.[0],
                    [`fieldText${locale ? locale.split("_")[1] : "Zh"}`]:
                      newValue,
                  },
                ],
              }
            : data
        )
      )
    );
  };

  return (
    <div
      className={styles.cmsUpdateArticleContent__container_increase__block}
      key={index}
    >
      <div
        className={
          styles.cmsUpdateArticleContent__container_increase__block_action
        }
      >
        <h4>欄位 {index + 1}</h4>

        <div
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={() => handleDeleteRow(data.id)}
        >
          <BsTrash3 />
        </div>
        <div
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={() => handleToggleRow(data.id)}
        >
          <IoIosArrowDown
            style={{ transform: data.open ? "scaleY(-1) " : "scaleY(1)" }}
          />
        </div>
      </div>

      <div
        className={
          styles.cmsUpdateArticleContent__container_increase__block_content
        }
        style={{ gridTemplateRows: data.open ? "1fr " : "0fr" }}
      >
        <div
          className={
            styles.cmsUpdateArticleContent__container_increase__block_content__container
          }
        >
          {serial == "true" && (
            <div
              className={styles.cmsUpdateArticleContent__container_twoColumn}
            >
              <Input
                label={"編號內容"}
                elementId={`table_${tableKey}_row_${data.key}_serial${locale}`}
                state={
                  data[`table_${tableKey}_row_${data.key}_serial`]?.[0]?.[
                    `fieldText${localeStr}`
                  ]
                }
                id={data.id}
                onChangeFun={handleChange}
                placeholder={"請輸入編號內容"}
              />
            </div>
          )}

          {viewButton == "true" && (
            <ButtonInput
              label={"檢視按鈕"}
              elementId={`table_${tableKey}_row_${data.key}_viewButton${locale}`}
              elementValueId={`table_${tableKey}_row_${data.key}_viewButtonValue${locale}`}
              state={
                data[`table_${tableKey}_row_${data.key}_viewButton`]?.[0]?.[
                  `fieldText${localeStr}`
                ]
              }
              valueState={
                data[`table_${tableKey}_row_${data.key}_viewButton`]?.[0]
                  ?.fieldValue
              }
              id={data.id}
              // onChangeFun={handleChange}
              placeholderElement={"請輸入按鈕文字"}
              placeholderValue={"請輸入按鈕連結"}
            />
          )}

          <div className={styles.cmsUpdateArticleContent__container_twoColumn}>
            <Textarea
              label={"內容1"}
              elementId={`table_${tableKey}_row_${data.key}_1${locale}`}
              state={
                data[`table_${tableKey}_row_${data.key}_1`]?.[0]?.[
                  `fieldText${localeStr}`
                ]
              }
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入內容1"}
            />
            <Textarea
              label={"內容2"}
              elementId={`table_${tableKey}_row_${data.key}_2${locale}`}
              state={
                data[`table_${tableKey}_row_${data.key}_2`]?.[0]?.[
                  `fieldText${localeStr}`
                ]
              }
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入內容2"}
            />
            <Textarea
              label={"內容3"}
              elementId={`table_${tableKey}_row_${data.key}_3${locale}`}
              state={
                data[`table_${tableKey}_row_${data.key}_3`]?.[0]?.[
                  `fieldText${localeStr}`
                ]
              }
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入內容3"}
            />
            <Textarea
              label={"內容4"}
              elementId={`table_${tableKey}_row_${data.key}_4${locale}`}
              state={
                data[`table_${tableKey}_row_${data.key}_4`]?.[0]?.[
                  `fieldText${localeStr}`
                ]
              }
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入內容4"}
            />
            <Textarea
              label={"內容5"}
              elementId={`table_${tableKey}_row_${data.key}_5${locale}`}
              state={
                data[`table_${tableKey}_row_${data.key}_5`]?.[0]?.[
                  `fieldText${localeStr}`
                ]
              }
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入內容5"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
