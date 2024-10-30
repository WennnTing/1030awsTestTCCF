import styles from "./article-content.module.scss";
import { Input } from "@/components/cms/input";
import { useState } from "react";
export default function ArticlePreview({ step }) {
  const [routerName, setRouterName] = useState("");
  return (
    <div style={{ display: step === 3 ? "" : "none" }}>
      <div className={styles.cmsArticleContent__container}>
        <Input
          label={"中文名稱"}
          required={true}
          elementId={"pageNameZh"}
          placeholder={"請輸入文章中文名稱"}
        />
        <Input
          label={"英文名稱"}
          required={true}
          elementId={"pageNameEn"}
          placeholder={"請輸入文章英文名稱"}
        />
        <Input
          label={"路由名稱"}
          required={true}
          elementId={"routerName"}
          placeholder={"請輸入文章路由名稱"}
          type={"router"}
          state={routerName}
          onChangeFun={setRouterName}
          defaultFun={true}
        />
      </div>
    </div>
  );
}
