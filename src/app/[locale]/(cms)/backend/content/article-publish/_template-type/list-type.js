"use client";
import { useState } from "react";
import styles from "../article-content.module.scss";
import { Input, ButtonInput } from "@/components/cms/input";
import dynamic from "next/dynamic";
import ArticleCalendar from "@/components/cms/article-calendar";
import { RxPlus } from "react-icons/rx";
import ListBlock from "./_list-type/list-block";
import { Alert } from "@/components/cms/swal";
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
  block,
  setBlock,
  handleToggleBlock,
  handleIncreaseBlock,
  handleDeleteBlock,
}) => {
  const [editorContent, setEditorContent] = useState([]);

  return (
    <div
      style={{
        display: locale === "en" ? "" : "none",
      }}
    >
      <div className={styles.cmsArticleContent__container}>
        <h3>條列型文章設定</h3>
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
          <h3>區域設計</h3>
          <div
            className={
              styles.cmsArticleContent__container_increaseBlockContainer
            }
          >
            {block.map((data, index) => (
              <ListBlock
                data={data}
                index={index}
                block={block}
                setBlock={setBlock}
                handleDeleteBlock={handleDeleteBlock}
                handleToggleBlock={handleToggleBlock}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                locale={"_En"}
                key={index}
              />
            ))}

            <div
              className={styles.cmsArticleContent__container_increase}
              onClick={handleIncreaseBlock}
            >
              <div
                className={styles.cmsArticleContent__container_increase__icon}
              >
                <RxPlus />
              </div>
              <span>增加區塊</span>
            </div>
          </div>
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
  block,
  setBlock,
  handleToggleBlock,
  handleIncreaseBlock,
  handleDeleteBlock,
}) => {
  const [editorContent, setEditorContent] = useState([]);
  return (
    <div
      style={{
        display: locale === "zh" ? "" : "none",
      }}
    >
      <div className={styles.cmsArticleContent__container}>
        <h3>條列型文章設定</h3>
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
          <h3>區域設計</h3>
          <div
            className={
              styles.cmsArticleContent__container_increaseBlockContainer
            }
          >
            {block.map((data, index) => (
              <ListBlock
                data={data}
                index={index}
                block={block}
                setBlock={setBlock}
                handleDeleteBlock={handleDeleteBlock}
                handleToggleBlock={handleToggleBlock}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                locale={""}
                key={index}
              />
            ))}

            <div
              className={styles.cmsArticleContent__container_increase}
              onClick={handleIncreaseBlock}
            >
              <div
                className={styles.cmsArticleContent__container_increase__icon}
              >
                <RxPlus />
              </div>
              <span>增加區塊</span>
            </div>
          </div>
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

export default function ListType({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
}) {
  const [block, setBlock] = useState([
    {
      id: 1,
      open: true,
      key: nanoid(),
    },
  ]);

  const handleToggleBlock = (id) => {
    setBlock((prev) =>
      prev.map((data) => {
        if (data.id === id) {
          return { ...data, open: !data.open };
        } else {
          return data;
        }
      })
    );
  };

  const handleIncreaseBlock = () => {
    setBlock((prev) => {
      return prev.concat({
        id: prev[prev.length - 1].id + 1,
        open: true,
        key: nanoid(),
      });
    });
  };

  const showSingleBlockAlert = () => {
    Alert({
      icon: "error",
      title: "刪除失敗",
      text: "文章至少需有一個區塊",
      showCancelButton: false,
      confirmButtonText: "確認",
    });
  };

  const showDeleteConfirmationAlert = (id) => {
    Alert({
      icon: "warning",
      title: "確定刪除此區塊？",
      showCancelButton: false,
      confirmButtonText: "確認",
    }).then((result) => {
      if (result.isConfirmed) {
        removeBlock(id);
      }
    });
  };

  const removeBlock = (id) => {
    setBlock((prev) => prev.filter((data) => data.id !== id));
  };

  const handleDeleteBlock = (id) => {
    if (block.length === 1) {
      showSingleBlockAlert();
    } else {
      showDeleteConfirmationAlert(id);
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
        block={block}
        setBlock={setBlock}
        handleDeleteBlock={handleDeleteBlock}
        handleToggleBlock={handleToggleBlock}
        handleIncreaseBlock={handleIncreaseBlock}
      />
      <EnTemplate
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
        locale={locale}
        block={block}
        setBlock={setBlock}
        handleDeleteBlock={handleDeleteBlock}
        handleToggleBlock={handleToggleBlock}
        handleIncreaseBlock={handleIncreaseBlock}
      />
    </div>
  );
}
