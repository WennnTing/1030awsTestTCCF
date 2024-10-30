import { useState } from "react";
import styles from "../[uuid]/article-content.module.scss";
import ListBlock from "./_list-type/list-block";
import { ControllerInput, ControllerButtonInput } from "@/components/cms/input";
import { RxPlus } from "react-icons/rx";
import { Alert } from "@/components/cms/swal";
import dynamic from "next/dynamic";
const ControlEditor = dynamic(() => import("@/components/cms/control-editor"), {
  ssr: false,
});
import { nanoid } from "nanoid";

const EnTemplate = ({
  locale,
  data,
  block,
  setBlock,
  handleDeleteBlock,
  handleIncreaseBlock,
  handleToggleBlock,
}) => {
  // const blockData = Object.entries(data)
  //   .filter(([key, value]) => key.includes("block_"))
  //   ?.reduce((acc, item) => {
  //     const match = item[0].match(/_(\d+)$/);
  //     if (match) {
  //       const key = match[1];
  //       if (!acc[key]) {
  //         acc[key] = [];
  //       }
  //       acc[key].push(item);
  //     }
  //     return acc;
  //   }, {});

  // const blockDataArray = Object.values(blockData || {});

  // const [block, setBlock] = useState(
  //   blockDataArray.map((item, index) =>
  //     item.reduce((acc, [key, value]) => {
  //       acc[key] = value;
  //       return {
  //         ...acc,
  //         ...{ open: true, id: index + 1, locale: "_En" },
  //       };
  //     }, {})
  //   )
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
  //       locale: "_En",
  //     });
  //   });
  // };

  // const handleDeleteBlock = (id) => {
  //   if (block.length === 1) {
  //     Alert({
  //       icon: "error",
  //       title: "刪除失敗",
  //       text: "文章至少需有一個區塊",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     });
  //   } else {
  //     Alert({
  //       icon: "warning",
  //       title: "確定刪除此區塊？",
  //       showCancelButton: true,
  //       cancelButtonText: "取消",
  //       confirmButtonText: "確認",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setBlock((prev) => prev.filter((data) => data.id !== id));
  //       }
  //     });
  //   }
  // };

  const [editorContent, setEditorContent] = useState(
    data?.content?.[0]?.fieldTextEn
  );
  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextEn);
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
        <h3>區域設計</h3>
        <div className={styles.cmsUpdateArticleContent__container_increase}>
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
              key={data.id}
            />
          ))}

          <div
            className={styles.cmsUpdateArticleContent__container_increaseButton}
            onClick={handleIncreaseBlock}
          >
            <div
              className={
                styles.cmsUpdateArticleContent__container_increaseButton__icon
              }
            >
              <RxPlus />
            </div>
            <span>增加區塊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ZhTemplate = ({
  locale,
  data,
  block,
  setBlock,
  handleDeleteBlock,
  handleIncreaseBlock,
  handleToggleBlock,
}) => {
  // const blockData = Object.entries(data)
  //   .filter(([key, value]) => key.includes("block_"))
  //   ?.reduce((acc, item) => {
  //     const match = item[0].match(/_(\d+)$/);
  //     if (match) {
  //       const key = match[1];
  //       if (!acc[key]) {
  //         acc[key] = [];
  //       }
  //       acc[key].push(item);
  //     }
  //     return acc;
  //   }, {});

  // const blockDataArray = Object.values(blockData || {});

  // const [block, setBlock] = useState(
  //   blockDataArray.map((item, index) =>
  //     item.reduce((acc, [key, value]) => {
  //       acc[key] = value;
  //       return {
  //         ...acc,
  //         ...{ open: true, id: index + 1, locale: "" },
  //       };
  //     }, {})
  //   )
  // );

  const [editorContent, setEditorContent] = useState(
    data?.content?.[0]?.fieldTextZh
  );
  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextZh);
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
  //     });
  //   });
  // };

  // const handleDeleteBlock = (id) => {
  //   if (block.length === 1) {
  //     Alert({
  //       icon: "error",
  //       title: "刪除失敗",
  //       text: "文章至少需有一個區塊",
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
  //         setBlock((prev) => prev.filter((data) => data.id !== id));
  //       }
  //     });
  //   }
  // };
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
        <h3>區域設計</h3>
        <div className={styles.cmsUpdateArticleContent__container_increase}>
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
              key={data.id}
            />
          ))}

          <div
            className={styles.cmsUpdateArticleContent__container_increaseButton}
            onClick={handleIncreaseBlock}
          >
            <div
              className={
                styles.cmsUpdateArticleContent__container_increaseButton__icon
              }
            >
              <RxPlus />
            </div>
            <span>增加區塊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ListType({ pageData, locale }) {
  const data = pageData.reduce((acc, item) => {
    if (!acc[item.elementId]) {
      acc[item.elementId] = [];
    }
    acc[item.elementId].push(item);
    return acc;
  }, {});

  const blockData = Object.entries(data)
    .filter(([key, value]) => key.includes("block_"))
    ?.reduce((acc, item) => {
      const match = item[0].match(/^[^_]*_[^_]*_(.*)$/);
      if (match) {
        const key = match[1];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
      }
      return acc;
    }, {});

  const blockDataArray = Object.values(blockData || {});

  const [block, setBlock] = useState(
    blockDataArray.length > 0
      ? blockDataArray.map((item, index) =>
          item.reduce((acc, [key, value]) => {
            acc[key] = value;
            return {
              ...acc,
              ...{
                open: true,
                id: index + 1,
                key: key.match(/^[^_]*_[^_]*_(.*)$/)[1],
              },
            };
          }, {})
        )
      : [{ id: 1, open: true, key: nanoid() }]
  );

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

  const handleDeleteBlock = (id) => {
    if (block.length === 1) {
      Alert({
        icon: "error",
        title: "刪除失敗",
        text: "文章至少需有一個區塊",
        showCancelButton: false,
        confirmButtonText: "確認",
      });
    } else {
      Alert({
        icon: "warning",
        title: "確定刪除此區塊？",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonText: "確認",
      }).then((result) => {
        if (result.isConfirmed) {
          setBlock((prev) => prev.filter((data) => data.id !== id));
        }
      });
    }
  };

  return (
    <div>
      <ZhTemplate
        locale={locale}
        data={data}
        block={block}
        setBlock={setBlock}
        handleDeleteBlock={handleDeleteBlock}
        handleToggleBlock={handleToggleBlock}
        handleIncreaseBlock={handleIncreaseBlock}
      />
      <EnTemplate
        locale={locale}
        data={data}
        block={block}
        setBlock={setBlock}
        handleDeleteBlock={handleDeleteBlock}
        handleToggleBlock={handleToggleBlock}
        handleIncreaseBlock={handleIncreaseBlock}
      />
      <input type="hidden" name="templateId" value={2} />
    </div>
  );
}
