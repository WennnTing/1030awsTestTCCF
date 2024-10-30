"use client";
import styles from "./article-navigation.module.scss";
import { Button } from "./button";
import { usePathname } from "next/navigation";

export default function ArticleNavigation({ data, templateId }) {
  const path = usePathname();
  const currentPath = data.findIndex((item) => path.includes(item.href));

  return (
    <div className={styles.cmsArticleNavigation}>
      <Button
        text={"上一步"}
        type={"secondary"}
        href={data[currentPath - 1]?.href}
      />
      {currentPath < data.length && (
        <Button
          text={"確認"}
          type={"confirm"}
          disabled={!templateId}
          href={data[currentPath + 1]?.href}
        />
      )}
    </div>
  );
}
