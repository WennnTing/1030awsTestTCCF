import styles from "../../[uuid]/article-content.module.scss";
import { Input, ButtonInput } from "@/components/cms/input";
import { localeToUpperCase } from "@/utils";
import { BsTrash3 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import dynamic from "next/dynamic";
const CustomEditor = dynamic(() => import("@/components/cms/custom-editor"), {
  ssr: false,
});

export default function ListBlock({
  data,
  index,
  block,
  setBlock,
  handleDeleteBlock,
  handleToggleBlock,
  locale,
}) {
  const localeStr = locale ? locale.split("_")[1] : "Zh";

  const handleChange = (id, key, newValue) => {
    setBlock(
      block.map((item) => {
        if (item.id === id && !key.includes("buttonValue")) {
          return {
            ...item,
            [key.replace(/_En$/, "")]: [
              {
                ...item[key.replace(/_En$/, "")]?.[0],
                [`fieldText${locale ? locale.split("_")[1] : "Zh"}`]: newValue,
              },
            ],
          };
        } else if (item.id === id && key.includes("buttonValue")) {
          return {
            ...item,
            [`block_button_${id}`]: [
              {
                ...item[key.replace(/_En$/, "")]?.[0],
                fieldValue: newValue,
              },
            ],
          };
        } else {
          return item;
        }
      })
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
        <h4>區塊 {index + 1}</h4>
        <div
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={() => handleDeleteBlock(data.id)}
        >
          <BsTrash3 />
        </div>

        <div
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={() => handleToggleBlock(data.id)}
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
          <Input
            label={"主題"}
            elementId={`block_theme_${data.key}${locale}`}
            state={
              data[`block_theme_${data.key}`]?.[0]?.[`fieldText${localeStr}`]
            }
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入主題"}
          />

          <Input
            label={"標題"}
            required={true}
            elementId={`block_title_${data.key}${locale}`}
            state={
              data[`block_title_${data.key}`]?.[0]?.[`fieldText${localeStr}`]
            }
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入標題"}
          />
          <Input
            label={"副標題"}
            required={true}
            elementId={`block_subTitle_${data.key}${locale}`}
            state={
              data[`block_subTitle_${data.key}`]?.[0]?.[`fieldText${localeStr}`]
            }
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入副標題"}
          />
          <CustomEditor
            elementId={`block_content_${data.key}${locale}`}
            state={
              data[`block_content_${data.key}`]?.[0]?.[`fieldText${localeStr}`]
            }
            id={data.id}
            onChangeFun={handleChange}
          />

          <ButtonInput
            label={"按鈕"}
            elementId={`block_button_${data.key}${locale}`}
            elementValueId={`block_buttonValue_${data.key}${locale}`}
            state={
              data[`block_button_${data.key}`]?.[0]?.[`fieldText${localeStr}`]
            }
            valueState={data[`block_button_${data.key}`]?.[0]?.fieldValue}
            id={data.id}
            onChangeFun={handleChange}
            placeholderElement={"請輸入按鈕文字"}
            placeholderValue={"請輸入按鈕連結"}
          />
        </div>
      </div>
    </div>
  );
}
