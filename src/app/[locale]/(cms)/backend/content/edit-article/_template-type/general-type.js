import { ControllerInput, ControllerButtonInput } from "@/components/cms/input";
import { ControllerRadioButton } from "@/components/cms/radio-button";
import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "../[uuid]/article-content.module.scss";

const ControlEditor = dynamic(() => import("@/components/cms/control-editor"), {
  ssr: false,
});

const EnTemplate = ({
  displayTitle,
  setDisplayTitle,
  displayTime,
  setDisplayTime,
  data,
  locale,
}) => {
  const [editorContent, setEditorContent] = useState(
    data?.content?.[0]?.fieldTextEn
  );
  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextEn);
  const [tag, setTag] = useState(data?.tag?.[0]?.fieldTextEn);
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

  return (
    <div
      style={{
        display: locale === "en" ? "" : "none",
      }}
    >
      <div className={styles.cmsUpdateArticleContent}>
        <div className={styles.cmsUpdateArticleContent__container}>
          <ControllerInput
            label={"標題"}
            required={true}
            elementId={"titleEn"}
            value={title}
            onChangeFun={setTitle}
            placeholder={"請輸入標題"}
          />
          <ControllerInput
            label={"標籤"}
            elementId={"tagEn"}
            value={tag}
            onChangeFun={setTag}
            placeholder={"請輸入標籤"}
          />
          <ControlEditor
            elementId={"contentEn"}
            content={editorContent}
            setContent={setEditorContent}
          />
          <ControllerRadioButton
            label={"標題"}
            required={true}
            elementId={"displayTitleEn"}
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
          <ControllerRadioButton
            label={"時間"}
            required={true}
            elementId={"displayTimeEn"}
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
        </div>
      </div>
    </div>
  );
};

const ZhTemplate = ({
  displayTitle,
  setDisplayTitle,
  displayTime,
  setDisplayTime,
  data,
  locale,
}) => {
  const [editorContent, setEditorContent] = useState(
    data?.content?.[0]?.fieldTextZh
  );
  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextZh);
  const [tag, setTag] = useState(data?.tag?.[0]?.fieldTextZh);

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

  return (
    <div
      style={{
        display: locale === "zh" ? "" : "none",
      }}
    >
      <div className={styles.cmsUpdateArticleContent}>
        <div className={styles.cmsUpdateArticleContent__container}>
          <ControllerInput
            label={"標題"}
            required={true}
            elementId={"title"}
            value={title}
            onChangeFun={setTitle}
          />
          <ControllerInput
            label={"標籤"}
            elementId={"tag"}
            value={tag}
            onChangeFun={setTag}
            placeholder={"請輸入標籤"}
          />

          <ControlEditor
            elementId={"content"}
            content={editorContent}
            setContent={setEditorContent}
          />
          <ControllerRadioButton
            label={"標題"}
            required={true}
            elementId={"displayTitle"}
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
          <ControllerRadioButton
            label={"時間"}
            required={true}
            elementId={"displayTime"}
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
        </div>
      </div>
    </div>
  );
};

export default function GeneralType({ pageData, locale }) {
  const data = pageData.reduce((acc, item) => {
    if (!acc[item.elementId]) {
      acc[item.elementId] = [];
    }
    acc[item.elementId].push(item);
    return acc;
  }, {});

  const [displayTitle, setDisplayTitle] = useState(
    data?.displayTitle?.[0]?.fieldValue
  );
  const [displayTime, setDisplayTime] = useState(
    data?.displayTime?.[0]?.fieldValue
  );

  return (
    <div>
      <ZhTemplate
        locale={locale}
        displayTitle={displayTitle}
        setDisplayTitle={setDisplayTitle}
        displayTime={displayTime}
        setDisplayTime={setDisplayTime}
        data={data}
      />
      <EnTemplate
        locale={locale}
        displayTitle={displayTitle}
        setDisplayTitle={setDisplayTitle}
        displayTime={displayTime}
        setDisplayTime={setDisplayTime}
        data={data}
      />
      <input type="hidden" name="templateId" value={1} />
    </div>
  );
}
