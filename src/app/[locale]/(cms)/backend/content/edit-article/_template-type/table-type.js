import { useState, useEffect } from "react";
import styles from "../[uuid]/article-content.module.scss";
import { RxPlus } from "react-icons/rx";
import { Alert } from "@/components/cms/swal";
import {
  ControllerInput,
  ControllerButtonInput,
  Input,
} from "@/components/cms/input";
import { ControllerRadioButton } from "@/components/cms/radio-button";
import TableBlock from "./_table-type/table-block";
import dynamic from "next/dynamic";
import { nanoid } from "nanoid";
const ControlEditor = dynamic(() => import("@/components/cms/control-editor"), {
  ssr: false,
});

const EnTemplate = ({
  locale,
  data,
  viewButton,
  setViewButton,
  serial,
  setSerial,
  table,
  setTable,
  handleDeleteTable,
  handleToggleTable,
  handleIncreaseTable,

  row,
  setRow,
  handleDeleteRow,
  handleToggleRow,
  handleIncreaseRow,
}) => {
  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextEn);
  const [editorContent, setEditorContent] = useState(
    data?.content?.[0]?.fieldTextEn
  );
  const [leftFooterButton, setLeftFooterButton] = useState(
    data?.leftFooterButton?.[0]?.fieldTextEn
  );
  const [leftFooterButtonValue, setLeftFooterButtonValue] = useState(
    data?.leftFooterButton?.[0]?.fieldValue
  );
  const [rightFooterButton, setRightFooterButton] = useState(
    data?.rightFooterButton?.[0]?.fieldTextEn
  );
  const [rightFooterButtonValue, setRightFooterButtonValue] = useState(
    data?.rightFooterButton?.[0]?.fieldValue
  );

  const [headerSerialValue, setHeaderSerialValue] = useState(
    data?.header_serial?.[0]?.fieldTextEn
  );
  const [headerViewValue, setHeaderViewValue] = useState(
    data?.header_view?.[0]?.fieldTextEn
  );

  return (
    <div
      style={{
        display: locale === "en" ? "" : "none",
      }}
    >
      <div className={styles.cmsUpdateArticleContent__container}>
        <ControllerInput
          label={"標題"}
          required={true}
          elementId={"titleEn"}
          value={title}
          onChangeFun={setTitle}
          placeholder={"請輸入標題"}
        />

        <ControlEditor
          elementId={"contentEn"}
          content={editorContent}
          setContent={setEditorContent}
        />
        <ControllerButtonInput
          label={"左頁尾按鈕"}
          elementId={"leftFooterButtonEn"}
          elementValueId={"leftFooterButtonValueEn"}
          elementIdState={leftFooterButton}
          elementValueIdState={leftFooterButtonValue}
          elementIdOnChangeFun={setLeftFooterButton}
          elementIdValueOnChangeFun={setLeftFooterButtonValue}
          placeholderElement={"請輸入按鈕文字"}
          placeholderValue={"請輸入按鈕連結"}
        />
        <ControllerButtonInput
          label={"右頁尾按鈕"}
          elementId={"rightFooterButtonEn"}
          elementValueId={"rightFooterButtonValueEn"}
          elementIdState={rightFooterButton}
          elementValueIdState={rightFooterButtonValue}
          elementIdOnChangeFun={setRightFooterButton}
          elementIdValueOnChangeFun={setRightFooterButtonValue}
          placeholderElement={"請輸入按鈕文字"}
          placeholderValue={"請輸入按鈕連結"}
        />
        <h3>版型設定</h3>
        <ControllerRadioButton
          elementId={"header_serialEn"}
          elementValueId={"header_serialValueEn"}
          label={"編號"}
          required={true}
          value={serial}
          onChangeFun={setSerial}
          inputValue={headerSerialValue}
          inputOnChangeFun={setHeaderSerialValue}
          input={true}
          maxlength={2}
          placeholder={"請輸入編號表頭名稱"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <ControllerRadioButton
          elementId={"header_viewEn"}
          elementValueId={"header_viewValueEn"}
          label={"檢視按鈕"}
          required={true}
          value={viewButton}
          onChangeFun={setViewButton}
          inputValue={headerViewValue}
          inputOnChangeFun={setHeaderViewValue}
          input={true}
          placeholder={"輸入檢視按鈕表頭名稱"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <div className={styles.cmsUpdateArticleContent__container_twoColumn}>
          <Input
            label={"表頭1"}
            elementId={"header_1_En"}
            placeholder={"請輸入表頭1"}
            defaultValue={data?.header_1?.[0]?.fieldTextEn}
          />
          <Input
            label={"表頭2"}
            elementId={"header_2_En"}
            placeholder={"請輸入表頭2"}
            defaultValue={data?.header_2?.[0]?.fieldTextEn}
          />
          <Input
            label={"表頭3"}
            elementId={"header_3_En"}
            placeholder={"請輸入表頭3"}
            defaultValue={data?.header_3?.[0]?.fieldTextEn}
          />
          <Input
            label={"表頭4"}
            elementId={"header_4_En"}
            placeholder={"請輸入表頭4"}
            defaultValue={data?.header_4?.[0]?.fieldTextEn}
          />
          <Input
            label={"表頭5"}
            elementId={"header_5_En"}
            placeholder={"請輸入表頭5"}
            defaultValue={data?.header_5?.[0]?.fieldTextEn}
          />
        </div>
        <div className={styles.cmsUpdateArticleContent__container_increase}>
          {table.map((data, index) => (
            <TableBlock
              data={data}
              index={index}
              table={table}
              setTable={setTable}
              handleDeleteTable={handleDeleteTable}
              handleToggleTable={handleToggleTable}
              editorContent={editorContent}
              setEditorContent={setEditorContent}
              locale={"_En"}
              key={`${data.id}_en`}
              viewButton={viewButton}
              serial={serial}
              row={row}
              setRow={setRow}
              handleDeleteRow={handleDeleteRow}
              handleToggleRow={handleToggleRow}
              handleIncreaseRow={handleIncreaseRow}
            />
          ))}
          <div
            className={styles.cmsUpdateArticleContent__container_increaseButton}
            onClick={handleIncreaseTable}
          >
            <div
              className={
                styles.cmsUpdateArticleContent__container_increaseButton__icon
              }
            >
              <RxPlus />
            </div>
            <span>增加表格</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ZhTemplate = ({
  locale,
  data,
  viewButton,
  setViewButton,
  serial,
  setSerial,
  table,
  setTable,
  handleDeleteTable,
  handleToggleTable,
  handleIncreaseTable,
  row,
  setRow,
  handleDeleteRow,
  handleToggleRow,
  handleIncreaseRow,
}) => {
  // const blockData = Object.entries(data)
  //   .filter(([key, value]) => key.includes("table_"))
  //   ?.reduce((acc, item) => {
  //     const match = item[0].match(/table_(\d+)/);
  //     if (match) {
  //       const key = `table_${match[1]}`;
  //       if (!acc[key]) {
  //         acc[key] = [];
  //       }
  //       acc[key].push(item);
  //     }
  //     return acc;
  //   }, {});
  // const blockDataArray = Object.values(blockData || {});

  // const [block, setBlock] = useState(
  //   blockDataArray.length > 0
  //     ? blockDataArray.map((item, index) =>
  //         item.reduce((acc, [key, value]) => {
  //           acc[key] = value;
  //           return {
  //             ...acc,
  //             ...{
  //               open: true,
  //               id: index + 1,
  //               locale: "",
  //             },
  //           };
  //         }, {})
  //       )
  //     : [{ id: 1, open: true, locale: "" }]
  // );

  // const handleToggleBlock = (id) => {
  //   setBlock((prev) =>
  //     prev.map((data) => {
  //       if (data.id === id) {
  //         return { ...data, open: !data.open };
  //       } else {
  //         return data;
  //       }
  //     })
  //   );
  // };

  // const handleIncreaseBlock = () => {
  //   setBlock((prev) => {
  //     return prev.concat({
  //       id: prev[prev.length - 1].id + 1,
  //       open: true,
  //       locale: "",
  //       [`table_${prev[prev.length - 1].id + 1}_row_1_1`]: [],
  //     });
  //   });
  // };

  // const handleDeleteBlock = (id) => {
  //   if (block.length === 1) {
  //     Alert({
  //       icon: "error",
  //       title: "刪除失敗",
  //       text: "文章至少需有一個表格",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     });
  //   } else {
  //     Alert({
  //       icon: "warning",
  //       title: "確定刪除此表格？",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setBlock(block.filter((data) => data.id !== id));
  //       }
  //     });
  //   }
  // };

  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextZh);
  const [editorContent, setEditorContent] = useState(
    data?.content?.[0]?.fieldTextZh
  );
  const [leftFooterButton, setLeftFooterButton] = useState(
    data?.leftFooterButton?.[0]?.fieldTextZh
  );
  const [leftFooterButtonValue, setLeftFooterButtonValue] = useState(
    data?.leftFooterButton?.[0]?.fieldValue
  );
  const [rightFooterButton, setRightFooterButton] = useState(
    data?.rightFooterButton?.[0]?.fieldTextZh
  );
  const [rightFooterButtonValue, setRightFooterButtonValue] = useState(
    data?.rightFooterButton?.[0]?.fieldValue
  );

  const [headerSerialValue, setHeaderSerialValue] = useState(
    data?.header_serial?.[0]?.fieldTextZh
  );
  const [headerViewValue, setHeaderViewValue] = useState(
    data?.header_view?.[0]?.fieldTextZh
  );

  console.log("table", table);

  return (
    <div
      style={{
        display: locale === "zh" ? "" : "none",
      }}
    >
      <div className={styles.cmsUpdateArticleContent__container}>
        <ControllerInput
          label={"標題"}
          required={true}
          elementId={"title"}
          value={title}
          onChangeFun={setTitle}
          placeholder={"請輸入標題"}
        />
        <ControlEditor
          elementId={"content"}
          content={editorContent}
          setContent={setEditorContent}
        />
        <ControllerButtonInput
          label={"左頁尾按鈕"}
          elementId={"leftFooterButton"}
          elementValueId={"leftFooterButtonValue"}
          elementIdState={leftFooterButton}
          elementValueIdState={leftFooterButtonValue}
          elementIdOnChangeFun={setLeftFooterButton}
          elementIdValueOnChangeFun={setLeftFooterButtonValue}
          placeholderElement={"請輸入按鈕文字"}
          placeholderValue={"請輸入按鈕連結"}
        />
        <ControllerButtonInput
          label={"右頁尾按鈕"}
          elementId={"rightFooterButton"}
          elementValueId={"rightFooterButtonValue"}
          elementIdState={rightFooterButton}
          elementValueIdState={rightFooterButtonValue}
          elementIdOnChangeFun={setRightFooterButton}
          elementIdValueOnChangeFun={setRightFooterButtonValue}
          placeholderElement={"請輸入按鈕文字"}
          placeholderValue={"請輸入按鈕連結"}
        />
        <h3>版型設定</h3>
        <ControllerRadioButton
          elementId={"header_serial"}
          elementValueId={"header_serialValue"}
          label={"編號"}
          required={true}
          value={serial}
          onChangeFun={setSerial}
          inputValue={headerSerialValue}
          inputOnChangeFun={setHeaderSerialValue}
          input={true}
          maxlength={2}
          placeholder={"請輸入編號表頭名稱"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <ControllerRadioButton
          elementId={"header_view"}
          elementValueId={"header_viewValue"}
          label={"檢視按鈕"}
          required={true}
          value={viewButton}
          onChangeFun={setViewButton}
          inputValue={headerViewValue}
          inputOnChangeFun={setHeaderViewValue}
          input={true}
          placeholder={"輸入檢視按鈕表頭名稱"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <div className={styles.cmsUpdateArticleContent__container_twoColumn}>
          <Input
            label={"表頭1"}
            elementId={"header_1"}
            placeholder={"請輸入表頭1"}
            defaultValue={data?.header_1?.[0]?.fieldTextZh}
          />
          <Input
            label={"表頭2"}
            elementId={"header_2"}
            placeholder={"請輸入表頭2"}
            defaultValue={data?.header_2?.[0]?.fieldTextZh}
          />
          <Input
            label={"表頭3"}
            elementId={"header_3"}
            placeholder={"請輸入表頭3"}
            defaultValue={data?.header_3?.[0]?.fieldTextZh}
          />
          <Input
            label={"表頭4"}
            elementId={"header_4"}
            placeholder={"請輸入表頭4"}
            defaultValue={data?.header_4?.[0]?.fieldTextZh}
          />
          <Input
            label={"表頭5"}
            elementId={"header_5"}
            placeholder={"請輸入表頭5"}
            defaultValue={data?.header_5?.[0]?.fieldTextZh}
          />
        </div>
        <div className={styles.cmsUpdateArticleContent__container_increase}>
          {table.map((data, index) => (
            <TableBlock
              data={data}
              index={index}
              table={table}
              setTable={setTable}
              handleDeleteTable={handleDeleteTable}
              handleToggleTable={handleToggleTable}
              editorContent={editorContent}
              setEditorContent={setEditorContent}
              locale={""}
              key={`${data.id}_zh`}
              viewButton={viewButton}
              serial={serial}
              row={row}
              setRow={setRow}
              handleDeleteRow={handleDeleteRow}
              handleToggleRow={handleToggleRow}
              handleIncreaseRow={handleIncreaseRow}
            />
          ))}
          <div
            className={styles.cmsUpdateArticleContent__container_increaseButton}
            onClick={handleIncreaseTable}
          >
            <div
              className={
                styles.cmsUpdateArticleContent__container_increaseButton__icon
              }
            >
              <RxPlus />
            </div>
            <span>增加表格</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TableType({ pageData, locale }) {
  const data = pageData.reduce((acc, item) => {
    if (!acc[item.elementId]) {
      acc[item.elementId] = [];
    }
    acc[item.elementId].push(item);
    return acc;
  }, {});

  // 編號顯示
  // 檢視按鈕顯示
  const [viewButton, setViewButton] = useState(
    data?.header_view?.[0]?.fieldTextZh ? "true" : "false"
  );
  const [serial, setSerial] = useState(
    data?.header_serial?.[0]?.fieldTextZh ? "true" : "false"
  );

  const tableData = Object.entries(data)
    .filter(([key, value]) => key.includes("table_"))
    ?.reduce((acc, item) => {
      const match = item[0].match(/table_([^_]+)_(notice|theme|row)/);
      if (match) {
        const key = `table_${match[1]}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
      }
      return acc;
    }, {});

  const tableDataArray = Object.values(tableData || {});

  const [table, setTable] = useState(
    tableDataArray.length > 0
      ? tableDataArray.map((item, index) =>
          item.reduce((acc, [key, value]) => {
            acc[key] = value;
            return {
              ...acc,
              ...{
                open: true,
                id: index + 1,
                key: key.match(/table_([^_]+)_(notice|theme|row)/)[1],
              },
            };
          }, {})
        )
      : [{ id: 1, open: true, key: nanoid() }]
  );

  const handleToggleTable = (id) => {
    setTable((prev) =>
      prev.map((data) => {
        if (data.id === id) {
          return { ...data, open: !data.open };
        } else {
          return data;
        }
      })
    );
  };

  const handleIncreaseTable = () => {
    setTable((prev) => {
      const newTable = {
        id: prev[prev.length - 1].id + 1,
        open: true,
        key: nanoid(),
      };
      const updatedTable = prev.concat(newTable);

      handleIncreaseRow(newTable.key);

      return updatedTable;
    });
  };

  const handleDeleteTable = (id) => {
    if (table.length === 1) {
      Alert({
        icon: "error",
        title: "刪除失敗",
        text: "文章至少需有一個表格",
        showCancelButton: false,
        confirmButtonText: "確認",
      });
    } else {
      Alert({
        icon: "warning",
        title: "確定刪除此表格？",
        showCancelButton: false,
        confirmButtonText: "確認",
      }).then((result) => {
        if (result.isConfirmed) {
          setTable((prev) => prev.filter((data) => data.id !== id));
        }
      });
    }
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

  const rowData = Object.entries(data)
    .filter(([key, value]) => key.includes("row_"))
    ?.reduce((acc, item) => {
      const tableMatch = item[0].match(/table_([^_]+)_/);
      const rowMatch = item[0].match(/row_([^_]+)_/);
      if (tableMatch && rowMatch) {
        const tableKey = tableMatch[1];
        const rowKey = rowMatch[1];
        if (!acc[tableKey]) {
          acc[tableKey] = {};
        }
        if (!acc[tableKey][rowKey]) {
          acc[tableKey][rowKey] = [];
        }
        acc[tableKey][rowKey].push(item);
      }
      return acc;
    }, {});

  const rowDataArray = Object.values(rowData || {}).map((table) =>
    Object.values(table)
  );

  const [row, setRow] = useState([
    rowDataArray.length > 0
      ? rowDataArray.flat().map((item, index) =>
          item.reduce((acc, [key, value]) => {
            acc[key] = value;
            return {
              ...acc,
              ...{
                open: true,
                id: index + 1,
                key: key.match(/row_(.*)_.*$/)[1],
              },
            };
          }, {})
        )
      : [{ id: 1, open: true, key: nanoid() }],
  ]);

  const handleToggleRow = (id) => {
    setRow((prev) =>
      prev.map((item) => {
        return item.map((data) => {
          if (data.id === id) {
            return { ...data, open: !data.open };
          } else {
            return data;
          }
        });
      })
    );
  };

  const handleIncreaseRow = (tableKey) => {
    setRow((prev) =>
      prev.map((item) =>
        item.concat({
          id: item[item?.length - 1]?.id + 1,
          open: true,
          key: nanoid(),
          tableKey,
        })
      )
    );
  };

  const handleDeleteRow = (id) => {
    if (row?.[0].length === 1) {
      Alert({
        icon: "error",
        title: "刪除失敗",
        text: "表格至少需有一筆資料",
        showCancelButton: false,
        confirmButtonText: "確認",
      });
    } else {
      Alert({
        icon: "warning",
        title: "確定刪除此區塊？",
        showCancelButton: false,
        confirmButtonText: "確認",
      }).then((result) => {
        if (result.isConfirmed) {
          setRow((prev) =>
            prev.map((item) => item.filter((data) => data.id !== id))
          );
        }
      });
    }
  };

  return (
    <div>
      <ZhTemplate
        data={data}
        locale={locale}
        viewButton={viewButton}
        setViewButton={setViewButton}
        serial={serial}
        setSerial={setSerial}
        table={table}
        setTable={setTable}
        handleDeleteTable={handleDeleteTable}
        handleToggleTable={handleToggleTable}
        handleIncreaseTable={handleIncreaseTable}
        row={row}
        setRow={setRow}
        handleDeleteRow={handleDeleteRow}
        handleToggleRow={handleToggleRow}
        handleIncreaseRow={handleIncreaseRow}
      />
      <EnTemplate
        data={data}
        locale={locale}
        viewButton={viewButton}
        setViewButton={setViewButton}
        serial={serial}
        setSerial={setSerial}
        table={table}
        setTable={setTable}
        handleDeleteTable={handleDeleteTable}
        handleToggleTable={handleToggleTable}
        handleIncreaseTable={handleIncreaseTable}
        row={row}
        setRow={setRow}
        handleDeleteRow={handleDeleteRow}
        handleToggleRow={handleToggleRow}
        handleIncreaseRow={handleIncreaseRow}
      />
      <input type="hidden" name="templateId" value={3} />
    </div>
  );
}
