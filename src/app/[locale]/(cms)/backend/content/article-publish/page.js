import styles from "./article-publish.module.scss";
import ArticleContainer from "./article-container";
import { getAllPages } from "@/actions/pages";
import { Fragment } from "react";
import { Suspense } from "react";
import LoadingScreen from "@/components/cms/loading-screen";

export default async function ArticlePublishPage() {
  const pages = await getAllPages();
  return (
    <Fragment>
      <h2>內容管理 / 文章發布</h2>
      <div className="cmsPage__container">
        <div className={styles.cmsArticlePublish}>
          <Suspense fallback={<LoadingScreen />}>
            <ArticleContainer pages={pages} />
          </Suspense>
        </div>
      </div>
    </Fragment>
  );
}
