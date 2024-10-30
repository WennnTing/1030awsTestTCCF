import styles from "./announcement-type-template.module.scss";

export default function AnnouncementTag({
  tag,
  activeTag,
  setActiveTag,
  index,
}) {
  const handleClick = (tag) => {
    setActiveTag(tag);
  };

  return (
    <li
      className={styles.announcementTypeTemplate__tagWrapper_tag}
      style={{
        backgroundColor: tag === activeTag ? "#171717" : "transparent",
        color: tag === activeTag ? "#fcfcfc" : "#171717",
      }}
      key={index}
      onClick={() => handleClick(tag)}
    >
      <span># {tag}</span>
    </li>
  );
}
