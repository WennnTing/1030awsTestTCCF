import ArticleContent from "./article-content";
import { getPageFieldValuesByPageUUID } from "@/actions/page-field-values";
import { getPageByID, getAllPages } from "@/actions/pages";

export default async function EditPage({ params }) {
  const uuid = params.uuid;
  const pageInfo = await getPageByID(uuid);
  const pageData = await getPageFieldValuesByPageUUID(uuid);
  const pages = await getAllPages();

  return (
    <div>
      <ArticleContent
        pageData={pageData.data}
        pageInfo={pageInfo.data}
        pages={pages}
      />
    </div>
  );
}
