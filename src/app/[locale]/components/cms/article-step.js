import styles from "./article-step.module.scss";
import { IoIosArrowForward } from "react-icons/io";

export default function ArticleStep({ step }) {
  const stepsData = [
    {
      id: 1,
      title: "文章版型",
    },
    {
      id: 2,
      title: "文章內容",
    },
    {
      id: 3,
      title: "文章設定",
    },
  ];

  return (
    <div className={styles.cmsArticleStep}>
      {stepsData.map((data) => (
        <div
          className={`${styles.cmsArticleStep__container} ${
            step >= data.id ? styles.active : ""
          }`}
          key={data.id}
        >
          <div
            className={`${styles.cmsArticleStep__container_step} ${
              step >= data.id ? styles.active : ""
            }`}
          >
            <span className={step >= data.id ? styles.active : ""}>
              {data.id}
            </span>
          </div>
          <div
            className={`${styles.cmsArticleStep__container_step__text} ${
              step >= data.id ? styles.active : ""
            }`}
          >
            {data.title}
          </div>
          {/* {data.id < stepsData.length && (
            <div className={styles.cmsArticleStep__container_arrow}>
              <IoIosArrowForward />
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
}
