import styles from "./article-content.module.scss";
import GeneralType from "./_template-type/general-type";
import ListType from "./_template-type/list-type";
import TableType from "./_template-type/table-type";
import AnnouncementType from "./_template-type/announcement-type";
import EventType from "./_template-type/event-type";
import ArticleLocale from "@/components/cms/article-locale";
import { useEffect, useState } from "react";

export default function ArticleContent({
  step,
  templateId,
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  editorContent,
  setEditorContent,
  pages,
}) {
  const [locale, setLocale] = useState("zh");

  useEffect(() => {
    setLocale("zh");
  }, [templateId]);

  return (
    <div
      className={styles.cmsArticleContent}
      style={{ display: step === 2 ? "" : "none" }}
    >
      <ArticleLocale locale={locale} setLocale={setLocale} />
      {(() => {
        switch (templateId) {
          case 1:
            return (
              <GeneralType
                publishDate={publishDate}
                setPublishDate={setPublishDate}
                unpublishDate={unpublishDate}
                setUnpublishDate={setUnpublishDate}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                locale={locale}
              />
            );
          case 2:
            return (
              <ListType
                publishDate={publishDate}
                setPublishDate={setPublishDate}
                unpublishDate={unpublishDate}
                setUnpublishDate={setUnpublishDate}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                locale={locale}
              />
            );
          case 3:
            return (
              <TableType
                publishDate={publishDate}
                setPublishDate={setPublishDate}
                unpublishDate={unpublishDate}
                setUnpublishDate={setUnpublishDate}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                locale={locale}
              />
            );
          case 4:
            return (
              <AnnouncementType
                publishDate={publishDate}
                setPublishDate={setPublishDate}
                unpublishDate={unpublishDate}
                setUnpublishDate={setUnpublishDate}
                locale={locale}
                pages={pages}
              />
            );
          case 5:
            return (
              <EventType
                publishDate={publishDate}
                setPublishDate={setPublishDate}
                unpublishDate={unpublishDate}
                setUnpublishDate={setUnpublishDate}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                locale={locale}
              />
            );
        }
      })()}
    </div>
  );
}
