import { ControllerInput } from "@/components/cms/input";
import { ControllerRadioButton } from "@/components/cms/radio-button";
import { useState } from "react";
import styles from "../[uuid]/article-content.module.scss";
import AnnouncementCard from "./_announcement-type/announcement-card";
import { RxPlus } from "react-icons/rx";
import { Alert } from "@/components/cms/swal";
import { nanoid } from "nanoid";

const EnTemplate = ({
  data,
  locale,
  cardFunction,
  setCardFunction,
  displayLocation,
  setDisplayLocation,
  buttonFunction,
  setButtonFunction,
  displayCardImage,
  setDisplayCardImage,
  pages,

  card,
  setCard,
  handleDeleteCard,
  handleToggleCard,
  handleIncreaseCard,
}) => {
  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextEn);
  const [buttonFunctionValue, setButtonFunctionValue] = useState(
    data?.card_button_1?.[0]?.fieldTextEn
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
        <h3>版型設定</h3>
        <ControllerRadioButton
          label={"卡片功能"}
          required={true}
          elementId={"cardFunctionEn"}
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
          <ControllerRadioButton
            label={"地點顯示"}
            required={true}
            elementId={"displayLocationEn"}
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
          <ControllerRadioButton
            label={"按鈕功能"}
            required={true}
            input={true}
            elementId={"buttonFunctionEn"}
            elementValueId={"buttonFunctionValueEn"}
            value={buttonFunction}
            onChangeFun={setButtonFunction}
            inputValue={buttonFunctionValue}
            inputOnChangeFun={setButtonFunctionValue}
            info={"可使用於進入外部連結、檔案下載等"}
            displayInput={true}
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
          <ControllerRadioButton
            label={"卡片圖片"}
            required={true}
            input={true}
            elementId={"displayCardImageEn"}
            value={displayCardImage}
            onChangeFun={setDisplayCardImage}
            displayInput={true}
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

        <h3>卡片設計</h3>
        <div className={styles.cmsUpdateArticleContent__container_increase}>
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
          <div className={styles.cmsUpdateArticleContent__container_increase}>
            <div
              className={
                styles.cmsUpdateArticleContent__container_increaseButton
              }
              onClick={handleIncreaseCard}
            >
              <div
                className={
                  styles.cmsUpdateArticleContent__container_increaseButton__icon
                }
              >
                <RxPlus />
              </div>
              <span>增加卡片</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ZhTemplate = ({
  data,
  locale,
  cardFunction,
  setCardFunction,
  displayLocation,
  setDisplayLocation,
  buttonFunction,
  setButtonFunction,
  displayCardImage,
  setDisplayCardImage,
  pages,

  card,
  setCard,
  handleDeleteCard,
  handleToggleCard,
  handleIncreaseCard,
}) => {
  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextZh);
  const [buttonFunctionValue, setButtonFunctionValue] = useState(
    data?.card_button_1?.[0]?.fieldTextZh
  );
  // const cardData = Object.entries(data)
  //   .filter(([key, value]) => key.includes("card_"))
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

  // const cardDataArray = Object.values(cardData || {});

  // const [card, setCard] = useState(
  //   cardDataArray.map((item, index) =>
  //     item.reduce((acc, [key, value]) => {
  //       acc[key] = value;
  //       return {
  //         ...acc,
  //         ...{ open: true, id: index + 1, locale: "" },
  //       };
  //     }, {})
  //   )
  // );

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
  //   setCard((prev) => {
  //     return prev.concat({
  //       id: prev[prev.length - 1].id + 1,
  //       open: true,
  //       locale: "",
  //     });
  //   });
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
      <div className={styles.cmsUpdateArticleContent__container}>
        <ControllerInput
          label={"標題"}
          required={true}
          elementId={"title"}
          value={title}
          onChangeFun={setTitle}
          placeholder={"請輸入標題"}
        />
        <h3>版型設定</h3>
        <ControllerRadioButton
          label={"卡片功能"}
          required={true}
          elementId={"cardFunction"}
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
          <ControllerRadioButton
            label={"地點顯示"}
            required={true}
            elementId={"displayLocation"}
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
          <ControllerRadioButton
            label={"按鈕功能"}
            required={true}
            input={true}
            elementId={"buttonFunction"}
            elementValueId={"buttonFunctionValue"}
            value={buttonFunction}
            onChangeFun={setButtonFunction}
            inputValue={buttonFunctionValue}
            inputOnChangeFun={setButtonFunctionValue}
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
          <ControllerRadioButton
            label={"卡片圖片"}
            required={true}
            input={true}
            elementId={"displayCardImage"}
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
        <h3>卡片設計</h3>

        <div className={styles.cmsUpdateArticleContent__container_increase}>
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
          <div className={styles.cmsUpdateArticleContent__container_increase}>
            <div
              className={
                styles.cmsUpdateArticleContent__container_increaseButton
              }
              onClick={handleIncreaseCard}
            >
              <div
                className={
                  styles.cmsUpdateArticleContent__container_increaseButton__icon
                }
              >
                <RxPlus />
              </div>
              <span>增加卡片</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AnnouncementType({ pageData, locale, pages }) {
  const data = pageData.reduce((acc, item) => {
    if (!acc[item.elementId]) {
      acc[item.elementId] = [];
    }
    acc[item.elementId].push(item);
    return acc;
  }, {});

  console.log(data);
  const [cardFunction, setCardFunction] = useState(
    data?.cardFunction?.[0]?.fieldValue
  );
  const [displayLocation, setDisplayLocation] = useState(
    data?.displayLocation?.[0]?.fieldValue
  );
  const [displayCardImage, setDisplayCardImage] = useState(
    data?.displayCardImage?.[0]?.fieldValue ?? "true"
  );
  const [buttonFunction, setButtonFunction] = useState(
    data?.buttonFunction?.[0]?.fieldValue ?? "true"
  );

  const cardData = Object.entries(data)
    .filter(([key, value]) => key.includes("card_"))
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

  const cardDataArray = Object.values(cardData || {});

  const [card, setCard] = useState(
    cardDataArray.length > 0
      ? cardDataArray.map((item, index) =>
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
    setCard((prev) => {
      return prev.concat({
        id: prev[prev.length - 1].id + 1,
        open: true,
        key: nanoid(),
      });
    });
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
    <div>
      <ZhTemplate
        locale={locale}
        cardFunction={cardFunction}
        setCardFunction={setCardFunction}
        displayLocation={displayLocation}
        setDisplayLocation={setDisplayLocation}
        displayCardImage={displayCardImage}
        setDisplayCardImage={setDisplayCardImage}
        buttonFunction={buttonFunction}
        setButtonFunction={setButtonFunction}
        data={data}
        pages={pages}
        card={card}
        setCard={setCard}
        handleDeleteCard={handleDeleteCard}
        handleToggleCard={handleToggleCard}
        handleIncreaseCard={handleIncreaseCard}
      />
      <EnTemplate
        locale={locale}
        cardFunction={cardFunction}
        setCardFunction={setCardFunction}
        displayLocation={displayLocation}
        setDisplayLocation={setDisplayLocation}
        displayCardImage={displayCardImage}
        setDisplayCardImage={setDisplayCardImage}
        buttonFunction={buttonFunction}
        setButtonFunction={setButtonFunction}
        data={data}
        pages={pages}
        card={card}
        setCard={setCard}
        handleDeleteCard={handleDeleteCard}
        handleToggleCard={handleToggleCard}
        handleIncreaseCard={handleIncreaseCard}
      />
      <input type="hidden" name="templateId" value={4} />
    </div>
  );
}
