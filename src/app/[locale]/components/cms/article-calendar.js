import { Calendar } from "./calendar";
import styles from "./article-calendar.module.scss";

export default function ArticleCalendar({
  required,
  label,
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
}) {
  return (
    <div className={styles.cmsArticleCalendar}>
      <label>
        {label}
        {required && (
          <span className={styles.cmsArticleCalendar__required}>&#42;</span>
        )}
      </label>
      <div className={styles.cmsArticleCalendar__container}>
        <Calendar
          date={publishDate}
          setDate={setPublishDate}
          elementId={"publishDate"}
          placeholder={"上架時間"}
        />
        <Calendar
          date={unpublishDate}
          setDate={setUnpublishDate}
          elementId={"unpublishDate"}
          placeholder={"下架時間"}
        />
      </div>
    </div>
  );
}
