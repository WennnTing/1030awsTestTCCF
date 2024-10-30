"use client";
import styles from "./article-template-card.module.scss";

import { LuLayoutGrid } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuLayoutList } from "react-icons/lu";
import { LuLayout } from "react-icons/lu";
import { LuLayoutPanelTop } from "react-icons/lu";
import { useRouter } from "next/navigation";
export default function ArticleTemplateCard({ templateId, setTemplateId }) {
  const router = useRouter();
  const templatesData = [
    {
      id: 1,
      name: "一般型",
      description: "適用於通用訊息展示，發布最新消息文章、介紹頁面",
      icon: <LuLayout />,
    },
    {
      id: 2,
      name: "條列型",
      description: "專為列出相關項目而設計，適合用於步驟說明、獎項頒布頁面。",
      icon: <LuLayoutList />,
    },
    {
      id: 3,
      name: "表格型",
      description: "適用於數據密集型的展示、參與廠商名單與彙整表格頁面。",
      icon: <LuLayoutGrid />,
    },
    {
      id: 4,
      name: "消息表型",
      description: "專為活動宣導設計，適合展示活動資訊、最新消息頁面。",
      icon: <LuLayoutPanelTop />,
    },
    {
      id: 5,
      name: "活動型",
      description: "適用活動文章詳細說明、講師表格與空間配置說明。",
      icon: <LuLayoutDashboard />,
    },
  ];

  const handleSelectTemplate = (id) => {
    setTemplateId(id);
  };

  return (
    <>
      {templatesData.map((data) => (
        <label
          className={
            templateId === data.id
              ? `${styles.cmsArticleTemplateCard} ${styles.cmsArticleTemplateCard___active}`
              : styles.cmsArticleTemplateCard
          }
          onClick={() => handleSelectTemplate(data.id)}
          name="templateId"
          key={data.id}
        >
          <input type="radio" name="templateId" value={data.id} />
          <div className={styles.cmsArticleTemplateCard__icon}>{data.icon}</div>
          <div className={styles.cmsArticleTemplateCard__content}>
            <div className={styles.cmsArticleTemplateCard__content_name}>
              {data.name}
            </div>
            <div>{data.description}</div>
          </div>
        </label>
      ))}
    </>
  );
}
