import styles from "../../article-content.module.scss";
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
  console.log(data);
  const handleChange = (id, key, newValue) => {
    setMember(
      member.map((item) =>
        item.id === id ? { ...item, [key]: newValue } : item
      )
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
        <h4>人員 {index + 1}</h4>

        <div
          className={
            styles.cmsArticleContent__container_increaseBlock__action_icon
          }
          onClick={() => handleDeleteMember(data.id)}
        >
          <BsTrash3 />
        </div>
        <div
          className={
            styles.cmsArticleContent__container_increaseBlock__action_icon
          }
          onClick={() => handleToggleMember(data.id)}
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
          <Input
            label={"標題"}
            elementId={`member_title_${data.key}${locale}`}
            state={data[`member_title_${data.key}${locale}`]}
            id={data.id}
            onChangeFun={handleChange}
            placeholder={"請輸入標題"}
          />
          <CustomEditor
            elementId={`member_content_${data.key}${locale}`}
            state={data[`member_content_${data.key}${locale}`]}
            id={data.id}
            onChangeFun={handleChange}
          />
          <ImageUpload
            label={"圖片"}
            elementId={`member_image_${data.key}${locale}`}
            state={data[`member_image_${data.key}${locale}`]}
            id={data.id}
            onChangeFun={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
