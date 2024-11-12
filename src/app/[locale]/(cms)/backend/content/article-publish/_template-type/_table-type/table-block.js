import styles from "../../article-content.module.scss";
import { Input, ButtonInput } from "@/components/cms/input";
import { BsTrash3 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import TableRow from "./table-row";
import { RxPlus } from "react-icons/rx";
import { Alert } from "@/components/cms/swal";
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
  const handleChange = (id, key, newValue) => {
    setTable(
      table.map((item) =>
        item.id === id ? { ...item, [key]: newValue } : item
      )
    );
  };

  // const [row, setRow] = useState([
  //   {
  //     id: 1,
  //     open: true,
  //     key: nanoid(),
  //   },
  // ]);

  // const handleToggleRow = (id) => {
  //   setRow((prev) =>
  //     prev.map((data) => {
  //       if (data.id === id) {
  //         return { ...data, open: !data.open };
  //       } else {
  //         return data;
  //       }
  //     })
  //   );
  // };

  // const handleIncreaseRow = () => {
  //   setRow((prev) =>
  //     prev.concat({
  //       id: prev[prev.length - 1].id + 1,
  //       open: true,
  //       key: nanoid(),
  //     })
  //   );
  // };

  // const handleDeleteRow = (id) => {
  //   if (row.length === 1) {
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
  //         setRow((prev) => prev.filter((data) => data.id !== id));
  //       }
  //     });
  //   }
  // };

  return (
    <div
      className={styles.cmsArticleContent__container_increaseBlock}
      key={index}
    >
      <div
        className={styles.cmsArticleContent__container_increaseBlock__action}
      >
        <h4>表格 {index + 1}</h4>
        <button
          className={styles.cmsArticleContent__container_increaseBlock__action_icon}
          style={{ border: "none", fontSize: "1rem" }}
          onClick={() => handleDeleteTable(data.id)}
          aria-label="Delete table"
        >
          <BsTrash3 />
        </button>

        <button
          className={styles.cmsArticleContent__container_increaseBlock__action_icon}
          style={{ border: "none", fontSize: "1rem" }}
          onClick={() => handleToggleTable(data.id)}
          aria-label={data.open ? "Collapse table" : "Expand table"}
        >
          <IoIosArrowDown
            style={{ transform: data.open ? "scaleY(-1)" : "scaleY(1)" }}
          />
        </button>


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
          <div className={styles.cmsArticleContent__container_twoColumn}>
            <Input
              label={"主題"}
              elementId={`table_${data.key}_theme${locale}`}
              state={data[`table_${data.key}_theme${locale}`]}
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入主題"}
            />
            <Input
              label={"備註"}
              elementId={`table_${data.key}_notice${locale}`}
              state={data[`table_${data.key}_notice${locale}`]}
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入備註"}
            />
          </div>

          <div
            className={
              styles.cmsArticleContent__container_increaseBlockContainer
            }
          >
            {row.map((item, index) => (
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
                key={data.id}
                locale={locale}
              />
            ))}

            <button
              className={styles.cmsArticleContent__container_increase}
              onClick={handleIncreaseRow}
              aria-label="增加欄位"
              style={{ border: "none", fontSize: "1rem" }}
            >
              <div className={styles.cmsArticleContent__container_increase__icon}>
                <RxPlus />
              </div>
              <span>增加欄位</span>
            </button>


          </div>

          {/* <div className={styles.cmsArticleContent__container_twoColumn}>
            <Input label={"內容1"} />
            <Input label={"內容2"} />
            <Input label={"內容3"} />
            <Input label={"內容4"} />
            <Input label={"內容5"} />
          </div> */}
        </div>
      </div>
    </div>
  );
}
