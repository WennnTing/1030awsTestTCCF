import { Fragment } from "react";

export default function EditArticleLayout({ children }) {
  return (
    <Fragment>
      <h2>內容管理 / 編輯文章</h2>
      <div className="cmsPage__container">
        <div className="cmsPage__container__header">{children}</div>
      </div>
    </Fragment>
  );
}
