import SelectComponent from "./select";
import { Calendar } from "./calendar";
import styles from "./article-event-time.module.scss";
export default function ArticleEventTime({
  label,
  required,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startDateName,
  endDateName,
  startDatePlaceholder,
  endDatePlaceholder,

  startTime,
  endTime,
  setActivityStartTime,
  setActivityEndTime,
  startTimeName,
  endTimeName,
  startTimePlaceholder,
  endTimePlaceholder,
  startTimeOptions,
  endTimeOptions,
}) {
  return (
    <div className={styles.cmsArticleTime}>
      <label>
        {label}
        {required && (
          <span className={styles.cmsArticleTime__required}>&#42;</span>
        )}
      </label>
      <div className={styles.cmsArticleTime__container}>
        <Calendar
          date={startDate}
          setDate={setStartDate}
          elementId={startDateName}
          placeholder={startDatePlaceholder}
        />
        <SelectComponent
          name={startTimeName}
          placeholder={startTimePlaceholder}
          options={startTimeOptions}
          defaultValue={startTime}
          setSelect={setActivityStartTime}
          controller={true}
        />

        <Calendar
          date={endDate}
          setDate={setEndDate}
          elementId={endDateName}
          placeholder={endDatePlaceholder}
        />
        <SelectComponent
          name={endTimeName}
          placeholder={endTimePlaceholder}
          options={endTimeOptions}
          defaultValue={endTime}
          setSelect={setActivityEndTime}
          controller={true}
        />
      </div>
    </div>
  );
}
