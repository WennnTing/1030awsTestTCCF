import styles from "../article-content.module.scss";
import { Input, ButtonInput } from "@/components/cms/input";
import { RadioButton } from "@/components/cms/radio-button";
import ArticleCalendar from "@/components/cms/article-calendar";
import { useState } from "react";
import { Alert } from "@/components/cms/swal";
import { RxPlus } from "react-icons/rx";
import AnnouncementCard from "./_announcement-type/announcement-card";
import { nanoid } from "nanoid";

const EnTemplate = ({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
  cardFunction,
  setCardFunction,
  displayLocation,
  setDisplayLocation,
  displayCardImage,
  setDisplayCardImage,
  buttonFunction,
  setButtonFunction,
  pages,

  card,
  setCard,
  handleDeleteCard,
  handleToggleCard,
  handleIncreaseCard,
}) => {
  // const [card, setCard] = useState([
  //   {
  //     id: 1,
  //     open: true,
  //     locale: "_En",
  //   },
  // ]);

  // const handleToggleCard = (id) => {
  //   setCard((prev) =>
  //     prev.map((data) => {
  //       if (data.id === id) {
  //         return { ...data, open: !data.open };
  //       } else {
  //         return data;
  //       }
  //     })
  //   );
  // };

  // const handleIncreaseCard = () => {
  //   setCard((prev) =>
  //     prev.concat({
  //       id: prev[prev.length - 1].id + 1,
  //       open: true,
  //       locale: "_En",
  //     })
  //   );
  // };

  // const handleDeleteCard = (id) => {
  //   if (card.length === 1) {
  //     Alert({
  //       icon: "error",
  //       title: "刪除失敗",
  //       text: "文章至少需有一張卡片",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     });
  //   } else {
  //     Alert({
  //       icon: "warning",
  //       title: "確定刪除此卡片？",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setCard((prev) => prev.filter((data) => data.id !== id));
  //       }
  //     });
  //   }
  // };

  return (
    <div
      style={{
        display: locale === "en" ? "" : "none",
      }}
    >
      <div className={styles.cmsArticleContent__container}>
        <h3>消息表型文章設定</h3>
        <Input
          label={"標題"}
          required={true}
          elementId={"titleEn"}
          placeholder={"請輸入標題"}
        />
      </div>
      <div className={styles.cmsArticleContent__container}>
        <h3>版型設定</h3>
        <RadioButton
          elementId="cardFunctionEn"
          label={"卡片功能"}
          required={true}
          state={cardFunction}
          value={cardFunction}
          onChangeFun={setCardFunction}
          info={
            "進入文章：點擊卡片即進入文章內容 | 外部連結：附件檔案下載 / 進入外部連結，須搭配按鈕功能"
          }
          options={[
            {
              value: "article",
              label: "進入文章",
              checked: true,
            },
            {
              value: "link",
              label: "外部連結",
            },
          ]}
        />

        {cardFunction === "article" && (
          <RadioButton
            label={"地點顯示"}
            elementId={"displayLocationEn"}
            value={displayLocation}
            onChangeFun={setDisplayLocation}
            required={true}
            info={"顯示：顯示地點 | 不顯示：卡片上不顯示地點"}
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
        )}

        {cardFunction === "link" && (
          <RadioButton
            label={"按鈕功能"}
            elementId={"buttonFunctionEn"}
            elementValueId={"buttonFunctionValueEn"}
            required={true}
            input={true}
            state={buttonFunction}
            value={buttonFunction}
            onChangeFun={setButtonFunction}
            info={"可使用於進入外部連結、檔案下載等"}
            placeholder={"請輸入按鈕文字"}
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
        )}
        {cardFunction === "link" && (
          <RadioButton
            label={"卡片圖片"}
            elementId={"displayCardImageEn"}
            elementValueId={"displayCardImageValueEn"}
            required={true}
            input={true}
            state={"image"}
            value={displayCardImage}
            onChangeFun={setDisplayCardImage}
            info={
              "使用於卡片上方圖片，若選擇外部連結並且須顯示，則統一為同一張圖片使用"
            }
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
        )}
      </div>
      <div className={styles.cmsArticleContent__container}>
        <h3>卡片設計</h3>
        <div
          className={styles.cmsArticleContent__container_increaseBlockContainer}
        >
          {card.map((data, index) => (
            <AnnouncementCard
              data={data}
              index={index}
              card={card}
              setCard={setCard}
              handleDeleteCard={handleDeleteCard}
              handleToggleCard={handleToggleCard}
              cardFunction={cardFunction}
              buttonFunction={buttonFunction}
              displayCardImage={displayCardImage}
              displayLocation={displayLocation}
              key={data.id}
              pages={pages}
              locale={"_En"}
            />
          ))}
          <div
            className={styles.cmsArticleContent__container_increase}
            onClick={handleIncreaseCard}
          >
            <div className={styles.cmsArticleContent__container_increase__icon}>
              <RxPlus />
            </div>
            <span>增加卡片</span>
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
  cardFunction,
  setCardFunction,
  displayLocation,
  setDisplayLocation,
  displayCardImage,
  setDisplayCardImage,
  buttonFunction,
  setButtonFunction,
  pages,

  card,
  setCard,
  handleDeleteCard,
  handleToggleCard,
  handleIncreaseCard,
}) => {
  // const [card, setCard] = useState([
  //   {
  //     id: 1,
  //     open: true,
  //     locale: "",
  //   },
  // ]);

  // const handleToggleCard = (id) => {
  //   setCard((prev) =>
  //     prev.map((data) => {
  //       if (data.id === id) {
  //         return { ...data, open: !data.open };
  //       } else {
  //         return data;
  //       }
  //     })
  //   );
  // };

  // const handleIncreaseCard = () => {
  //   setCard((prev) =>
  //     prev.concat({
  //       id: prev[prev.length - 1].id + 1,
  //       open: true,
  //       locale: "",
  //     })
  //   );
  // };

  // const handleDeleteCard = (id) => {
  //   if (card.length === 1) {
  //     Alert({
  //       icon: "error",
  //       title: "刪除失敗",
  //       text: "文章至少需有一張卡片",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     });
  //   } else {
  //     Alert({
  //       icon: "warning",
  //       title: "確定刪除此卡片？",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setCard((prev) => prev.filter((data) => data.id !== id));
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
      <div className={styles.cmsArticleContent__container}>
        <h3>消息表型文章設定</h3>
        <Input
          label={"標題"}
          required={true}
          elementId={"title"}
          placeholder={"請輸入標題"}
        />
      </div>
      <div className={styles.cmsArticleContent__container}>
        <h3>版型設定</h3>
        <RadioButton
          elementId="cardFunction"
          label={"卡片功能"}
          required={true}
          state={cardFunction}
          value={cardFunction}
          onChangeFun={setCardFunction}
          info={
            "進入文章：點擊卡片即進入文章內容 | 外部連結：附件檔案下載 / 進入外部連結，須搭配按鈕功能"
          }
          options={[
            {
              value: "article",
              label: "進入文章",
              checked: true,
            },
            {
              value: "link",
              label: "外部連結",
            },
          ]}
        />

        {cardFunction === "article" && (
          <RadioButton
            label={"地點顯示"}
            elementId={"displayLocation"}
            required={true}
            value={displayLocation}
            onChangeFun={setDisplayLocation}
            info={"顯示：顯示地點 | 不顯示：卡片上不顯示地點"}
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
        )}

        {cardFunction === "link" && (
          <RadioButton
            label={"按鈕功能"}
            elementId={"buttonFunction"}
            elementValueId={"buttonFunctionValue"}
            required={true}
            input={true}
            state={buttonFunction}
            value={buttonFunction}
            onChangeFun={setButtonFunction}
            info={"可使用於進入外部連結、檔案下載等"}
            placeholder={"請輸入按鈕文字"}
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
        )}
        {cardFunction === "link" && (
          <RadioButton
            label={"卡片圖片"}
            elementId={"displayCardImage"}
            elementValueId={"displayCardImageValue"}
            required={true}
            input={true}
            state={"image"}
            value={displayCardImage}
            onChangeFun={setDisplayCardImage}
            info={
              "使用於卡片上方圖片，若選擇外部連結並且須顯示，則統一為同一張圖片使用"
            }
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
        )}
      </div>
      <div className={styles.cmsArticleContent__container}>
        <h3>卡片設計</h3>
        <div
          className={styles.cmsArticleContent__container_increaseBlockContainer}
        >
          {card.map((data, index) => (
            <AnnouncementCard
              data={data}
              index={index}
              card={card}
              setCard={setCard}
              handleDeleteCard={handleDeleteCard}
              handleToggleCard={handleToggleCard}
              cardFunction={cardFunction}
              buttonFunction={buttonFunction}
              displayCardImage={displayCardImage}
              displayLocation={displayLocation}
              key={data.id}
              pages={pages}
              locale={""}
            />
          ))}
          <div
            className={styles.cmsArticleContent__container_increase}
            onClick={handleIncreaseCard}
          >
            <div className={styles.cmsArticleContent__container_increase__icon}>
              <RxPlus />
            </div>
            <span>增加卡片</span>
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

export default function AnnouncementType({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
  pages,
}) {
  // 需共用設定
  // 卡片功能
  // 地點顯示
  // 卡片圖片顯示
  const [cardFunction, setCardFunction] = useState("article");
  const [displayLocation, setDisplayLocation] = useState("true");
  const [displayCardImage, setDisplayCardImage] = useState("true");
  const [buttonFunction, setButtonFunction] = useState("true");

  const [card, setCard] = useState([
    {
      id: 1,
      open: true,
      key: nanoid(),
    },
  ]);

  const handleToggleCard = (id) => {
    setCard((prev) =>
      prev.map((data) => {
        if (data.id === id) {
          return { ...data, open: !data.open };
        } else {
          return data;
        }
      })
    );
  };

  const handleIncreaseCard = () => {
    setCard((prev) =>
      prev.concat({
        id: prev[prev.length - 1].id + 1,
        open: true,
        key: nanoid(),
      })
    );
  };

  const handleDeleteCard = (id) => {
    if (card.length === 1) {
      Alert({
        icon: "error",
        title: "刪除失敗",
        text: "文章至少需有一張卡片",
        showCancelButton: false,
        confirmButtonText: "確認",
      });
    } else {
      Alert({
        icon: "warning",
        title: "確定刪除此卡片？",
        showCancelButton: false,
        confirmButtonText: "確認",
      }).then((result) => {
        if (result.isConfirmed) {
          setCard((prev) => prev.filter((data) => data.id !== id));
        }
      });
    }
  };

  return (
    <>
      <ZhTemplate
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
        locale={locale}
        cardFunction={cardFunction}
        setCardFunction={setCardFunction}
        displayLocation={displayLocation}
        setDisplayLocation={setDisplayLocation}
        displayCardImage={displayCardImage}
        setDisplayCardImage={setDisplayCardImage}
        buttonFunction={buttonFunction}
        setButtonFunction={setButtonFunction}
        pages={pages}
        card={card}
        setCard={setCard}
        handleDeleteCard={handleDeleteCard}
        handleToggleCard={handleToggleCard}
        handleIncreaseCard={handleIncreaseCard}
      />
      <EnTemplate
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
        locale={locale}
        cardFunction={cardFunction}
        setCardFunction={setCardFunction}
        displayLocation={displayLocation}
        setDisplayLocation={setDisplayLocation}
        displayCardImage={displayCardImage}
        setDisplayCardImage={setDisplayCardImage}
        buttonFunction={buttonFunction}
        setButtonFunction={setButtonFunction}
        pages={pages}
        card={card}
        setCard={setCard}
        handleDeleteCard={handleDeleteCard}
        handleToggleCard={handleToggleCard}
        handleIncreaseCard={handleIncreaseCard}
      />
      {/* <div className={styles.cmsArticleContent__container}>
        <h3>消息表型文章設定</h3>
        <Input label={"標題"} required={true} elementId={"title"} />
      </div>
      <div className={styles.cmsArticleContent__container}>
        <h3>版型設定</h3>
        <RadioButton
          elementId="cardFunction"
          label={"卡片功能"}
          required={true}
          state={cardFunction}
          onChangeFun={setCardFunction}
          info={
            "進入文章：點擊卡片即進入文章內容 | 外部連結：附件檔案下載 / 進入外部連結，須搭配按鈕功能"
          }
          options={[
            {
              value: "article",
              label: "進入文章",
              checked: true,
            },
            {
              value: "link",
              label: "外部連結",
            },
          ]}
        />

        {cardFunction === "article" && (
          <RadioButton
            label={"地點顯示"}
            elementId={"displayLocation"}
            required={true}
            info={"顯示：顯示地點 | 不顯示：卡片上不顯示地點"}
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
        )}

        {cardFunction === "link" && (
          <RadioButton
            label={"按鈕功能"}
            elementId={"buttonFunction"}
            elementValueId={"buttonFunctionValue"}
            required={true}
            input={true}
            state={buttonFunction}
            onChangeFun={setButtonFunction}
            info={"可使用於進入外部連結、檔案下載等"}
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
        )}
        <RadioButton
          label={"卡片圖片"}
          elementId={"cardImage"}
          elementValueId={"cardImageValue"}
          required={true}
          input={true}
          state={cardImage}
          onChangeFun={setCardImage}
          info={
            "使用於卡片上方圖片，若選擇外部連結並且須顯示，則統一為同一張圖片使用"
          }
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
      <div className={styles.cmsArticleContent__container}>
        <h3>卡片設計</h3>
        {card.map((data, index) => (
          <AnnouncementCard
            data={data}
            index={index}
            card={card}
            setCard={setCard}
            handleDeleteCard={handleDeleteCard}
            handleToggleCard={handleToggleCard}
            cardFunction={cardFunction}
            buttonFunction={buttonFunction}
            cardImage={cardImage}
          />
        ))}
        <div
          className={styles.cmsArticleContent__container_increase}
          onClick={handleIncreaseCard}
        >
          <div className={styles.cmsArticleContent__container_increase__icon}>
            <RxPlus />
          </div>
          <span>增加卡片</span>
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
      </div> */}
    </>
  );
}
