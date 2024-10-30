import styles from "./article-locale.module.scss";
import { FiInfo } from "react-icons/fi";
export default function ArticleLocale({ locale, setLocale }) {
  return (
    <div className={styles.cmsArticleLocale}>
      <div className={styles.cmsArticleLocale__locale}>
        <div
          className={`${styles.cmsArticleLocale__locale_tab} ${
            locale === "zh" ? styles.active : ""
          }`}
          onClick={() => setLocale("zh")}
        >
          中文
        </div>
        <div
          className={`${styles.cmsArticleLocale__locale_tab} ${
            locale === "en" ? styles.active : ""
          }`}
          onClick={() => setLocale("en")}
        >
          英文
        </div>
      </div>
      <div className={styles.cmsArticleLocale__notice}>
        <div className={styles.cmsArticleLocale__notice_icon}>
          <FiInfo />
        </div>
        <span>中文與英文必填欄位皆填寫完成後方可成功送出</span>
      </div>
    </div>
  );
}
