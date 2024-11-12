import { useState } from "react";
import styles from "../article-content.module.scss";
import { Input, ButtonInput } from "@/components/cms/input";
import { RadioButton } from "@/components/cms/radio-button";
import ArticleCalendar from "@/components/cms/article-calendar";
import TableBlock from "./_table-type/table-block";
import { Alert } from "@/components/cms/swal";
import { RxPlus } from "react-icons/rx";
import dynamic from "next/dynamic";
import { FiInfo } from "react-icons/fi";
import { nanoid } from "nanoid";
const CustomEditor = dynamic(() => import("@/components/cms/custom-editor"), {
  ssr: false,
});

const EnTemplate = ({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
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
  const [editorContent, setEditorContent] = useState([]);

  return (
    <div
      style={{
        display: locale === "en" ? "" : "none",
      }}
    >
      <div className={styles.cmsArticleContent__container}>
        <h3>表格型文章設定</h3>
        <Input
          label={"標題"}
          required={true}
          elementId={"titleEn"}
          placeholder={"請輸入標題"}
        />
        <CustomEditor
          elementId={"contentEn"}
          content={editorContent}
          setContent={setEditorContent}
        />
        <ButtonInput
          label={"左頁尾按鈕"}
          elementId={"leftFooterButtonEn"}
          elementValueId={"leftFooterButtonValueEn"}
          placeholderElement={"請輸入按鈕文字"}
          placeholderValue={"請輸入按鈕連結"}
        />
        <ButtonInput
          label={"右頁尾按鈕"}
          elementId={"rightFooterButtonEn"}
          elementValueId={"rightFooterButtonValueEn"}
          placeholderElement={"請輸入按鈕文字"}
          placeholderValue={"請輸入按鈕連結"}
        />

        <div className={styles.cmsArticleContent__container}>
          <h3>版型設定</h3>
          <div className={styles.cmsArticleContent__container_notice}>
            <div className={styles.cmsArticleContent__container_notice__icon}>
              <FiInfo />
            </div>
            <span>表頭若未輸入字元則不顯示，並且只會顯示對應欄位</span>
          </div>
          <div>
            <RadioButton
              label={"編號"}
              elementId={"header_serialEn"}
              elementValueId={"header_serialValueEn"}
              required={true}
              input={true}
              state={serial}
              value={serial}
              info={"兩字元以內文字"}
              onChangeFun={setSerial}
              maxlength={2}
              placeholder={"輸入編號表頭名稱"}
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

            <RadioButton
              label={"檢視按鈕"}
              elementId={"header_viewEn"}
              elementValueId={"header_viewValueEn"}
              required={true}
              input={true}
              state={viewButton}
              value={viewButton}
              onChangeFun={setViewButton}
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
          </div>

          <div className={styles.cmsArticleContent__container_twoColumn}>
            <Input
              label={"表頭1"}
              elementId={"header_1_En"}
              placeholder={"請輸入表頭1"}
            />
            <Input
              label={"表頭2"}
              elementId={"header_2_En"}
              placeholder={"請輸入表頭2"}
            />
            <Input
              label={"表頭3"}
              elementId={"header_3_En"}
              placeholder={"請輸入表頭3"}
            />
            <Input
              label={"表頭4"}
              elementId={"header_4_En"}
              placeholder={"請輸入表頭4"}
            />
            <Input
              label={"表頭5"}
              elementId={"header_5_En"}
              placeholder={"請輸入表頭5"}
            />
          </div>
        </div>
        <div
          className={styles.cmsArticleContent__container_increaseBlockContainer}
        >
          {table.map((data, index) => (
            <TableBlock
              data={data}
              index={index}
              table={table}
              setTable={setTable}
              handleDeleteTable={handleDeleteTable}
              handleToggleTable={handleToggleTable}
              serial={serial}
              viewButton={viewButton}
              locale={"_En"}
              key={data.id}
              row={row}
              setRow={setRow}
              handleDeleteRow={handleDeleteRow}
              handleToggleRow={handleToggleRow}
              handleIncreaseRow={handleIncreaseRow}
            />
          ))}
          <button
            className={styles.cmsArticleContent__container_increase}
            onClick={handleIncreaseTable}
            aria-label="增加表格"
            style={{ border: "none", fontSize: "1rem" }}
          >
            <div className={styles.cmsArticleContent__container_increase__icon}>
              <RxPlus />
            </div>
            <span>增加表格</span>
          </button>


        </div>
      </div>
      <div className={styles.cmsArticleContent__container}>
        <h3>共用設定</h3>
        <ArticleCalendar
          label={"上架期間"}
          required={true}
          publishDate={publishDate}
          setPublishDate={setPublishDate}
          unpublishDate={unpublishDate}
          setUnpublishDate={setUnpublishDate}
        />
      </div>
    </div>
  );
};

const ZhTemplate = ({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
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
  const [editorContent, setEditorContent] = useState([]);
  return (
    <div
      style={{
        display: locale === "zh" ? "" : "none",
      }}
    >
      <div className={styles.cmsArticleContent__container}>
        <h3>表格型文章設定</h3>
        <Input
          label={"標題"}
          required={true}
          elementId={"title"}
          placeholder={"請輸入標題"}
        />
        <CustomEditor
          elementId={"content"}
          content={editorContent}
          setContent={setEditorContent}
        />
        <ButtonInput
          label={"左頁尾按鈕"}
          elementId={"leftFooterButton"}
          elementValueId={"leftFooterButtonValue"}
          placeholderElement={"請輸入按鈕文字"}
          placeholderValue={"請輸入按鈕連結"}
        />
        <ButtonInput
          label={"右頁尾按鈕"}
          elementId={"rightFooterButton"}
          elementValueId={"rightFooterButtonValue"}
          placeholderElement={"請輸入按鈕文字"}
          placeholderValue={"請輸入按鈕連結"}
        />

        <div className={styles.cmsArticleContent__container}>
          <h3>版型設定</h3>
          <div className={styles.cmsArticleContent__container_notice}>
            <div className={styles.cmsArticleContent__container_notice__icon}>
              <FiInfo />
            </div>
            <span>表頭若未輸入字元則不顯示，並且只會顯示對應欄位</span>
          </div>
          <div>
            <RadioButton
              label={"編號"}
              elementId={"header_serial"}
              elementValueId={"header_serialValue"}
              required={true}
              input={true}
              state={serial}
              value={serial}
              maxlength={2}
              onChangeFun={setSerial}
              placeholder={"輸入編號表頭名稱"}
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

            <RadioButton
              label={"檢視按鈕"}
              elementId={"header_view"}
              elementValueId={"header_viewValue"}
              required={true}
              input={true}
              state={viewButton}
              value={viewButton}
              onChangeFun={setViewButton}
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
          </div>

          <div className={styles.cmsArticleContent__container_twoColumn}>
            <Input
              label={"表頭1"}
              elementId={"header_1"}
              placeholder={"請輸入表頭1"}
            />
            <Input
              label={"表頭2"}
              elementId={"header_2"}
              placeholder={"請輸入表頭2"}
            />
            <Input
              label={"表頭3"}
              elementId={"header_3"}
              placeholder={"請輸入表頭3"}
            />
            <Input
              label={"表頭4"}
              elementId={"header_4"}
              placeholder={"請輸入表頭4"}
            />
            <Input
              label={"表頭5"}
              elementId={"header_5"}
              placeholder={"請輸入表頭5"}
            />
          </div>
        </div>
        <div
          className={styles.cmsArticleContent__container_increaseBlockContainer}
        >
          {table.map((data, index) => (
            <TableBlock
              data={data}
              index={index}
              table={table}
              setTable={setTable}
              handleDeleteTable={handleDeleteTable}
              handleToggleTable={handleToggleTable}
              serial={serial}
              viewButton={viewButton}
              key={data.id}
              locale={""}
              row={row}
              setRow={setRow}
              handleDeleteRow={handleDeleteRow}
              handleToggleRow={handleToggleRow}
              handleIncreaseRow={handleIncreaseRow}
            />
          ))}
          <button
            className={styles.cmsArticleContent__container_increase}
            onClick={handleIncreaseTable}
            aria-label="增加表格"
            style={{ border: "none", fontSize: "1rem" }}
          >
            <div className={styles.cmsArticleContent__container_increase__icon}>
              <RxPlus />
            </div>
            <span>增加表格</span>
          </button>
        </div>
      </div>
      <div className={styles.cmsArticleContent__container}>
        <h3>共用設定</h3>
        <ArticleCalendar
          label={"上架期間"}
          required={true}
          publishDate={publishDate}
          setPublishDate={setPublishDate}
          unpublishDate={unpublishDate}
          setUnpublishDate={setUnpublishDate}
        />
      </div>
    </div>
  );
};

export default function TableType({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
}) {
  // 需共用設定
  // 編號顯示
  // 檢視按鈕顯示
  const [viewButton, setViewButton] = useState("true");
  const [serial, setSerial] = useState("true");

  const [table, setTable] = useState([
    {
      id: 1,
      open: true,
      key: nanoid(),
    },
  ]);

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
    setTable((prev) =>
      prev.concat({
        id: prev[prev.length - 1].id + 1,
        open: true,
        key: nanoid(),
      })
    );
  };

  const showSingleItemAlert = (message) => {
    Alert({
      icon: "error",
      title: "刪除失敗",
      text: message,
      showCancelButton: false,
      confirmButtonText: "確認",
    });
  };

  const showDeleteConfirmationAlert = (id, removeFunction) => {
    Alert({
      icon: "warning",
      title: "確定刪除此區塊？",
      showCancelButton: false,
      confirmButtonText: "確認",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFunction(id);
      }
    });
  };

  const removeItem = (id, setFunction) => {
    setFunction((prev) => prev.filter((data) => data.id !== id));
  };


  const [row, setRow] = useState([
    {
      id: 1,
      open: true,
      key: nanoid(),
    },
  ]);

  const handleToggleRow = (id) => {
    setRow((prev) =>
      prev.map((data) => {
        if (data.id === id) {
          return { ...data, open: !data.open };
        } else {
          return data;
        }
      })
    );
  };

  const handleIncreaseRow = () => {
    setRow((prev) =>
      prev.concat({
        id: prev[prev.length - 1].id + 1,
        open: true,
        key: nanoid(),
      })
    );
  };

  const handleDeleteRow = (id) => {
    if (row.length === 1) {
      showSingleItemAlert("表格至少需有一筆資料");
    } else {
      showDeleteConfirmationAlert(id, (id) => removeItem(id, setRow));
    }
  };

  const handleDeleteTable = (id) => {
    if (table.length === 1) {
      showSingleItemAlert("表格至少需有一筆資料");
    } else {
      showDeleteConfirmationAlert(id, (id) => removeItem(id, setTable));
    }
  };


  return (
    <div>
      <ZhTemplate
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
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
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
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
    </div>
  );
}
