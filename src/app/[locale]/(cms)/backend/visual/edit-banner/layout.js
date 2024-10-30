import { Fragment } from "react";

export default function EditBannerLayout({ children }) {
  return (
    <Fragment>
      <h2>視覺管理 / 編輯橫幅</h2>
      <div className="cmsPage__container">
        <div className="cmsPage__container__header">{children}</div>
      </div>
    </Fragment>
  );
}
