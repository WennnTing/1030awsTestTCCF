import { ControllerInput } from "@/components/cms/input";
import ArticleCalendar from "@/components/cms/article-calendar";
import styles from "./article-content.module.scss";
import { useState } from "react";
export default function ArticleInfo({ pageInfo }) {
  const [pageNameZh, setPageNameZh] = useState(pageInfo.pageNameZh);
  const [pageNameEn, setPageNameEn] = useState(pageInfo.pageNameEn);
  const [routerName, setRouterName] = useState(pageInfo.routerName);
  const [publishDate, setPublishDate] = useState(pageInfo.publishDate);
  const [unpublishDate, setUnpublishDate] = useState(pageInfo.unpublishDate);
  return (
    <div className={styles.cmsUpdateArticleContent__container}>
      <h3>文章資訊</h3>
      <ControllerInput
        label={"中文名稱"}
        required={true}
        elementId={"pageNameZh"}
        value={pageNameZh}
        onChangeFun={setPageNameZh}
      />
      <ControllerInput
        label={"英文名稱"}
        required={true}
        elementId={"pageNameEn"}
        value={pageNameEn}
        onChangeFun={setPageNameEn}
      />
      <ControllerInput
        label={"路由名稱"}
        required={true}
        elementId={"routerName"}
        value={routerName}
        onChangeFun={setRouterName}
        type={"router"}
      />
      <ArticleCalendar
        label={"上架期間"}
        required={true}
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
      />
    </div>
  );
}
