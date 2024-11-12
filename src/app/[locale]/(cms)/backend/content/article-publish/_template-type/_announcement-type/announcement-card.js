import styles from "../../article-content.module.scss";
import { RadioButton } from "@/components/cms/radio-button";
import { Input } from "@/components/cms/input";
import { BsTrash3 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import AnnouncementSelect from "@/components/cms/announcement-select";
import ImageUpload from "@/components/cms/image-upload";
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
  const [articleType, setArticleType] = useState("event");
  const handleChange = (id, key, newValue) => {
    setCard(
      card.map((item) => (item.id === id ? { ...item, [key]: newValue } : item))
    );
  };

  return (
    <div
      className={styles.cmsArticleContent__container_increaseBlock}
      key={index}
    >
      <div
        className={styles.cmsArticleContent__container_increaseBlock__action}
      >
        <h4>卡片 {index + 1}</h4>
        <button
          className={styles.cmsArticleContent__container_increaseBlock__action_icon}
          style={{ border: "none", fontSize: "1rem" }}
          onClick={() => handleDeleteCard(data.id)}
          aria-label="Delete card"
        >
          <BsTrash3 />
        </button>

        <div
          className={
            styles.cmsArticleContent__container_increaseBlock__action_icon
          }
          onClick={() => handleToggleCard(data.id)}
        >
          <IoIosArrowDown
            style={{ transform: data.open ? "scaleY(-1) " : "scaleY(1)" }}
          />
        </div>
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
              elementId={`card_article_${data.key}${locale}`}
            />
          )}
          <Input
            label={"標題"}
            required={true}
            elementId={`card_title_${data.key}${locale}`}
            state={data[`card_title_${data.key}${locale}`]}
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入標題"}
          />

          {cardFunction === "article" && displayCardImage == "true" && (
            // <Input
            //   label={"圖片"}
            //   required={true}
            //   elementId={`card_image_${data.id}${locale}`}
            //   state={data[`card_image_${data.id}${locale}`]}
            //   id={data.id}
            //   onChangeFun={handleChange}
            // />

            <ImageUpload
              id={data.id}
              label={"圖片"}
              required={true}
              elementId={`card_image_${data.key}${locale}`}
            />
          )}

          {cardFunction === "article" && displayLocation == "true" && (
            <Input
              label={"地點"}
              required={true}
              elementId={`card_location_${data.key}${locale}`}
              state={data[`card_location_${data.key}${locale}`]}
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
              state={data[`card_button_${data.key}${locale}`]}
              id={data.id}
              onChangeFun={handleChange}
              placeholder={"請輸入連結"}
            />
          )}
          <Input
            label={"標籤"}
            elementId={`card_tag_${data.key}${locale}`}
            state={data[`card_tag_${data.key}${locale}`]}
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入標籤"}
          />
          <Input
            label={"排序"}
            required={true}
            elementId={`card_order_${data.key}${locale}`}
            state={data[`card_order_${data.key}${locale}`]}
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
