import styles from "../../[uuid]/article-content.module.scss";
import { Input, ButtonInput } from "@/components/cms/input";
import { BsTrash3 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import ImageUpload from "@/components/cms/image-upload";
import dynamic from "next/dynamic";
const CustomEditor = dynamic(() => import("@/components/cms/custom-editor"), {
  ssr: false,
});

export default function EventMember({
  data,
  index,
  member,
  setMember,
  handleDeleteMember,
  handleToggleMember,
  locale,
}) {
  const localeStr = locale ? locale.split("_")[1] : "Zh";

  const handleChange = (id, key, newValue) => {
    console.log(member);

    setMember(
      member.map((item) =>
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
        <h4>人員 {index + 1}</h4>
        <button
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={(e) => {
            e.preventDefault();
            handleDeleteMember(data.id)
          }}

          aria-label="Delete member"
          style={{ border: "none", fontSize: "1rem" }}
        >
          <BsTrash3 />
        </button>

        <button
          className={
            styles.cmsUpdateArticleContent__container_increase__block_action__icon
          }
          onClick={(e) => {
            e.preventDefault();
            handleToggleMember(data.id)
          }}

          aria-label="Toggle member"
          style={{ border: "none", fontSize: "1rem" }}
        >
          <IoIosArrowDown
            style={{ transform: data.open ? "scaleY(-1)" : "scaleY(1)" }}
          />
        </button>



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
            label={"標題"}
            elementId={`member_title_${data.key}${locale}`}
            state={
              data[`member_title_${data.key}`]?.[0]?.[`fieldText${localeStr}`]
            }
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入標題"}
          />
          <CustomEditor
            elementId={`member_content_${data.key}${locale}`}
            state={
              data[`member_content_${data.key}`]?.[0]?.[`fieldText${localeStr}`]
            }
            id={data.id}
            onChangeFun={handleChange}
          />

          <ImageUpload
            label={"圖片"}
            elementId={`member_image_${data.key}${locale}`}
            state={data[`member_image_${data.key}`]?.[0]?.imageUrl}
            id={data.id}
            onChangeFun={handleChange}
            key={data.id}
          />
        </div>
      </div>
    </div>
  );
}
