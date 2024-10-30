import styles from "./article-list.module.scss";
import { Button } from "@/components/cms/button";
import { getAllPages } from "@/actions/pages";
import Table from "@/components/cms/table";
import Pagination from "@/components/cms/pagination";
import { Suspense } from "react";
import LoadingScreen from "@/components/cms/loading-screen";

async function ArticleList({ page = 1, article }) {
  const articleData = article?.data?.slice((page - 1) * 10, page * 10);
  const tableHeader = [
    {
      id: 1,
      name: "名稱",
      value: "pageNameZh",
      textAlign: "left",
      width: "30%",
    },
    {
      id: 2,
      name: "版型",
      value: "templateId",
    },
    {
      id: 3,
      name: "標籤",
      value: "pageTag",
    },
    {
      id: 4,
      name: "路由",
      value: "routerName",
    },
    {
      id: 5,
      name: "上架期間",
      value: "publishDate",
    },
    {
      id: 6,
      name: "",
      value: "action",
    },
  ];
  return <Table header={tableHeader} data={articleData} type={"article"} />;
}

export default async function ArticleListPage({ searchParams }) {
  const page = searchParams.page;
  const articles = await getAllPages();
  return (
    <div>
      <h2>內容管理 / 文章列表</h2>
      <div className="cmsPage__container">
        <div className="cmsPage__container__header">
          <div className={styles.cmsArticleList}>
            <div className={styles.cmsArticleList__header}>
              <h3>文章清單</h3>
              <Button
                text={"新增文章"}
                type={"primary"}
                href={"article-publish"}
                action={"nav"}
              />
            </div>

            <Suspense fallback={<LoadingScreen />}>
              <ArticleList page={page} article={articles} />
            </Suspense>
          </div>
          <Pagination total={articles.data.length} perPage={10} />
        </div>
      </div>
    </div>
  );
}
