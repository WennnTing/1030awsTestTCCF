import styles from "../../[uuid]/article-content.module.scss";
import { Input, ButtonInput } from "@/components/cms/input";
import { BsTrash3 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { localeToUpperCase } from "@/utils";
import { RxPlus } from "react-icons/rx";
import { Alert } from "@/components/cms/swal";
import TableRow from "./table-row";
import { nanoid } from "nanoid";

export default function TableBlock({
  data,
  index,
  table,
  setTable,
  handleDeleteTable,
  handleToggleTable,
  viewButton,
  serial,
  locale,

  row,
  setRow,
  handleDeleteRow,
  handleToggleRow,
  handleIncreaseRow,
}) {
  console.log(row);

  const localeStr = locale ? locale.split("_")[1] : "Zh";

  const handleChange = (id, key, newValue) => {
    setTable(
      table.map((item) =>
        item.id === id
          ? {
              ...item,
              [key.replace(/_En$/, "")]: [
                {
                  ...item[key.replace(/_En$/, "")]?.[0],
                  [`fieldText${locale ? locale.split("_")[1] : "Zh"}`]:
                    newValue,
                },
              ],
            }
          : item
      )
    );
  };

  // const rowData = Object.entries(data)
  //   .filter(([key, value]) => key.includes("row_"))
  //   ?.reduce((acc, item) => {
  //     const match = item[0].match(/row_([^_]+)_/);
  //     if (match) {
  //       const key = match[1];
  //       if (!acc[key]) {
  //         acc[key] = [];
  //       }
  //       acc[key].push(item);
  //     }
  //     return acc;
  //   }, {});

  // const rowDataArray = Object.values(rowData || {});

  // const [row, setRow] = useState([
  //   rowDataArray.length > 0
  //     ? rowDataArray.map((item, index) =>
  //         item.reduce((acc, [key, value]) => {
  //           acc[key] = value;
  //           return {
  //             ...acc,
  //             ...{
  //               open: true,
  //               id: index + 1,
  //               key: key.match(/row_(.*)_.*$/)[1],
  //             },
  //           };
  //         }, {})
  //       )
  //     : [{ id: 1, open: true, key: nanoid() }],
  // ]);

  // const handleToggleRow = (id) => {
  //   setRow((prev) =>
  //     prev.map((item) => {
  //       return item.map((data) => {
  //         if (data.id === id) {
  //           return { ...data, open: !data.open };
  //         } else {
  //           return data;
  //         }
  //       });
  //     })
  //   );
  // };

  // const handleIncreaseRow = () => {
  //   setRow((prev) =>
  //     prev.map((item) =>
  //       item.concat({
  //         id: item[item?.length - 1]?.id + 1,
  //         open: true,
  //         key: nanoid(),
  //       })
  //     )
  //   );
  // };

  // const handleDeleteRow = (id) => {
  //   if (row?.[0].length === 1) {
  //     Alert({
  //       icon: "error",
  //       title: "刪除失敗",
  //       text: "表格至少需有一筆資料",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     });
  //   } else {
  //     Alert({
  //       icon: "warning",
  //       title: "確定刪除此區塊？",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setRow((prev) =>
  //           prev.map((item) => item.filter((data) => data.id !== id))
  //         );
  //       }
  //     });
  //   }
  // };

  return (
    <div
      className={styles.cmsUpdateArticleContent__container_increase__block}
      key={`block-${data.id}-${locale}-${index}`}
    >
      <div
        className={
          styles.cmsUpdateArticleContent__container_increase__block_action
        }
      >
        <h4>表格 {index + 1}</h4>

        <div
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={() => handleDeleteTable(data.id)}
        >
          <BsTrash3 />
        </div>
        <div
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={() => handleToggleTable(data.id)}
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
          <div className={styles.cmsUpdateArticleContent__container_twoColumn}>
            <Input
              label={"主題"}
              elementId={`table_${data.key}_theme${locale}`}
              state={
                data[`table_${data.key}_theme`]?.[0]?.[`fieldText${localeStr}`]
              }
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入主題"}
            />
            <Input
              label={"備註"}
              elementId={`table_${data.key}_notice${locale}`}
              state={
                data[`table_${data.key}_notice`]?.[0]?.[`fieldText${localeStr}`]
              }
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入備註"}
            />
          </div>

          <div className={styles.cmsUpdateArticleContent__container_increase}>
            {row?.[0]
              ?.filter(
                (item) =>
                  Object.keys(item).some((key) => {
                    const match = key.match(/table_(.*?)_row/);
                    return match && match[1] === data.key;
                  }) || item.tableKey === data.key
              )
              ?.map((item, index) => (
                <TableRow
                  data={item}
                  index={index}
                  row={row}
                  setRow={setRow}
                  tableKey={data.key}
                  viewButton={viewButton}
                  serial={serial}
                  handleDeleteRow={handleDeleteRow}
                  handleToggleRow={handleToggleRow}
                  key={`row-${data.id}-${locale}-${index}`}
                  locale={locale}
                />
              ))}
            <div
              className={
                styles.cmsUpdateArticleContent__container_increaseButton
              }
              onClick={() => handleIncreaseRow(data.key)}
            >
              <div
                className={
                  styles.cmsUpdateArticleContent__container_increaseButton__icon
                }
              >
                <RxPlus />
              </div>
              <span>增加欄位</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
