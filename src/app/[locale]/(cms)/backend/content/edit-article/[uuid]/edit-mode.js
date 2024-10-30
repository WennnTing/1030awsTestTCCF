import { Fragment } from "react";
import styles from "./article-content.module.scss";
import { LuFileEdit } from "react-icons/lu";
import { LuFileCog } from "react-icons/lu";
export default function EditMode({ mode, setMode }) {
  return (
    <div className={styles.cmsUpdateArticleContent__mode}>
      <div
        className={
          mode === "content"
            ? `${styles.cmsUpdateArticleContent__mode_box} ${styles.active}`
            : styles.cmsUpdateArticleContent__mode_box
        }
        onClick={() => setMode("content")}
      >
        <div className={styles.cmsUpdateArticleContent__mode_box__icon}>
          <LuFileEdit />
        </div>
        編輯文章內容
      </div>
      <div
        className={
          mode === "info"
            ? `${styles.cmsUpdateArticleContent__mode_box} ${styles.active}`
            : styles.cmsUpdateArticleContent__mode_box
        }
        onClick={() => setMode("info")}
      >
        <div className={styles.cmsUpdateArticleContent__mode_box__icon}>
          <LuFileCog />
        </div>
        編輯文章資訊
      </div>
    </div>
  );
}
