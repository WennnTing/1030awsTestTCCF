import styles from "./new-section.module.scss";
import Button from "./button";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { getPageContentByUuid } from "@/actions/page";
import { getPageByID } from "@/actions/pages";
import { getTranslations } from "next-intl/server";
import NewsSlide from "./news-slide";
import moment from "moment";
export default async function NewsSection() {
  // 最新消息
  // ccf8e038-c8c5-4425-a501-2da744c06de3
  const news = await getPageContentByUuid(
    "ccf8e038-c8c5-4425-a501-2da744c06de3"
  );

  const t = await getTranslations("Landing");

  const cardData = news?.data
    ?.filter((item) => item.elementId.includes("card_"))
    ?.reduce((acc, item) => {
      const match = item.elementId.match(/_(\d+)$/);
      if (match) {
        const key = match[1];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
      }
      return acc;
    }, {});

  const cardDataArray = Object.values(cardData || {});

  const cardPromises = Object.entries(
    cardDataArray.map((item) =>
      item.reduce((acc, curr) => {
        const key = curr.elementId;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      }, {})
    )
  )
    .map(([key, value]) => ({ ...value }))
    .map(async (el, index) => {
      const info = await getPageByID(
        el[`card_article_${index + 1}`]?.[0]?.fieldValue
      );

      return {
        link: `/${info.data.routerName}`,
        image: el[`card_image_${index + 1}`]?.[0]?.imageUrl,
        title: {
          en: el[`card_title_${index + 1}`]?.[0]?.fieldTextEn,
          zh: el[`card_title_${index + 1}`]?.[0]?.fieldTextZh,
        },
        tag: {
          en: el[`card_tag_${index + 1}`]?.[0]?.fieldTextEn,
          zh: el[`card_tag_${index + 1}`]?.[0]?.fieldTextZh,
        },
        time: moment(info.data.publishDate).format("YYYY/MM/DD"),
        order: Number(el[`card_order_${index + 1}`]?.[0]?.fieldTextEn),
      };
    });

  const card = await Promise.all(cardPromises);
  const sortedCard = card.sort(function (a, b) {
    return a.order - b.order;
  });

  return (
    <section className={styles.newsSection}>
      <div className={styles.newsSection__container}>
        <h2 className={styles.newsSection__container_title}>
          {t("News.title")}
        </h2>
        <NewsSlide newsCardData={sortedCard} />

        <div className={styles.newsSection__container_buttonWrapper}>
          <Button href={"/about/news"} text={t("Button.readMore")} />
        </div>
      </div>
    </section>
  );
}
