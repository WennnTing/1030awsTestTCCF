"use client";
import styles from "./announcement-type-template.module.scss";
import AnnouncementCard from "./announcement-card";
import AnnouncementTag from "./announcement-tag";
import { useState } from "react";

export default function AnnouncementTypeTemplate({ contentData, locale }) {
  const data = contentData;

  // 顯示地點
  const displayLocation = data.filter(
    (item) => item.elementId === "displayLocation"
  )?.[0]?.fieldValue;

  // 卡片功能
  const cardFunction = data.filter(
    (item) => item.elementId === "cardFunction"
  )?.[0]?.fieldValue;

  // 卡片圖片
  const displayCardImage = data.filter(
    (item) => item.elementId === "cardFunction"
  )?.[0]?.imageUrl;

  const [activeTag, setActiveTag] = useState("ALL");
  const tagData = data
    ?.filter((item) => item.elementId.includes("tag"))
    .map((el) => el[`fieldText${locale}`]);

  tagData?.push("ALL");
  const uniqueTagData = [...new Set(tagData.filter((tag) => tag))].reverse();

  const cardData = data
    ?.filter((item) => item.elementId.includes("card_"))
    ?.reduce((acc, item) => {
      const match = item.elementId.match(/^[^_]*_[^_]*_(.*)$/);
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
  const groupedCard = Object.entries(
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
    .map((el, index) => {
      const key = Object.keys(el)[0].match(/^[^_]*_[^_]*_(.*)$/)[1];

      return {
        article: {
          fieldValue: el[`card_article_${key}`]?.[0]?.fieldValue,
        },
        image: {
          url:
            cardFunction === "article"
              ? el[`card_image_${key}`]?.[0]?.imageUrl
              : displayCardImage,
        },
        function: cardFunction,
        title: {
          fieldTextEn: el[`card_title_${key}`]?.[0]?.fieldTextEn,
          fieldTextZh: el[`card_title_${key}`]?.[0]?.fieldTextZh,
        },
        tag: {
          fieldTextEn: el[`card_tag_${key}`]?.[0]?.fieldTextEn,
          fieldTextZh: el[`card_tag_${key}`]?.[0]?.fieldTextZh,
        },
        location: {
          fieldTextEn: el[`card_location_${key}`]?.[0]?.fieldTextEn,
          fieldTextZh: el[`card_location_${key}`]?.[0]?.fieldTextZh,
          fieldValue: displayLocation,
        },
        button: {
          fieldTextEn: el[`card_button_${key}`]?.[0]?.fieldTextEn,
          fieldTextZh: el[`card_button_${key}`]?.[0]?.fieldTextZh,
          fieldValue: el[`card_button_${key}`]?.[0]?.fieldValue,
        },
        order: {
          fieldTextEn: el[`card_order_${key}`]?.[0]?.fieldTextEn,
          fieldTextZh: el[`card_order_${key}`]?.[0]?.fieldTextZh,
        },
      };
    })
    .sort(function (a, b) {
      return a.order.fieldTextZh - b.order.fieldTextZh;
    });

  return (
    <div className={styles.announcementTypeTemplate}>
      <h1 className={styles.announcementTypeTemplate__title}>
        {
          data?.filter((item) => item.elementId === "title")?.[0]?.[
            `fieldText${locale}`
          ]
        }
      </h1>
      {cardFunction === "article" && (
        <ul className={styles.announcementTypeTemplate__tagWrapper}>
          {uniqueTagData.map((data, index) => (
            <AnnouncementTag
              tag={data}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
              index={index}
              key={index}
            />
          ))}
        </ul>
      )}

      <div className={styles.announcementTypeTemplate__cardWrapper}>
        {activeTag === "ALL"
          ? groupedCard.map((data, index) => (
              <AnnouncementCard
                data={data}
                locale={locale}
                index={index}
                key={index}
              />
            ))
          : groupedCard
              .filter((item) => item.tag[`fieldText${locale}`] === activeTag)
              .map((data, index) => (
                <AnnouncementCard
                  data={data}
                  locale={locale}
                  index={index}
                  key={index}
                />
              ))}
        {/* {temp[activeTag].map((data, index) => (
          <AnnouncementCard data={data} locale={locale} index={index} />
        ))} */}
      </div>
    </div>
  );
}
