import { Link } from "../../../../navigation";
import ImageLoader from "../global/image-loader";
import styles from "./card.module.scss";
import { useLocale } from "next-intl";
export default function Card({ title, time, image, tag, link }) {
  const locale = useLocale();

  return (
    <div className={styles.cardWrapper}>
      <Link href={link}>
        <div className={styles.cardWrapper__image}>
          <ImageLoader
            src={image}
            sizes={"100%"}
            style={{
              objectFit: "cover",
              objectPosition: "top",
            }}
            fill={true}
            alt={"news"}
          />
        </div>

        <div className={styles.cardWrapper__container}>
          <div className={styles.cardWrapper__container_title}>
            {title[locale]}
          </div>
          <span className={styles.cardWrapper__container_time}>{time}</span>
          <span className={styles.cardWrapper__container_tag}>
            {" "}
            # {tag[locale]}
          </span>
        </div>
      </Link>
    </div>
  );
}
