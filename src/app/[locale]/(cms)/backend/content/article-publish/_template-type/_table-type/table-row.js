import styles from "../../article-content.module.scss";
import { Input, ButtonInput } from "@/components/cms/input";
import { BsTrash3 } from "react-icons/bs";
import Textarea from "@/components/cms/textarea";
import { IoIosArrowDown } from "react-icons/io";
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
  const handleChange = (id, key, newValue) => {
    setRow(
      row.map((item) => (item.id === id ? { ...item, [key]: newValue } : item))
    );
  };

  return (
    <div
      className={styles.cmsArticleContent__container_increaseBlock}
      key={index}
    >
      <div
        className={styles.cmsArticleContent__container_increaseBlock__action}
      >
        <h4>內容 {index + 1}</h4>

        <div
          className={
            styles.cmsArticleContent__container_increaseBlock__action_icon
          }
          onClick={() => handleDeleteRow(data.id)}
        >
          <BsTrash3 />
        </div>
        <div
          className={
            styles.cmsArticleContent__container_increaseBlock__action_icon
          }
          onClick={() => handleToggleRow(data.id)}
        >
          <IoIosArrowDown
            style={{ transform: data.open ? "scaleY(-1) " : "scaleY(1)" }}
          />
        </div>
      </div>

      <div
        className={styles.cmsArticleContent__container_increaseBlock__content}
        style={{ gridTemplateRows: data.open ? "1fr " : "0fr" }}
      >
        <div
          className={
            styles.cmsArticleContent__container_increaseBlock__content_container
          }
        >
          {serial == "true" && (
            <div className={styles.cmsArticleContent__container_twoColumn}>
              <Input
                label={"編號內容"}
                elementId={`table_${tableKey}_row_${data.key}_serial${locale}`}
                state={
                  data[`table_${tableKey}_row_${data.key}_serial${locale}`]
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
                data[`table_${tableKey}_row_${data.key}_viewButton${locale}`]
              }
              valueState={
                data[
                  `table_${tableKey}_row_${data.key}_viewButtonValue${locale}`
                ]
              }
              id={data.id}
              onChangeFun={handleChange}
              placeholderElement={"請輸入按鈕文字"}
              placeholderValue={"請輸入按鈕連結"}
            />
          )}

          <div className={styles.cmsArticleContent__container_tableRow}>
            <Textarea
              label={"內容1"}
              elementId={`table_${tableKey}_row_${data.key}_1${locale}`}
              state={data[`table_${tableKey}_row_${data.key}_1${locale}`]}
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入內容1"}
            />
            <Textarea
              label={"內容2"}
              elementId={`table_${tableKey}_row_${data.key}_2${locale}`}
              state={data[`table_${tableKey}_row_${data.key}_2${locale}`]}
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入內容2"}
            />
            <Textarea
              label={"內容3"}
              elementId={`table_${tableKey}_row_${data.key}_3${locale}`}
              state={data[`table_${tableKey}_row_${data.key}_3${locale}`]}
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入內容3"}
            />
            <Textarea
              label={"內容4"}
              elementId={`table_${tableKey}_row_${data.key}_4${locale}`}
              state={data[`table_${tableKey}_row_${data.key}_4${locale}`]}
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入內容4"}
            />
            <Textarea
              label={"內容5"}
              elementId={`table_${tableKey}_row_${data.key}_5${locale}`}
              state={data[`table_${tableKey}_row_${data.key}_5${locale}`]}
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
