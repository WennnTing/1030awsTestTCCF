import { Calendar } from "./calendar";
import styles from "./article-calendar.module.scss";

export default function ArticleEventCalendar({
  required,
  label,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startElementId,
  endElementId,
  startPlaceholder,
  endPalceholder,
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
          date={startDate}
          setDate={setStartDate}
          elementId={startElementId}
          placeholder={startPlaceholder}
        />
        <Calendar
          date={endDate}
          setDate={setEndDate}
          elementId={endElementId}
          placeholder={endPalceholder}
        />
      </div>
    </div>
  );
}
