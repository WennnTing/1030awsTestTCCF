import styles from "../article-content.module.scss";
import { Input, ButtonInput, FileInput } from "@/components/cms/input";
import FileUpload from "@/components/cms/file-upload";
import { RadioButton } from "@/components/cms/radio-button";
import ArticleCalendar from "@/components/cms/article-calendar";
import dynamic from "next/dynamic";
import { useState } from "react";
const CustomEditor = dynamic(() => import("@/components/cms/custom-editor"), {
  ssr: false,
});

const EnTemplate = ({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
  displayTitle,
  setDisplayTitle,
  displayTime,
  setDisplayTime,
}) => {
  const [editorContent, setEditorContent] = useState([]);
  return (
    <div
      style={{
        display: locale === "en" ? "" : "none",
      }}
    >
      <div className={styles.cmsArticleContent__container}>
        <h3>一般型文章設定</h3>
        <Input
          label={"標題"}
          required={true}
          elementId={"titleEn"}
          placeholder={"請輸入標題"}
        />
        <Input label={"標籤"} elementId={"tagEn"} placeholder={"請輸入標籤"} />
        <CustomEditor
          elementId={"contentEn"}
          content={editorContent}
          setContent={setEditorContent}
        />

        <RadioButton
          elementId="displayTitleEn"
          label={"標題"}
          required={true}
          value={displayTitle}
          onChangeFun={setDisplayTitle}
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
          elementId="displayTimeEn"
          label={"時間"}
          required={true}
          value={displayTime}
          onChangeFun={setDisplayTime}
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
  displayTitle,
  setDisplayTitle,
  displayTime,
  setDisplayTime,
}) => {
  const [editorContent, setEditorContent] = useState([]);

  return (
    <div
      style={{
        display: locale === "zh" ? "" : "none",
      }}
    >
      <div className={styles.cmsArticleContent__container}>
        <h3>一般型文章設定</h3>
        <Input
          label={"標題"}
          required={true}
          elementId={"title"}
          placeholder={"請輸入標題"}
        />
        <Input label={"標籤"} elementId={"tag"} placeholder={"請輸入標籤"} />
        <CustomEditor
          elementId={"content"}
          content={editorContent}
          setContent={setEditorContent}
        />

        <RadioButton
          elementId="displayTitle"
          label={"標題"}
          required={true}
          value={displayTitle}
          onChangeFun={setDisplayTitle}
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
          elementId="displayTime"
          label={"時間"}
          required={true}
          value={displayTime}
          onChangeFun={setDisplayTime}
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

export default function GeneralType({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  editorContent,
  setEditorContent,
  locale,
}) {
  // 需共用設定
  // 標題顯示
  // 時間顯示
  const [displayTitle, setDisplayTitle] = useState("true");
  const [displayTime, setDisplayTime] = useState("true");

  return (
    <div>
      <ZhTemplate
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
        locale={locale}
        displayTitle={displayTitle}
        setDisplayTitle={setDisplayTitle}
        displayTime={displayTime}
        setDisplayTime={setDisplayTime}
      />
      <EnTemplate
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
        locale={locale}
        displayTitle={displayTitle}
        setDisplayTitle={setDisplayTitle}
        displayTime={displayTime}
        setDisplayTime={setDisplayTime}
      />
      {/* <div className={styles.cmsArticleContent__container}>
        <h3>一般型文章設定</h3>
        <Input label={"標題"} required={true} elementId={"title"} />
        <Input label={"標籤名稱"} elementId={"tag"} />
        <CustomEditor
          elementId={"content"}
          content={editorContent}
          setContent={setEditorContent}
        />

        <RadioButton
          elementId="displayTitle"
          label={"標題"}
          required={true}
          options={[
            {
              value: true,
              label: "顯示",
              checked: true,
            },
            {
              value: false,
              label: "不顯示",
            },
          ]}
        />
        <RadioButton
          elementId="displayTime"
          label={"時間"}
          required={true}
          options={[
            {
              value: true,
              label: "顯示",
              checked: true,
            },
            {
              value: false,
              label: "不顯示",
            },
          ]}
        />
        <ButtonInput
          label={"左頁尾按鈕"}
          elementId={"leftFooterButton"}
          elementValueId={"leftFooterButtonValue"}
        />
        <ButtonInput
          label={"右頁尾按鈕"}
          elementId={"rightFooterButton"}
          elementValueId={"rightFooterButtonValue"}
        />
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

        <FileInput label={"上傳附件"} elementId={"file"} />
      </div> */}
    </div>
  );
}
