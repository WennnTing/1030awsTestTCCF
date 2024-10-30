import styles from "./event-type-template.module.scss";
import parse from "html-react-parser";
export default function EventMember({ data, locale, index }) {
  const key = data[0].elementId.match(/^[^_]*_[^_]*_(.*)$/)[1];

  return (
    <div className={styles.eventTypeTemplate__memberWrapper_container__box}>
      {data?.find((item) => item.elementId === `member_image_${key}`) && (
        <div
          className={
            styles.eventTypeTemplate__memberWrapper_container__box_image
          }
        >
          <img
            src={
              data?.filter(
                (item) => item.elementId === `member_image_${key}`
              )?.[0]?.imageUrl
            }
          />
        </div>
      )}

      <div
        className={
          styles.eventTypeTemplate__memberWrapper_container__box_content
        }
      >
        <div
          className={
            styles.eventTypeTemplate__memberWrapper_container__box_content__title
          }
        >
          {
            data?.filter(
              (item) => item.elementId === `member_title_${key}`
            )?.[0]?.[`fieldText${locale}`]
          }
        </div>
        <div
          className={
            styles.eventTypeTemplate__memberWrapper_container__box_content__description
          }
        >
          {parse(
            data?.filter(
              (item) => item.elementId === `member_content_${key}`
            )?.[0]?.[`fieldText${locale}`] ?? ""
          )}
        </div>
      </div>
    </div>
  );
}
