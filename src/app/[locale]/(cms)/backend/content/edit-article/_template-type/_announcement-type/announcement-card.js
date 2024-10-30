import { useState } from "react";
import { Input, ButtonInput } from "@/components/cms/input";
import { RadioButton } from "@/components/cms/radio-button";
import { BsTrash3 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import AnnouncementSelect from "@/components/cms/announcement-select";
import ImageUpload from "@/components/cms/image-upload";
import { localeToUpperCase } from "@/utils";
import styles from "../../[uuid]/article-content.module.scss";
export default function AnnouncementCard({
  data,
  index,
  card,
  setCard,
  handleDeleteCard,
  handleToggleCard,
  cardFunction,
  displayLocation,
  buttonFunction,
  displayCardImage,
  pages,
  locale,
}) {
  const localeStr = locale ? locale.split("_")[1] : "Zh";

  const [articleType, setArticleType] = useState(
    pages.data.filter(
      (page) =>
        page.pageUuid === data[`card_article_${data.key}`]?.[0]?.fieldValue
    )?.[0]?.templateId == 5
      ? "event"
      : "general"
  );

  const handleChange = (id, key, newValue) => {
    setCard(
      card.map((item) =>
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

  return (
    <div
      className={styles.cmsUpdateArticleContent__container_increase__block}
      key={index}
    >
      <div
        className={
          styles.cmsUpdateArticleContent__container_increase__block_action
        }
      >
        <h4>卡片 {index + 1}</h4>

        <div
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={() => handleDeleteCard(data.id)}
        >
          <BsTrash3 />
        </div>
        <div
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={() => handleToggleCard(data.id)}
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
          {cardFunction === "article" && (
            <RadioButton
              elementId={`articleType_${data.key}${locale}`}
              label={"文章類型"}
              required={true}
              value={articleType}
              onChangeFun={setArticleType}
              info={"卡片所顯示的文章類型"}
              options={[
                {
                  value: "event",
                  label: "活動型",
                  checked: true,
                },
                {
                  value: "general",
                  label: "一般型",
                },
              ]}
            />
          )}
          {cardFunction === "article" && (
            <AnnouncementSelect
              label={"文章"}
              required={true}
              pages={pages}
              articleType={articleType}
              defaultValue={data[`card_article_${data.key}`]?.[0]?.fieldValue}
              elementId={`card_article_${data.key}${locale}`}
            />
          )}

          <Input
            label={"標題"}
            required={true}
            elementId={`card_title_${data.key}${locale}`}
            state={
              data[`card_title_${data.key}`]?.[0]?.[`fieldText${localeStr}`]
            }
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入標題"}
          />

          {cardFunction === "article" && displayCardImage == "true" && (
            <ImageUpload
              id={data.id}
              label={"圖片"}
              required={true}
              elementId={`card_image_${data.key}${locale}`}
              state={data[`card_image_${data.key}`]?.[0]?.imageUrl}
            />
          )}

          {cardFunction === "article" && displayLocation == "true" && (
            <Input
              label={"地點"}
              required={true}
              elementId={`card_location_${data.key}${locale}`}
              state={
                data[`card_location_${data.key}`]?.[0]?.[
                  `fieldText${localeStr}`
                ]
              }
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入地點"}
            />
          )}

          {cardFunction == "link" && (
            <Input
              label={"按鈕連結"}
              required={true}
              elementId={`card_button_${data.key}${locale}`}
              state={data[`card_button_${data.key}`]?.[0]?.fieldValue}
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入連結"}
            />
          )}

          <Input
            label={"標籤"}
            elementId={`card_tag_${data.key}${locale}`}
            state={data[`card_tag_${data.key}`]?.[0]?.[`fieldText${localeStr}`]}
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入標籤"}
          />
          <Input
            label={"排序"}
            required={true}
            elementId={`card_order_${data.key}${locale}`}
            state={
              data[`card_order_${data.key}`]?.[0]?.[`fieldText${localeStr}`]
            }
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入排序"}
            type={"number"}
          />
        </div>
      </div>
    </div>
  );
}
