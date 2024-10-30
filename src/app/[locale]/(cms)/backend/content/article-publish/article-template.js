import styles from "./article-template.module.scss";
import ArticleTemplateCard from "@/components/cms/article-template-card";
export default function ArticleTemplatePage({
  templateId,
  setTemplateId,
  step,
}) {
  return (
    <div
      className={styles.cmsArticleTemplate}
      style={{ display: step === 1 ? "" : "none" }}
    >
      <ArticleTemplateCard
        templateId={templateId}
        setTemplateId={setTemplateId}
      />
    </div>
  );
}
